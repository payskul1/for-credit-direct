import { DollarSign } from "lucide-react";
import FormInput from "../../core/FormInput";
import FormSelect from "../../core/FormSelect";

const Fees = ({ formData, handleInputChange, calculateMonthlyPayment }) => {
  const feeTypeOptions = [
    { value: "Tuition Fee Loan", label: "Tuition Fee Loan" },
    { value: "Living Expenses Loan", label: "Living Expenses Loan" },
    { value: "Equipment/Books Loan", label: "Equipment/Books Loan" },
    { value: "Emergency Student Loan", label: "Emergency Student Loan" }
  ];

  const termOptions = [
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "4", label: "4 years" },
    { value: "5", label: "5 years" }
  ];
  // const calMonthlyPayment = () => {
  //   const principal = parseFloat(formData.loanAmount) || 0;
  //   const rate = (parseFloat(formData.interestRate) || 0) / 100 / 12;
  //   const term = (parseFloat(formData.repaymentTerm) || 0) * 12;

  //   if (principal && rate && term) {
  //     const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  //     setFormData(prev => ({
  //       ...prev,
  //       monthlyPayment: monthlyPayment.toFixed(2)
  //     }));
  //   }
  // };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <DollarSign className="w-6 h-6 mr-3 text-purple-300" />
        Fee Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Fee Amount (₦)"
          name="loanAmount"
          type="number"
          value={formData.loanAmount}
          onChange={handleInputChange}
          onBlur={calculateMonthlyPayment}
          placeholder="Enter loan amount"
          required
        />
        <FormSelect
          label="Fee Type"
          name="loanType"
          value={formData.loanType}
          onChange={handleInputChange}
          options={feeTypeOptions}
          required
        />
        <FormInput
          label="Interest Rate (%)"
          name="interestRate"
          type="number"
          value="7"
          readOnly
          step="0.01"
          placeholder="Enter interest rate"
          required
        />
        <FormSelect
          label="Payment Term (years)"
          name="repaymentTerm"
          value={formData.repaymentTerm}
          onChange={(e) => {
            handleInputChange(e);
            calculateMonthlyPayment();
          }}
          options={termOptions}
          required
        />
        <FormInput
          label="Monthly Payment (₦)"
          name="monthlyPayment"
          type="number"
          value={formData.monthlyPayment}
          readOnly
          className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none cursor-not-allowed"
          placeholder="Auto-calculated"
        />
        <FormInput
          label="Repayment Start Date"
          name="repaymentDate"
          type="date"
          value={formData.repaymentDate}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
};

export default Fees;