import { CheckCircle, CreditCard } from "lucide-react";
import FormInput from "../../core/FormInput";
import MonoConnector from "../MonoConnector";
import ErrorBoundary from "../ErrorBoundary";

const BankAccount = ({ formData, handleInputChange, bankConnected, handleSuccess, handleError, handleClose }) => {
  const pubKey = "test_pk_vulwcz9yw9kqdtvua5q4";
  //   const [bvn, set]
  const customer = {
    // id: "65c31fa54e0e963044f014bb",
    name: "Samuel Olamide",
    email: "samuel@neem.com",
    identity: {
      type: "bvn",
      // bvn: 2323233239
    },
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <CreditCard className="w-6 h-6 mr-3 text-purple-300" />
        Bank Account Details
      </h2>

      {!bankConnected ? (
        <ErrorBoundary>
        <MonoConnector
          customer={customer}
          publicKey={pubKey}
          bvn={formData.bvn}
          onSuccess={handleSuccess}
          onError={handleError}
          onClose={handleClose}
          buttonText="Link Bank Account"
        />
        </ErrorBoundary>
      ) : (
        <div className="bg-green-900/30 rounded-2xl p-6 mb-6 border border-green-500/30">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Bank Account Connected</h3>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="BVN"
          name="bvn"
          value={formData.bvn}
          onChange={handleInputChange}
          placeholder="Enter your BVN"
          maxLength="11"
          required
        />
      </div>
    </div>
  );
};

export default BankAccount;