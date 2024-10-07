import React, { useState, useRef } from 'react';
import './styles.css';
import Funnel from './Funnel';

const LandingPage: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showFunnel, setShowFunnel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="landing-page" dir="rtl">
      {!showFunnel ? (
        <>
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
                  multiple
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
                      <button className="remove-btn" onClick={() => removeImage(index)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
          {selectedImages.length > 0 && (
            <button className="find-perfect-piece" onClick={() => setShowFunnel(true)}>
              קדימה לעבודה!
            </button>
          )}
        </>
      ) : (
        <Funnel />
      )}
    </div>
  );
};

export default LandingPage;