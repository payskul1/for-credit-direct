import React, { useEffect, useState } from 'react';
import { Upload, User, GraduationCap, DollarSign, Calendar, Phone, Mail, MapPin, FileText, CreditCard, Building, Shield, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInformation from '../components/steps/PersonalInformation';
import AcademicInformation from '../components/steps/AcademicInformations';
import Fees from '../components/steps/Fees';
import Financial from '../components/steps/FinancialInformation';
import BankAccount from '../components/steps/BankInformation';
import ReviewConsent from '../components/steps/ReviewConsent';
import StepIndicator from '../components/StepIndicator';
import NavigationButtons from '../components/NavigationButtons';

const StudentLoanForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',

    // Academic Information
    studentId: '',
    institution: '',
    program: '',
    year: '',
    expectedGraduation: '',
    gpa: '',

    // Loan Information
    loanAmount: '',
    loanType: '',
    interestRate: '7',
    loanStartDate: '',
    repaymentTerm: '',
    monthlyPayment: '',
    repaymentDate: '',

    // Financial Information
    annualIncome: '',
    employmentStatus: '',
    employer: '',
    cosignerName: '',
    cosignerPhone: '',

    // Bank Details
    bankName: '',
    accountNumber: '',
    accountName: '',
    bankCode: '',
    bvn: '',

    // Mono Integration
    // monoAccountId: '',
    autoDebitConsent: false,

    // Documents
    profileImage: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [bankConnected, setBankConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Academic Info', icon: GraduationCap },
    { id: 3, title: 'Loan Details', icon: DollarSign },
    { id: 4, title: 'Financial Info', icon: FileText },
    { id: 5, title: 'Bank Account', icon: CreditCard },
    { id: 6, title: 'Review & Submit', icon: CheckCircle }
  ];

  const stepValidations = {
    1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state'],
    2: ['studentId', 'institution', 'program'],
    3: ['loanAmount', 'loanType', 'interestRate', 'repaymentTerm', 'repaymentDate'],
    4: ['cosignerName', 'cosignerPhone'],
    // 5: ['bankName', 'accountNumber', 'accountName', 'bvn'], 
    5: ['bvn'],
    6: ['autoDebitConsent']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Load Mono Connect script
  useEffect(() => {
    const loadMonoScript = () => {
      return new Promise((resolve, reject) => {
        if (document.querySelector('script[src*="connect.withmono.com"]')) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://connect.withmono.com/connect.js';
        script.type = 'application/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadMonoScript()
      .then(() => {
        console.log('Mono Connect script loaded successfully');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Mono Connect script:', err);
        setError('Failed to load Mono Connect');
        setIsLoading(false);
      });
  }, []);


  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.loanAmount) || 0;
    const rate = 0.07 / 12; // 7% annual rate
    const term = (parseFloat(formData.repaymentTerm) || 0) * 12;

    if (principal && rate && term) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      setFormData(prev => ({
        ...prev,
        monthlyPayment: monthlyPayment.toFixed(2)
      }));
    }
  };

  const isStepValid = (step) => {
    const requiredFields = stepValidations[step] || [];
    const hasRequiredFields = requiredFields.every(field => formData[field]?.toString().trim());

    if (step === 5) {
      return hasRequiredFields && bankConnected;
    }

    return hasRequiredFields;
  };

  const nextStep = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSuccess = (data) => {
    console.log('Bank account connected successfully:', data);
    setBankConnected(true);
    setFormData(prev => ({
      ...prev,
      monoAccountId: data.accountId,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      bankName: data.bankName,
      bankCode: data.bankCode
    }));
  };

  const handleError = (error) => {
    console.error('Connection failed:', error);
  };

  const handleClose = () => {
    console.log('User closed the connection modal');
  };

  const handleSubmit = async () => {
    if (!isStepValid(6)) {
      alert('Please complete all required information and provide consent for automatic debit.');
      return;
    }

    const loanApplication = {
      ...formData,
      applicationId: 'LN' + Date.now(),
      applicationDate: new Date().toISOString(),
      status: 'pending_review'
    };

    console.log('Loan Application Submitted:', loanApplication);
    alert('Student loan application submitted successfully! You will receive an email confirmation shortly.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            imagePreview={imagePreview}
            handleImageUpload={handleImageUpload}
          />
        );
      case 2:
        return (
          <AcademicInformation
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <Fees
            formData={formData}
            handleInputChange={handleInputChange}
            calculateMonthlyPayment={calculateMonthlyPayment}
          />
        );
      case 4:
        return (
          <Financial
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <BankAccount
            formData={formData}
            handleInputChange={handleInputChange}
            bankConnected={bankConnected}
            handleSuccess={handleSuccess}
            handleError={handleError}
            handleClose={handleClose}
          />
        );
      case 6:
        return (
          <ReviewConsent
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return (
          <PersonalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            imagePreview={imagePreview}
            handleImageUpload={handleImageUpload}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Student Registration</h1>
          <p className="text-purple-200">Complete your profile to get started</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="min-h-[500px]">
            {renderCurrentStep()}
          </div>

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={prevStep}
            onNext={nextStep}
            onSubmit={handleSubmit}
            isStepValid={isStepValid(currentStep)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentLoanForm;