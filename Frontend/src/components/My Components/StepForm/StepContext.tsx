import { createContext, useState, useContext, ReactNode } from 'react';

interface StepContextProps {
  applicationNo: string;
  setApplicationNo: (value: string) => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [applicationNo, setApplicationNo] = useState<string>('');

  return (
    <StepContext.Provider value={{ applicationNo, setApplicationNo }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = (): StepContextProps => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStepContext must be used within a StepProvider');
  }
  return context;
};
