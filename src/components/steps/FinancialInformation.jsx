import { FileText } from "lucide-react";
import FormInput from "../../core/FormInput";
import FormSelect from "../../core/FormSelect";

const Financial = ({ formData, handleInputChange }) => {
  const employmentOptions = [
    { value: "Student", label: "Student" },
    { value: "Part-time", label: "Part-time" },
    { value: "Full-time", label: "Full-time" },
    { value: "Unemployed", label: "Unemployed" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-3 text-purple-300" />
        Financial Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Annual Income (₦)"
          name="annualIncome"
          type="number"
          value={formData.annualIncome}
          onChange={handleInputChange}
          placeholder="Enter annual income"
        />
        <FormSelect
          label="Employment Status"
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleInputChange}
          options={employmentOptions}
        />
        <FormInput
          label="Employer (if applicable)"
          name="employer"
          value={formData.employer}
          onChange={handleInputChange}
          placeholder="Enter employer name"
        />
        <FormInput
          label="Co-signer Name"
          name="cosignerName"
          value={formData.cosignerName}
          onChange={handleInputChange}
          placeholder="Enter co-signer name"
          required
        />
        <FormInput
          label="Co-signer Phone"
          name="cosignerPhone"
          type="tel"
          value={formData.cosignerPhone}
          onChange={handleInputChange}
          placeholder="Enter co-signer phone"
          required
        />
      </div>
    </div>
  );
};

export default Financial;