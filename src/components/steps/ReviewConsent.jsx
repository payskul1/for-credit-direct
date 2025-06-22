import { AlertCircle, Shield } from "lucide-react";

const ReviewConsent = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
      <Shield className="w-6 h-6 mr-3 text-purple-300" />
      Automatic Repayment Setup
    </h2>
    
    <div className="bg-blue-900/30 rounded-2xl p-6 border border-blue-500/30">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            name="autoDebitConsent"
            checked={formData.autoDebitConsent}
            onChange={handleInputChange}
            className="w-5 h-5 text-purple-600 bg-white/20 border-purple-300 rounded focus:ring-purple-400 focus:ring-2"
            required
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Consent to Automatic Debit *
          </h3>
          <p className="text-purple-200 text-sm mb-4">
            I hereby authorize the automatic deduction of my monthly loan repayment amount of 
            <span className="font-semibold text-white"> ₦{formData.monthlyPayment || '0'} </span>
            from my connected bank account on the specified repayment date each month.
          </p>
          <div className="bg-yellow-900/40 rounded-lg p-4 border border-yellow-500/30">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
              <p className="text-yellow-200 text-sm">
                <strong>Important:</strong> Ensure sufficient funds are available in your account 
                before each deduction date to avoid failed payments and potential penalties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewConsent;
