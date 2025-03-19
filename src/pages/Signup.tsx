
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Lock, Mail, User, UserPlus } from "lucide-react";

// Form validation schema

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  age: z.number().int().gte(0, {
    message: "Age must be more than 0"
  }).lte(120,{
      message: "Age must be less than 120"
  }),
  gender: z.enum(['male', 'female', 'other'], {
      // default: 'male',
      message: 'please chose one of male, female or other'
  }),
  height: z.number().int().min(0),
  weight: z.number().int().min(0),
  medicalHistory: z.string().min(0, { 
    message: "Please provide your medical history" 
  }),
  allergies: z.string().min(0, { 
    message: "Please list any allergies"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// const formSchema = z.object({
//   name: z.string().min(2, { 
//     message: "Name must be at least 2 characters" 
//   }),
//   email: z.string().email({ 
//     message: "Please enter a valid email address" 
//   }),
//   password: z.string().min(8, { 
//     message: "Password must be at least 8 characters" 
//   }),
//   confirmPassword: z.string().min(8, { 
//     message: "Password must be at least 8 characters" 
//   }),
//   dateOfBirth: z.string().date({
//     message: "pleae enter a valid date"
//   }),
//   age: z.number().int().range([0, 120], {
//     message: "Age must be between 0 and 120"
//   }),
//   gender: z.string().array().oneOf(['male', 'female', 'other'], {
//     default: 'male' 
//   }),
//   height: z.number().int().min(0),
//   weight: z.number().int().min(0),
//   habits: z.array(z.string()).minimum(1, {
//     message: "Please select at least one habit"
//   }),
//   medicalHistory: z.string().allowNull().min(0, { 
//     message: "Please provide your medical history" 
//   }),
//   allergies: z.string().allowNull().min(0, { 
//     message: "Please list any allergies" })
//   }).refine((data) => data.password ===
//   data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  fetch("http://localhost:8080/api/isLoggedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: "heyo",
      }),
      credentials: "include", // Ensure cookies are sent and received
    }).then((response) => {
      if (response.ok){
        navigate('/')
      }
    });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: 0,
      gender: "male",
      weight: 0,
      height: 0,
      medicalHistory: "",
      allergies: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Send POST request to Flask API for login using fetch
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: values.name,
          email: values.email,
          password: values.password,
          age: values.age,
          gender: values.gender,
          height: values.height,
          weight: values.weight,
          allergies: values.allergies,
          medical_history: values.medicalHistory,
        }),
        credentials: "include", // Ensure cookies are sent and received
      });

      if (response.ok) {
        // Assuming the Flask API sends a success message or a cookie upon success
        toast({
          title: "Account created",
          description: "Welcome back to Swarup!",
        });
        
        // Navigate to the next page (e.g., chatbot page)
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Login failed",
          description: errorData?.message || "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <img 
          src="/lovable-uploads/50e23182-7dd1-4051-95cf-d2b13a63ccad.png" 
          alt="Swarup Logo" 
          className="h-10 w-auto" 
        />
        <span className="font-display text-2xl font-medium text-medical-900">Swarup</span>
      </Link>
      
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join Swarup and get personalized health insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder=""
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Convert the value to a number before setting it
                            field.onChange(value === '' ? '' : Number(value)); 
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Select
                          placeholder=""
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">&emsp;&ensp;Male</SelectItem>
                            <SelectItem value="female">&emsp;&ensp; Female</SelectItem>
                            <SelectItem value="other">&emsp;&ensp;  Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder=""
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Convert the value to a number before setting it
                            field.onChange(value === '' ? '' : Number(value)); 
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder=""
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Convert the value to a number before setting it
                            field.onChange(value === '' ? '' : Number(value)); 
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Cancer"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="peanuts"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-medical-600 hover:bg-medical-700" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-medical-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        By signing up, you agree to our{" "}
        <Link to="/privacy-policy" className="text-medical-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Signup;
