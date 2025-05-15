import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useDonors } from "@/contexts/DonorContext";

const DonorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addDonor } = useDonors();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bloodType: "",
    age: "",
    weight: "",
    lastDonation: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    medicalConditions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add donor to context (which would normally save to MySQL)
    addDonor(formData);
    
    toast({
      title: "Donor added successfully",
      description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
    });
    
    // Redirect to donors list
    navigate("/donors");
  };

  return (
    <div className="pt-16 pb-8 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Donor</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate("/donors")}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donor Information</CardTitle>
          <CardDescription>
            Enter the donor's personal details and medical information.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select 
                  name="bloodType" 
                  value={formData.bloodType}
                  onValueChange={(value) => handleSelectChange(value, "bloodType")}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  value={formData.weight}
                  onChange={handleChange}
                  min="45"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastDonation">Last Donation Date</Label>
              <Input 
                id="lastDonation" 
                name="lastDonation" 
                type="date" 
                value={formData.lastDonation}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Input 
                id="medicalConditions" 
                name="medicalConditions" 
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="Any medical conditions or medications (optional)"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/donors")}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Save Donor
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DonorForm;
