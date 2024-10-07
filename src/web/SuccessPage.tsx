import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useFunnelContext } from './FunnelContext';
import './funnel.css';

const SuccessPage: React.FC = () => {
  const { firstName, lastName, phoneNumber, lowerBound, upperBound, dueDate, specificDate, uploadedImage } = useFunnelContext();

  const formatBudget = (value: number) => {
    return `₪${value.toLocaleString('he-IL')}`;
  };

  const getDueDateText = () => {
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

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="funnel-page">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="funnel-content success-content">
        <FaCheckCircle className="success-icon" />
        <h1>תודה רבה!</h1>
        <p>קיבלנו את כל המידע הדרוש ונתחיל לחפש את התכשיט המושלם עבורך.</p>
        <p>נחזור אליך בהקדם עם תוצאות החיפוש.</p>

        <div className="summary">
          <h2>סיכום הפרטים שמסרת:</h2>
          <p><strong>שם מלא:</strong> {fullName}</p>
          <p><strong>מספר טלפון:</strong> {phoneNumber}</p>
          <p><strong>טווח תקציב:</strong> {formatBudget(lowerBound)} - {formatBudget(upperBound)}</p>
          <p><strong>מועד רצוי:</strong> {getDueDateText()}</p>
          {uploadedImage && (
            <div>
              <p><strong>תמונה שהועלתה:</strong></p>
              <img src={uploadedImage} alt="Uploaded jewelry" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;