import { GraduationCap } from "lucide-react";
import FormInput from "../../core/FormInput";
import FormSelect from "../../core/FormSelect";

const AcademicInformation = ({ formData, handleInputChange }) => {
  const yearOptions = [
    { value: "1st Year", label: "1st Year" },
    { value: "2nd Year", label: "2nd Year" },
    { value: "3rd Year", label: "3rd Year" },
    { value: "4th Year", label: "4th Year" },
    { value: "Graduate", label: "Graduate" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <GraduationCap className="w-6 h-6 mr-3 text-purple-300" />
        Academic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleInputChange}
          placeholder="Enter student ID"
          required
        />
        <FormInput
          label="Institution"
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          placeholder="Enter institution name"
          required
        />
        <FormInput
          label="Program/Major"
          name="program"
          value={formData.program}
          onChange={handleInputChange}
          placeholder="Enter program/major"
          required
        />
        <FormSelect
          label="Current Year"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          options={yearOptions}
        />
        <FormInput
          label="Expected Graduation"
          name="expectedGraduation"
          type="date"
          value={formData.expectedGraduation}
          onChange={handleInputChange}
        />
        <FormInput
          label="Current GPA"
          name="gpa"
          type="number"
          value={formData.gpa}
          onChange={handleInputChange}
          placeholder="Enter GPA"
          step="0.01"
          min="0"
          max="4"
        />
      </div>
    </div>
  );
};

export default AcademicInformation;