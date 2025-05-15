import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useMySQLDatabase, Donor as DbDonor } from "@/hooks/useMySQLDatabase";
import { useToast } from "@/components/ui/use-toast";

// Use the imported type
type Donor = DbDonor;

interface DonorContextType {
  donors: Donor[];
  addDonor: (donor: Omit<Donor, "id" | "status">) => Promise<void>;
  updateDonor: (id: string, donor: Donor) => Promise<void>;
  deleteDonor: (id: string) => Promise<void>;
  getDonorById: (id: string) => Donor | undefined;
  loading: boolean;
  stats: any;
  refreshDonors: () => Promise<void>;
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
  const [donors, setDonors] = useState<Donor[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { 
    saveDonor, 
    getDonors, 
    updateDonor: apiUpdateDonor, 
    deleteDonor: apiDeleteDonor,
    getStats: apiGetStats 
  } = useMySQLDatabase();

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await getDonors();
      if (response.success) {
        setDonors(response.donors);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch donors",
          variant: "destructive",
        });
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

  const fetchStats = async () => {
    try {
      const response = await apiGetStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Load donors and stats from MySQL database on component mount
  useEffect(() => {
    fetchDonors();
    fetchStats();
  }, []);

  const addDonor = async (donorData: Omit<Donor, "id" | "status">) => {
    setLoading(true);
    
    try {
      const newDonor = {
        ...donorData,
        id: "", // Will be assigned by the database
        status: "active" as const,
      };
      
      // Save to MySQL database
      const response = await saveDonor(newDonor);
      
      if (response.success) {
        // Refresh donors list instead of optimistically updating the state
        await fetchDonors();
        await fetchStats();
        
        toast({
          title: "Success",
          description: "Donor added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to save donor to database",
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

  const updateDonor = async (id: string, donor: Donor) => {
    setLoading(true);
    
    try {
      const response = await apiUpdateDonor(id, donor);
      
      if (response.success) {
        // Refresh donors list instead of optimistically updating the state
        await fetchDonors();
        await fetchStats();
        
        toast({
          title: "Success",
          description: "Donor updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to update donor",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating donor:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteDonor = async (id: string) => {
    setLoading(true);
    
    try {
      const response = await apiDeleteDonor(id);
      
      if (response.success) {
        // Refresh donors list instead of optimistically updating the state
        await fetchDonors();
        await fetchStats();
        
        toast({
          title: "Success",
          description: "Donor deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete donor",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
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

  const refreshDonors = async () => {
    await fetchDonors();
    await fetchStats();
  };

  return (
    <DonorContext.Provider 
      value={{ 
        donors, 
        addDonor, 
        updateDonor, 
        deleteDonor, 
        getDonorById, 
        loading, 
        stats,
        refreshDonors
      }}
    >
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
