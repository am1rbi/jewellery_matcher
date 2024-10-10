import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Custom error type
type AppError = {
  message: string;
  status?: number;
};

// FunnelData type
type FunnelData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lowerBound: number;
  upperBound: number;
  dueDate: string;
  specificDate: string;
  uploadedImages: string[];
};

const SuccessPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Get the actual submitted data from the location state
    const submittedData = location.state?.funnelData as FunnelData;
    if (submittedData) {
      setFunnelData(submittedData);
      submitFunnelData(submittedData);
    }
  }, [location]);

  const submitFunnelData = async (data: FunnelData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/funnel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      console.log('Funnel data submitted successfully');
    } catch (error) {
      console.error('Error submitting funnel data:', error);
      const appError = error as AppError;
      setSubmitError(`An error occurred: ${appError.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatBudget = (value: number) => {
    return `₪${value.toLocaleString('he-IL')}`;
  };

  const getDueDateText = (dueDate: string, specificDate: string) => {
    switch (dueDate) {
      case 'now':
        return 'מיידי';
      case 'week':
        return 'תוך שבוע';
      case 'month':
        return 'תוך חודש';
      case 'specific':
        return `בתאריך ${specificDate}`;
      default:
        return 'לא צוין';
    }
  };

  if (!funnelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="funnel-page">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="funnel-content success-content">
        <div className="success-icon">✅</div>
        <h1>תודה רבה!</h1>
        {isSubmitting ? (
          <p>מעבד את המידע שלך...</p>
        ) : submitError ? (
          <p className="error-message">{submitError}</p>
        ) : (
          <>
            <p>קיבלנו את כל המידע הדרוש ונתחיל לחפש את התכשיט המושלם עבורך.</p>
            <p>נחזור אליך בהקדם עם תוצאות החיפוש.</p>

            <div className="summary">
              <h2>סיכום הפרטים שמסרת:</h2>
              <p><strong>שם מלא:</strong> {`${funnelData.firstName} ${funnelData.lastName}`}</p>
              <p><strong>מספר טלפון:</strong> {funnelData.phoneNumber}</p>
              <p><strong>טווח תקציב:</strong> {formatBudget(funnelData.lowerBound)} - {formatBudget(funnelData.upperBound)}</p>
              <p><strong>מועד רצוי:</strong> {getDueDateText(funnelData.dueDate, funnelData.specificDate)}</p>
              {funnelData.uploadedImages.length > 0 && (
                <div>
                  <p><strong>תמונות שהועלו:</strong></p>
                  <div className="uploaded-images-grid">
                    {funnelData.uploadedImages.map((image, index) => (
                      <img key={index} src={image} alt={`תכשיט שהועלה ${index + 1}`} className="uploaded-image" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;