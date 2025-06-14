
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mock handle signup
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally: call backend API to create user.
    // For demo: just redirect.
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="flex items-center mb-6 gap-2">
          <UserPlus className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold">Sign Up for ResumeAI</h2>
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
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
