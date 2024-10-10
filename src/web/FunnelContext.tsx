import React, { createContext, useState, useContext, ReactNode } from 'react';

export type FunnelData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lowerBound: number;
  upperBound: number;
  dueDate: string;
  specificDate: string;
  uploadedImages: string[];
};

interface FunnelContextType {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  lowerBound: number;
  setLowerBound: (value: number) => void;
  upperBound: number;
  setUpperBound: (value: number) => void;
  dueDate: string;
  setDueDate: (date: string) => void;
  specificDate: string;
  setSpecificDate: (date: string) => void;
  uploadedImages: string[];
  setUploadedImages: (images: string[]) => void;
  submitFunnelData: (data: FunnelData) => Promise<void>;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export const FunnelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lowerBound, setLowerBound] = useState(1000);
  const [upperBound, setUpperBound] = useState(10000);
  const [dueDate, setDueDate] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const submitFunnelData = async (data: FunnelData) => {
    console.log('Submitting funnel data:', data);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/funnel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Failed to submit data');
        }
        console.log('Submission successful:', result);
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Received an invalid response from the server');
      }
    } catch (error) {
      console.error('Error submitting funnel data:', error);
      throw error;
    }
  };

  return (
    <FunnelContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phoneNumber,
        setPhoneNumber,
        lowerBound,
        setLowerBound,
        upperBound,
        setUpperBound,
        dueDate,
        setDueDate,
        specificDate,
        setSpecificDate,
        uploadedImages,
        setUploadedImages,
        submitFunnelData,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnelContext = () => {
  const context = useContext(FunnelContext);
  if (context === undefined) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context;
};