
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const userMock = {
  name: "John Doe",
  email: "john.doe@email.com"
};

const Profile = () => {
  const navigate = useNavigate();

  // Mock logout: simply go back to login
  const handleLogout = () => navigate("/login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-6 gap-2">
          <User className="w-10 h-10 text-primary" />
          <h2 className="text-xl font-semibold">{userMock.name}</h2>
          <div className="text-gray-600">{userMock.email}</div>
        </div>
        <Button className="w-full" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <div className="mt-6 text-center">
          <Link className="text-blue-600 hover:underline text-sm" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
