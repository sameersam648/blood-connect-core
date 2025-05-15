
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useMySQLDatabase } from "@/hooks/useMySQLDatabase";
import { useToast } from "@/components/ui/use-toast";

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
  addDonor: (donor: Omit<Donor, "id" | "status">) => Promise<void>;
  getDonorById: (id: string) => Donor | undefined;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { saveDonor, getDonors, updateDonor, deleteDonor } = useMySQLDatabase();

  // Load donors from MySQL database on component mount
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await getDonors();
        if (response.success && response.donors.length > 0) {
          setDonors(response.donors);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch donors from the database.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [getDonors, toast]);

  const addDonor = async (donorData: Omit<Donor, "id" | "status">) => {
    setLoading(true);
    
    try {
      const newDonor: Donor = {
        ...donorData,
        id: (donors.length + 1).toString(), // Fallback ID in case MySQL save fails
        status: "active",
      };
      
      // Save to MySQL database
      const response = await saveDonor(newDonor);
      
      if (response.success) {
        // Update donor with the ID from database
        const savedDonor: Donor = {
          ...newDonor,
          id: response.id || newDonor.id,
        };
        
        setDonors((prevDonors) => [...prevDonors, savedDonor]);
        
        toast({
          title: "Success",
          description: "Donor added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save donor to database",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding donor:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDonorById = (id: string) => {
    return donors.find((donor) => donor.id === id);
  };

  return (
    <DonorContext.Provider value={{ donors, addDonor, getDonorById, loading }}>
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
