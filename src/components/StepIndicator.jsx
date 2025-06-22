import { Check } from "lucide-react";

const StepIndicator = ({ steps, currentStep }) => (
      <div className="flex justify-between mb-8 relative">
          {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${currentStep >= step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/20 text-white/50'
                      }`}>
                      {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                      ) : (
                          <step.icon className="w-5 h-5" />
                      )}
                  </div>
                  <span className={`text-xs text-center ${currentStep >= step.id ? 'text-white' : 'text-white/50'
                      }`}>
                      {step.title}
                  </span>
  
                  {index < steps.length - 1 && (
                      <div
                          className={`absolute top-5 left-1/2 h-0.5 ${currentStep > step.id ? 'bg-purple-600' : 'bg-white/20'
                              }`}
                          style={{
                              width: 'calc(100vw / 6 - 40px)',
                              transform: 'translateX(20px)',
                              zIndex: 1
                          }}
                      />
                  )}
              </div>
          ))}
      </div>
  );
  

export default StepIndicator;