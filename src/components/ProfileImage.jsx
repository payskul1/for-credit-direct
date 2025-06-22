import { Upload, User } from "lucide-react";

const ProfileImageUpload = ({ imagePreview, onImageUpload }) => (
  <div className="mb-8 text-center">
    <div className="relative inline-block">
      <div className="w-32 h-32 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-purple-300">
        {imagePreview ? (
          <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-purple-600" />
        )}
      </div>
      <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
        <Upload className="w-4 h-4" />
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
      </label>
    </div>
    <p className="text-purple-200 text-sm">Upload your profile photo</p>
  </div>
);

export default ProfileImageUpload;