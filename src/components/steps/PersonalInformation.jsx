import FormInput from "../../core/FormInput";
import { User, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import ProfileImageUpload from "../ProfileImage";


const PersonalInformation = ({ formData, handleInputChange, imagePreview, handleImageUpload }) => (
  // <div>
    <div className="space-y-6">

    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
      <User className="w-6 h-6 mr-3 text-purple-300" />
      Personal Information
    </h2>

    <ProfileImageUpload imagePreview={imagePreview} onImageUpload={handleImageUpload} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      <FormInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="Enter first name"
        required
      />
      <FormInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Enter last name"
        required
      />
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter email address"
        icon={Mail}
        required
      />
      <FormInput
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Enter phone number"
        icon={Phone}
        required
      />
      <FormInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleInputChange}
        icon={Calendar}
        required
      />
      </div>
      <FormInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Enter full address"
        icon={MapPin}
        required
      />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* hello world */}

      <FormInput
        label="City"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="Enter city"
        required
      />
      <FormInput
        label="State"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        placeholder="Enter state"
        required
      />
    </div>
  </div>
);

export default PersonalInformation;