import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButtons = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit, isStepValid }) => (
  <div className="flex justify-between mt-8">
    <button
      type="button"
      onClick={onPrevious}
      disabled={currentStep === 1}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
        currentStep === 1
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
      }`}
    >
      <ChevronLeft className="w-5 h-5 mr-2" />
      Previous
    </button>

    {currentStep < totalSteps ? (
      <button
        type="button"
        onClick={onNext}
        className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 flex items-center hover:scale-105"
      >
        Next
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    ) : (
      <button
        type="button"
        onClick={onSubmit}
        className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center hover:scale-105"
      >
        <Check className="w-5 h-5 mr-2" />
        Complete Registration
      </button>
    )}
  </div>
);

export default NavigationButtons;