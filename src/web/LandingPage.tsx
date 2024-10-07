import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useFunnelContext } from './FunnelContext';

const LandingPage: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUploadedImage } = useFunnelContext();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setSelectedImages([imageDataUrl]);
        setUploadedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleContinueClick = () => {
    if (selectedImages.length > 0) {
      navigate('/funnel');
    }
  };

  return (
    <div className="landing-page" dir="rtl">
      <header>
        <div className="logo">Gold & Gem</div>
        <nav>
          <a href="#features">תכונות</a>
          <a href="#about">אודות</a>
        </nav>
      </header>
      <main>
        <div className="hero">
          <h1>בתכלס, היא כבר בחרה את התכשיט המושלם. תן לנו למצוא אותו בשבילך.</h1>
          <p>Gold & Gem כאן כדי לחסוך לך זמן וכאב ראש. שתף איתנו תמונה של התכשיט שהיא בחרה, ותן לאפליקציה מבוססת ה-AI שלנו למצוא לך אותו ברבע מהזמן שלוקח לך להגיע לבורסה ברמת גן. 
            איכות? יש. מחיר הוגן? ברור. התכשיט המושלם במרחק תמונה אחת ממך!</p>
          <div className="cta-buttons">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button className="icon-btn upload-btn" onClick={handleUploadClick} aria-label="העלאת תמונות">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 15h2V6h3l-4-5-4 5h3z"/>
                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"/>
              </svg>
            </button>
            
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              ref={cameraInputRef}
              style={{ display: 'none' }}
            />
            <button className="icon-btn camera-btn" onClick={handleCameraClick} aria-label="צילום תמונה">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3.2"/>
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="app-preview">
          {selectedImages.length > 0 && (
            <div className="image-grid">
              {selectedImages.map((image, index) => (
                <div key={index} className="image-container">
                  <img src={image} alt={`תכשיט נבחר ${index + 1}`} className="preview-image" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {selectedImages.length > 0 && (
        <button className="continue-button" onClick={handleContinueClick}>
          #התחלנו
        </button>
      )}
    </div>
  );
};

export default LandingPage;