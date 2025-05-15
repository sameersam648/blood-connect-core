
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the donor type
export interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bloodType: string;
  age: string;
  weight: string;
  lastDonation: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  medicalConditions: string;
  status: "active" | "inactive";
}

interface DonorContextType {
  donors: Donor[];
  addDonor: (donor: Omit<Donor, "id" | "status">) => void;
  getDonorById: (id: string) => Donor | undefined;
}

const DonorContext = createContext<DonorContextType | undefined>(undefined);

// Sample initial donor data
const initialDonors: Donor[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    bloodType: "O+",
    age: "28",
    weight: "75",
    lastDonation: "2023-04-15",
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    medicalConditions: "",
    status: "active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    bloodType: "A-",
    age: "34",
    weight: "62",
    lastDonation: "2023-03-22",
    address: "456 Oak Ave",
    city: "Riverdale",
    state: "NY",
    zipCode: "10471",
    medicalConditions: "Low blood pressure",
    status: "active",
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "(555) 456-7890",
    bloodType: "B+",
    age: "42",
    weight: "80",
    lastDonation: "2023-05-01",
    address: "789 Pine Rd",
    city: "Oakville",
    state: "CA",
    zipCode: "94563",
    medicalConditions: "",
    status: "inactive",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    bloodType: "AB+",
    age: "25",
    weight: "58",
    lastDonation: "2023-01-10",
    address: "321 Cedar Ln",
    city: "Lakeview",
    state: "WA",
    zipCode: "98033",
    medicalConditions: "",
    status: "active",
  },
];

export const DonorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>(initialDonors);

  const addDonor = (donorData: Omit<Donor, "id" | "status">) => {
    const newDonor: Donor = {
      ...donorData,
      id: (donors.length + 1).toString(),
      status: "active",
    };
    
    setDonors((prevDonors) => [...prevDonors, newDonor]);
    
    // This is where you would normally make an API call to store in MySQL
    console.log("New donor added:", newDonor);
  };

  const getDonorById = (id: string) => {
    return donors.find((donor) => donor.id === id);
  };

  return (
    <DonorContext.Provider value={{ donors, addDonor, getDonorById }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonors = () => {
  const context = useContext(DonorContext);
  if (context === undefined) {
    throw new Error("useDonors must be used within a DonorProvider");
  }
  return context;
};
