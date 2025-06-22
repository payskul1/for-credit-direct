const FormSelect = ({ label, name, value, onChange, options, required = false, icon: Icon }) => (
  <div>
    <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label} {required && '*'}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      // onBlur={onBlur}
      className="w-full px-4 py-3 bg-white/20 border border-purple-300/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
      required={required}
    >
      <option value="" className="text-gray-800">Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-800">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;