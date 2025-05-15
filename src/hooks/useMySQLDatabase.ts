/**
 * Hook for MySQL database connection
 * 
 * This is a placeholder hook for MySQL database connection.
 * In a real application, you would connect to MySQL using a server-side API
 * since direct database connections from the browser are not secure.
 */

import axios from 'axios';

interface MySQLConfig {
  host: string;
  database: string;
  user: string;
  password: string;
}

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

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useMySQLDatabase = () => {
  const saveDonor = async (donor: Donor) => {
    try {
      const response = await api.post('/donors', donor);
      
      if (response.status >= 200 && response.status < 300) {
        return { 
          success: true, 
          id: response.data.id 
        };
      } else {
        console.error("Error saving donor, response:", response);
        return { 
          success: false, 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error("Error saving donor:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save donor' 
      };
    }
  };

  const getDonors = async () => {
    try {
      const response = await api.get('/donors');
      
      if (response.status === 200) {
        return { 
          success: true, 
          donors: response.data.donors || [] 
        };
      } else {
        console.error("Error fetching donors, response:", response);
        return { 
          success: false, 
          donors: [], 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error("Error fetching donors:", error);
      return { 
        success: false, 
        donors: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch donors' 
      };
    }
  };

  const getDonorById = async (id: string) => {
    try {
      const response = await api.get(`/donors/${id}`);
      
      if (response.status === 200) {
        return { 
          success: true, 
          donor: response.data.donor 
        };
      } else {
        console.error(`Error fetching donor ${id}, response:`, response);
        return { 
          success: false, 
          donor: null, 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error(`Error fetching donor ${id}:`, error);
      return { 
        success: false, 
        donor: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch donor' 
      };
    }
  };

  const updateDonor = async (id: string, donor: Donor) => {
    try {
      const response = await api.put(`/donors/${id}`, donor);
      
      if (response.status === 200) {
        return { success: true };
      } else {
        console.error(`Error updating donor ${id}, response:`, response);
        return { 
          success: false, 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error(`Error updating donor ${id}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update donor' 
      };
    }
  };

  const deleteDonor = async (id: string) => {
    try {
      const response = await api.delete(`/donors/${id}`);
      
      if (response.status === 200) {
        return { success: true };
      } else {
        console.error(`Error deleting donor ${id}, response:`, response);
        return { 
          success: false, 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error(`Error deleting donor ${id}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete donor' 
      };
    }
  };

  const getStats = async () => {
    try {
      const response = await api.get('/stats');
      
      if (response.status === 200) {
        return { 
          success: true, 
          stats: response.data.stats 
        };
      } else {
        console.error("Error fetching stats, response:", response);
        return { 
          success: false, 
          stats: null, 
          error: response.data.error || 'Unknown error occurred' 
        };
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      return { 
        success: false, 
        stats: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch stats' 
      };
    }
  };

  return {
    saveDonor,
    getDonors,
    getDonorById,
    updateDonor,
    deleteDonor,
    getStats
  };
};
