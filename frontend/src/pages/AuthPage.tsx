import * as React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle Sign In
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/validateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign in successful!");
        // store user info locally
        localStorage.setItem("user", JSON.stringify(data.user || { email: formData.email }));
        // redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  // handle Sign Up
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");
        setIsSignIn(true);
        setFormData({ username: "", email: "", password: "" });
      } else {
        alert(data.message || "Sign up failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-200 to-pink-100">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {isSignIn ? "Sign In" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSignIn ? (
            // Sign In Form
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Don’t have an account?{" "}
                <span
                  onClick={() => setIsSignIn(false)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </form>
          ) : (
            // Sign Up Form
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignIn(true)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign In
                </span>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
