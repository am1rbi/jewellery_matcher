import React, { useState, ReactNode } from 'react';
import './funnel.css';

interface FunnelPageProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
}

const FunnelPage: React.FC<FunnelPageProps> = ({ step, totalSteps, children, onNext, onBack }) => (
  <div className="funnel-page">
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
    </div>
    <button className="back-button" onClick={onBack}>חזור</button>
    {children}
  </div>
);

const SignUpPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (number: string) => {
    const regex = /^(\d{3}-\d{7}|\d{10})$/;
    return regex.test(number);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d-]/g, '');
    setPhoneNumber(value);
    setError('');
  };

  const handleSubmit = () => {
    if (validatePhoneNumber(phoneNumber)) {
      onNext();
    } else {
      setError('מספר הטלפון אינו תקין. נא להזין במבנה XXX-XXXXXXX או XXXXXXXXXX');
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="sign-up-page">
      <h2 className="signup-header">הזינו נייד או הרשמו עם סושיאל</h2>
      <input
        type="tel"
        placeholder="מספר טלפון נייד"
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSubmit}>המשך</button>
      <div className="social-buttons">
        <button className="google-btn" onClick={() => handleSocialLogin('Google')}>Continue with Google</button>
        <button className="facebook-btn" onClick={() => handleSocialLogin('Facebook')}>Continue with Facebook</button>
        <button className="linkedin-btn" onClick={() => handleSocialLogin('LinkedIn')}>Continue with LinkedIn</button>
      </div>
      <p>על ידי התחברות אני מאשר/ת את תנאי השימוש ואת מדיניות הפרטיות.</p>
    </div>
  );
};

const BudgetPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [budget, setBudget] = useState({ lower: 0, upper: 10000 });

  return (
    <div className="budget-page">
      <h2>מה התקציב שלך?</h2>
      <div className="budget-gauge">
        <input 
          type="range" 
          min="0" 
          max="20000" 
          value={budget.upper} 
          onChange={(e) => setBudget({ ...budget, upper: parseInt(e.target.value) })}
        />
      </div>
      <div className="budget-inputs">
        <input 
          type="number" 
          value={budget.lower} 
          onChange={(e) => setBudget({ ...budget, lower: parseInt(e.target.value) })}
        />
        <input 
          type="number" 
          value={budget.upper} 
          onChange={(e) => setBudget({ ...budget, upper: parseInt(e.target.value) })}
        />
      </div>
      <button onClick={onNext}>המשך</button>
    </div>
  );
};

const TimelinePage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [timeline, setTimeline] = useState('');
  const [specificDate, setSpecificDate] = useState('');

  return (
    <div className="timeline-page">
      <h2>האם יש תאריך בו תצטרך את התכשיט</h2>
      <div className="timeline-options">
        <button onClick={() => setTimeline('now')} className={timeline === 'כמה שיותר קרוב' ? 'selected' : ''}>כמה שיותר קרוב</button>
        <button onClick={() => setTimeline('week')} className={timeline === 'בשבוע הקרוב' ? 'selected' : ''}>בשבוע הקרוב</button>
        <button onClick={() => setTimeline('month')} className={timeline === 'בחודש הקרוב' ? 'selected' : ''}>בחודש הקרוב</button>
      </div>
      <div className="specific-date">
        <label>אפשר גם לבחור תאריך מדוייק:</label>
        <input 
          type="date" 
          value={specificDate} 
          onChange={(e) => setSpecificDate(e.target.value)}
        />
      </div>
      <button onClick={onNext}>המשך</button>
    </div>
  );
};

const Funnel: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(Math.max(1, step - 1));

  return (
    <div className="funnel">
      {step === 1 && (
        <FunnelPage step={step} totalSteps={totalSteps} onNext={nextStep} onBack={() => {}}>
          <SignUpPage onNext={nextStep} />
        </FunnelPage>
      )}
      {step === 2 && (
        <FunnelPage step={step} totalSteps={totalSteps} onNext={nextStep} onBack={prevStep}>
          <BudgetPage onNext={nextStep} />
        </FunnelPage>
      )}
      {step === 3 && (
        <FunnelPage step={step} totalSteps={totalSteps} onNext={() => {}} onBack={prevStep}>
          <TimelinePage onNext={() => {}} />
        </FunnelPage>
      )}
    </div>
  );
};

export default Funnel;