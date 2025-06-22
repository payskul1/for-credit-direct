const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false, icon: Icon, ...props }) => (
  <div>
    <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label} {required && '*'}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white/20 border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
      placeholder={placeholder}
      required={required}
      {...props}
    />
  </div>
);

export default FormInput;