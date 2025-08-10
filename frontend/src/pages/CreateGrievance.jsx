import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CreateGrievance.css';

const steps = [
  "Personal Information",
  "Grievance Details",
  "Supporting Documents",
  "Review and Submit"
];

const CreateGrievance = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="create-grievance-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>{steps[currentStep]}</h2>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="form-step"
          >
            {currentStep === 0 && (
              <div>
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <label>Grievance Title</label>
                <input type="text" placeholder="A brief title for your grievance" />
                <label>Grievance Description</label>
                <textarea rows="5" placeholder="Describe your grievance in detail"></textarea>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <label>Upload Documents</label>
                <input type="file" multiple />
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h3>Review your submission</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="form-footer">
          {currentStep > 0 && <button onClick={handlePrev}>Previous</button>}
          {currentStep < steps.length - 1 && <button onClick={handleNext}>Next</button>}
          {currentStep === steps.length - 1 && <button>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default CreateGrievance;
