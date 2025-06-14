
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Settings, LogOut, Edit3, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const userMock = {
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "January 2024",
  resumesCreated: 5,
  lastLogin: "2 hours ago"
};

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome back, {userMock.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 text-lg">Manage your account and resume building journey</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Crown className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">{userMock.name}</CardTitle>
              <CardDescription className="text-gray-600 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {userMock.email}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Member since</span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {userMock.joinDate}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Last active</span>
                <span className="text-sm text-gray-600">{userMock.lastLogin}</span>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Your Activity
              </CardTitle>
              <CardDescription>Track your resume building progress</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{userMock.resumesCreated}</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-xs text-gray-600">Templates Used</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-xs text-gray-600">Exports Made</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
              <CardDescription>Jump into your most common tasks</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/builder">
                  <Button className="w-full h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex flex-col gap-1">
                    <Edit3 className="w-5 h-5" />
                    <span className="text-sm">Create Resume</span>
                  </Button>
                </Link>
                
                <Link to="/templates">
                  <Button className="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white flex flex-col gap-1">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Browse Templates</span>
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="w-full h-16 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 flex flex-col gap-1"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Sign Out</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 font-medium transition-colors hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
