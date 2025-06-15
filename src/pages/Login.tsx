import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase"; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f1f7ed 0%, #7ca982 100%)" }}
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
          style={{ backgroundColor: "#7ca982" }}
        ></div>
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          style={{ backgroundColor: "#243e36" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"
          style={{ backgroundColor: "#7ca982" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-0">
          <CardHeader className="space-y-1 pb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full" style={{ backgroundColor: "#243e36" }}>
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center" style={{ color: "#243e36" }}>
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Sign in to your ResumeAI account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#243e36" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-2 transition-colors focus:border-opacity-70"
                    style={{ borderColor: "#7ca982" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#243e36" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 transition-colors focus:border-opacity-70"
                    style={{ borderColor: "#7ca982" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] hover:opacity-90"
                style={{ backgroundColor: "#243e36" }}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold transition-colors hover:underline"
                  style={{ color: "#7ca982" }}
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
