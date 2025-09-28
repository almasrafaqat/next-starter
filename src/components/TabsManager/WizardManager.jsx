'use client'
import useTabs from '@/hooks/useTabs';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReusableTabs from '../ui/ReusableTabs/ReusableTabs';

// Mock submission function
const submitWizardData = async (data) => {
  console.log('Submitting wizard data:', data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
const WizardManager = () => {
  const wizardTabs = useTabs('wizardFlow');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepData, setStepData] = useState({});
  // Initialize wizard steps
  useEffect(() => {
    wizardTabs.presets.wizard([
      {
        id: 'step1',
        label: 'Personal Info',
        completed: completedSteps.includes(0),
        current: currentStep === 0
      },
      {
        id: 'step2',
        label: 'Documents',
        completed: completedSteps.includes(1),
        current: currentStep === 1,
        disabled: !completedSteps.includes(0)
      },
      {
        id: 'step3',
        label: 'Verification',
        completed: completedSteps.includes(2),
        current: currentStep === 2,
        disabled: !completedSteps.includes(1)
      }
    ], currentStep);
  }, [currentStep, completedSteps]);

  // Step validation
  const validateStep = (stepIndex, data) => {
    switch (stepIndex) {
      case 0: return data.name && data.email && data.phone;
      case 1: return data.documents && data.documents.length > 0;
      case 2: return data.verified === true;
      default: return false;
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep, stepData[currentStep])) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Complete wizard
  const completeWizard = async () => {
    try {
      await submitWizardData(stepData);
      // Show success message or redirect
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <ReusableTabs id="wizardFlow" />

      {/* Step Navigation */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        {currentStep < 2 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={completeWizard}>Complete</Button>
        )}
      </div>
    </div>
  )
}

export default WizardManager