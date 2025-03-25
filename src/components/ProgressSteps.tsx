
import React from 'react';
import { Check, Circle } from 'lucide-react';

interface Step {
  name: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <div key={step.name} className="flex flex-col items-center">
            <div className="flex items-center">
              {step.status === 'complete' ? (
                <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white">
                  <Check size={16} className="text-blue-500" />
                </div>
              ) : step.status === 'current' ? (
                <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                  <Circle size={16} className="text-gray-300" />
                </div>
              )}
              
              {stepIdx < steps.length - 1 && (
                <div 
                  className={`w-16 sm:w-24 h-0.5 ${
                    step.status === 'complete' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <span className="mt-2 text-xs sm:text-sm text-gray-700">
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
