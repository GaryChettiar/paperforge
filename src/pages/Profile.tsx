import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Settings, LogOut, Edit3, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useResumeStorage } from "@/hooks/useResumeStorage";
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

// Helper to format ISO string to "Month Year"
function formatMemberSince(isoDateStr?: string) {
  if (!isoDateStr) return "";
  const d = new Date(isoDateStr);
  return d.toLocaleString("default", { month: "long", year: "numeric" });
}

const userMock = {
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "January 2024",
  resumesCreated: 5,
  lastLogin: "2 hours ago"
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useUserProfile();
  const { resumes, loading: resumesLoading } = useResumeStorage();

  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    );
  }
  if (!profile) return null; // (briefly, until redirected)

  // Convert resumes object to array sorted by lastModified desc
  const resumesArr = Object.values(resumes || {}).sort((a, b) => (b.lastModified ?? 0) - (a.lastModified ?? 0));

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f1f7ed 0%, #7ca982 100%)' }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob" style={{ backgroundColor: '#7ca982' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" style={{ backgroundColor: '#243e36' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-blob animation-delay-4000" style={{ backgroundColor: '#7ca982' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#243e36' }}>
            Welcome back, {profile.name?.split(' ')[0] || "User"}!
          </h1>
          <p className="text-gray-700 text-lg">Manage your account and resume building journey</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#243e36' }}>
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Crown className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold" style={{ color: '#243e36' }}>{profile.name}</CardTitle>
              <CardDescription className="text-gray-600 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {profile.email}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium" style={{ color: '#243e36' }}>Member since</span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatMemberSince(profile.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium" style={{ color: '#243e36' }}>Last active</span>
                <span className="text-sm text-gray-600">N/A</span>
              </div>
              
              <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: '#243e36' }}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card and Quick Actions */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2" style={{ color: '#243e36' }}>
                <Settings className="w-5 h-5" />
                Your Activity
              </CardTitle>
              <CardDescription>Track your resume building progress</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#f1f7ed' }}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#243e36' }}>{userMock.resumesCreated}</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#7ca982', opacity: 0.2 }}>
                  <div className="text-2xl font-bold" style={{ color: '#243e36' }}>3</div>
                  <div className="text-xs text-gray-600">Templates Used</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#7ca982', opacity: 0.3 }}>
                  <div className="text-2xl font-bold" style={{ color: '#243e36' }}>12</div>
                  <div className="text-xs text-gray-600">Exports Made</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-0 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold" style={{ color: '#243e36' }}>Quick Actions</CardTitle>
              <CardDescription>Jump into your most common tasks</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/builder">
                  <Button className="w-full h-16 text-white flex flex-col gap-1 hover:opacity-90" style={{ backgroundColor: '#7ca982' }}>
                    <Edit3 className="w-5 h-5" />
                    <span className="text-sm">Create Resume</span>
                  </Button>
                </Link>
                
                <Link to="/templates">
                  <Button className="w-full h-16 text-white flex flex-col gap-1 hover:opacity-90" style={{ backgroundColor: '#243e36' }}>
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

        {/* My Resumes List Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#243e36" }}>My Resumes</h2>
          {resumesLoading ? (
            <div className="text-center py-8 text-gray-600">Loading your resumes...</div>
          ) : resumesArr.length === 0 ? (
            <div className="text-center py-8 text-gray-600">No resumes found.</div>
          ) : (
            <div className="bg-white/95 rounded-lg shadow border border-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumesArr.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell className="font-medium">{resume.title || "Untitled Resume"}</TableCell>
                      <TableCell>
                        {resume.lastModified
                          ? formatDistanceToNow(new Date(resume.lastModified), { addSuffix: true })
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[#243e36] border-[#243e36]"
                          onClick={() => navigate(`/builder?resumeId=${resume.id}`)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-medium transition-colors hover:underline"
            style={{ color: '#243e36' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
