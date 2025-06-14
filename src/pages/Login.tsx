
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mock handle login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally: validate, request backend etc.
    // We'll just move to /profile for demo.
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="flex items-center mb-6 gap-2">
          <LogIn className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Login to ResumeAI</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <Input
              required
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <Input
              required
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Login
          </Button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
