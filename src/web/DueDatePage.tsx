import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useFunnelContext } from './FunnelContext';
import './funnel.css';

const DueDatePage: React.FC = () => {
  const navigate = useNavigate();
  const { dueDate, setDueDate, specificDate, setSpecificDate } = useFunnelContext();

  const handleBackClick = () => {
    navigate('/budget');
  };

  const handleContinueClick = () => {
    navigate('/success');
  };

  return (
    <div className="funnel-page">
      <div className="progress-container">
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowRight />
        </button>
        <div className="progress-bar">
          <div className="progress" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="funnel-content">
        <h1>מתי אתה צריך את התכשיט?</h1>
        <div className="due-date-options">
          <button
            className={dueDate === 'now' ? 'selected' : ''}
            onClick={() => setDueDate('now')}
          >
            עכשיו
          </button>
          <button
            className={dueDate === 'week' ? 'selected' : ''}
            onClick={() => setDueDate('week')}
          >
            תוך שבוע
          </button>
          <button
            className={dueDate === 'month' ? 'selected' : ''}
            onClick={() => setDueDate('month')}
          >
            תוך חודש
          </button>
          <button
            className={dueDate === 'specific' ? 'selected' : ''}
            onClick={() => setDueDate('specific')}
          >
            תאריך ספציפי
          </button>
        </div>
        {dueDate === 'specific' && (
          <input
            type="date"
            value={specificDate}
            onChange={(e) => setSpecificDate(e.target.value)}
            className="specific-date-input"
          />
        )}
        <button className="continue-button" onClick={handleContinueClick}>המשך</button>
      </div>
    </div>
  );
};

export default DueDatePage;