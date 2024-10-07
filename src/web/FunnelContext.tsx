import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
        uploadedImage,
        setUploadedImage,
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