import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { adminLogin, userLogin, userSignup } from "@/services/apiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "officer",
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateLoginForm = () => {
    const errors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!loginData.password) {
      errors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupData.name) {
      errors.name = "Name is required";
    }

    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!signupData.mobile) {
      errors.mobile = "Mobile number is required";
    }

    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    try {
      // Use the AuthContext login function for persistent login
      await login(loginData.email, loginData.password);

      // Additional API call for role-specific login
      let response;
      if (loginData.role === "admin") {
        response = await adminLogin(
          loginData.email,
          loginData.password,
          loginData.role
        );
      } else {
        response = await userLogin(
          loginData.email,
          loginData.password,
          loginData.role
        );
      }

      // Navigate based on role
      if (response.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (error) {
      alert(error.message || "Login failed"); // Show error message
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignupForm()) return;

    setIsSubmitting(true);
    try {
      const response = await userSignup(signupData);
      alert(response.message); // Show success message

      // After successful signup, log the user in
      await login(signupData.email, signupData.password);
      navigate("/user/dashboard");
    } catch (error) {
      alert(error.message || "Signup failed"); // Show error message
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* Login Tab */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLoginSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className={loginErrors.email ? "border-red-500" : ""}
                />
                {loginErrors.email && (
                  <p className="text-xs text-red-500">{loginErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && (
                  <p className="text-xs text-red-500">{loginErrors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-role">Select your role</Label>
                <RadioGroup
                  defaultValue="user"
                  value={loginData.role}
                  onValueChange={(value) =>
                    setLoginData({ ...loginData, role: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      {/* Sign Up Tab */}
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignupSubmit}>
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  placeholder="Enter your name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className={signupErrors.name ? "border-red-500" : ""}
                />
                {signupErrors.name && (
                  <p className="text-xs text-red-500">{signupErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className={signupErrors.email ? "border-red-500" : ""}
                />
                {signupErrors.email && (
                  <p className="text-xs text-red-500">{signupErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-mobile">Mobile</Label>
                <Input
                  id="signup-mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={signupData.mobile}
                  onChange={(e) =>
                    setSignupData({ ...signupData, mobile: e.target.value })
                  }
                  className={signupErrors.mobile ? "border-red-500" : ""}
                />
                {signupErrors.mobile && (
                  <p className="text-xs text-red-500">{signupErrors.mobile}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className={signupErrors.password ? "border-red-500" : ""}
                />
                {signupErrors.password && (
                  <p className="text-xs text-red-500">
                    {signupErrors.password}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-role">Role</Label>
                <Select
                  value={signupData.role}
                  onValueChange={(value) =>
                    setSignupData({ ...signupData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="officer">Officer</SelectItem>
                    <SelectItem value="investigator">Investigator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardFooter className="p-0 pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
