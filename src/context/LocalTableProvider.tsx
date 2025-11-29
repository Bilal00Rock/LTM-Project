import React, { createContext, useContext, useState, ReactNode } from "react";

interface DoctorDataType {
  mobile: string;
  nationalCode: string;
  fullName: string;
  personnelCode: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
interface PatientDataType {
  mobile: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  doctorId: string;
  gender: string;
  maritalStatus: string;
  birthdate: string;
}

interface LocalTableContextType {
  localDataDoc: DoctorDataType[];
  setLocalDataDoc: React.Dispatch<React.SetStateAction<DoctorDataType[]>>;

  localDataPatient: PatientDataType[];
  setLocalDataPatient: React.Dispatch<React.SetStateAction<PatientDataType[]>>;

  localDataPending: PatientDataType[];
  setLocalDataPending: React.Dispatch<React.SetStateAction<PatientDataType[]>>;
}

const LocalTableContext = createContext<LocalTableContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const LocalTableProvider = ({ children }: Props) => {
  const [localDataDoc, setLocalDataDoc] = useState<DoctorDataType[]>([]);
  const [localDataPatient, setLocalDataPatient] = useState<PatientDataType[]>([]);
  const [localDataPending, setLocalDataPending] = useState<PatientDataType[]>([]);

  return (
    <LocalTableContext.Provider
      value={{
        localDataDoc,
        setLocalDataDoc,
        localDataPatient,
        setLocalDataPatient,
        localDataPending,
        setLocalDataPending,
      }}
    >
      {children}
    </LocalTableContext.Provider>
  );
};

export const useLocalTableContext = () => {
  const context = useContext(LocalTableContext);
  if (!context) {
    throw new Error(
      "useLocalTableContext باید داخل LocalTableProvider استفاده شود"
    );
  }
  return context;
};
