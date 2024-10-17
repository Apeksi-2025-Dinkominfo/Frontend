// utils/api.ts

// Define the expected shape of the login response
interface LoginResponse {
    token: string;
  }
  
  // Define the login function with types for parameters and return value
  export const loginUser = async (name: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      return data as LoginResponse; // Cast the response to the LoginResponse type
    } catch (error) {
      throw error; // propagate error to be handled in the component
    }
  };
  