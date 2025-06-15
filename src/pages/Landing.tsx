import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserProfile } from '@/hooks/useUserProfile';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { AvatarButton } from '@/components/AvatarButton';

// Placeholder cover images
const tileImages = [
  "photo-1649972904349-6e44c42644a7",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1581091226825-a6a2a5aee158",
  "photo-1531297484001-80022131f5a1",
  "photo-1487058792275-0ad4aaf24ca7",
  "photo-1605810230434-7631ac76ec81",
];

const getTileImage = (idx: number) => `/placeholder/${tileImages[idx % tileImages.length]}.jpg`;

const ResumeTile: React.FC<{
  resume: any;
  idx: number;
  onClick: () => void;
}> = ({ resume, idx, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-xl overflow-hidden shadow-lg relative group border border-gray-100 bg-white hover:shadow-xl focus:outline-none flex flex-col"
    tabIndex={0}
  >
    <img
      src={getTileImage(idx)}
      alt="Resume Preview"
      className="w-full h-40 object-cover"
      style={{ background: "#f1f7ed" }}
      loading="lazy"
    />
    <div className="p-4 flex-1 flex flex-col">
      <div className="font-bold text-lg mb-2 text-[#243e36] truncate">
        {resume.title || "Untitled Resume"}
      </div>
      <div className="text-sm text-gray-500 truncate">
        Last updated:{" "}
        {resume.lastModified
          ? new Date(resume.lastModified).toLocaleDateString()
          : "--"}
      </div>
    </div>
    <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition">
      <Eye className="w-4 h-4 text-[#243e36]" />
    </div>
  </button>
);

const AuthenticatedLanding: React.FC<{
  profile: { name?: string; email?: string };
  resumes: Record<string, any>;
  loading: boolean;
}> = ({ profile, resumes, loading }) => {
  const navigate = useNavigate();
  const resumesArr = Object.values(resumes || {}).sort(
    (a, b) => (b.lastModified ?? 0) - (a.lastModified ?? 0)
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#f1f7ed] to-[#7ca982]"
      style={{ minHeight: "100vh" }}
    >
      <header className="flex justify-between items-center px-6 py-4 bg-white/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8" style={{ color: '#243e36' }} />
          <span className="text-2xl font-bold" style={{ color: '#243e36' }}>
            PaperForge
          </span>
        </div>
        <AvatarButton name={profile?.name} />
      </header>

      <main className="flex-1 w-full flex flex-col px-4 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "#243e36" }}>
              Welcome, {profile?.name?.split(" ")[0] || "User"}!
            </h2>
            <p className="text-lg text-gray-700">
              Quickly access and build your resumes below.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button
              className="bg-[#7ca982] text-white px-8 py-3 text-lg hover:opacity-90"
              onClick={() => navigate("/builder")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              New Resume
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 text-xl text-gray-600">
            Loading your resumes...
          </div>
        ) : Object.keys(resumes).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-700">
            <div className="text-lg mb-2">You haven’t created any resumes yet.</div>
            <Button
              className="bg-[#243e36] text-white px-6 py-2"
              onClick={() => navigate("/builder")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create your first resume
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {resumesArr.map((resume, idx) => (
              <ResumeTile
                key={resume.id}
                resume={resume}
                idx={idx}
                onClick={() => navigate(`/builder?resumeId=${resume.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUserProfile();
  const { resumes, loading: resumesLoading } = useResumeStorage();

  // Show actual landing page if NOT logged in (once it's determined)
  if (!user && !userLoading) {
    // ------------------- NON-AUTH LANDING (original) ----------------------
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f1f7ed 0%, #7ca982 100%)' }}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8" style={{ color: '#243e36' }} />
                <h1 className="text-2xl font-bold" style={{ color: '#243e36' }}>PaperForge</h1>
              </div>
              <Button
                className="text-white hover:opacity-90"
                style={{ backgroundColor: '#243e36' }}
                onClick={() => {
                  if (auth.currentUser) {
                    navigate('/builder');
                  } else {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                      unsubscribe();
                      if (user) {
                        navigate('/builder');
                      } else {
                        navigate('/login');
                      }
                    });
                  }
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6" style={{ color: '#243e36' }}>
              Create Your Perfect Resume with
              <span style={{ color: '#7ca982' }}> AI Power</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#243e36', opacity: 0.8 }}>
              Build professional resumes in minutes with our AI-powered editor. 
              Choose from beautiful templates, get smart suggestions, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white text-lg px-8 py-3"
                style={{ backgroundColor: '#243e36' }}
                onClick={() => {
                  if (auth.currentUser) {
                    navigate('/builder');
                  } else {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                      unsubscribe();
                      if (user) {
                        navigate('/builder');
                      } else {
                        navigate('/login');
                      }
                    });
                  }
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <a href="/templates" tabIndex={-1} style={{ display: 'contents' }}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover:bg-opacity-50" style={{ borderColor: '#243e36', color: '#243e36', backgroundColor: 'transparent' }}>
                  <Eye className="w-5 h-5 mr-2" />
                  See Examples
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#243e36' }}>
              Why Choose PaperForge?
            </h2>
            <p className="text-lg" style={{ color: '#243e36', opacity: 0.8 }}>
              Everything you need to create a standout resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f1f7ed' }}>
                <Sparkles className="w-8 h-8" style={{ color: '#243e36' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#243e36' }}>AI-Powered Suggestions</h3>
              <p style={{ color: '#243e36', opacity: 0.7 }}>
                Get intelligent recommendations for content, formatting, and optimization to make your resume stand out.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#7ca982', opacity: 0.3 }}>
                <FileText className="w-8 h-8" style={{ color: '#243e36' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#243e36' }}>Professional Templates</h3>
              <p style={{ color: '#243e36', opacity: 0.7 }}>
                Choose from carefully designed templates that are loved by recruiters and hiring managers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#f1f7ed' }}>
                <Download className="w-8 h-8" style={{ color: '#243e36' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#243e36' }}>Export & Share</h3>
              <p style={{ color: '#243e36', opacity: 0.7 }}>
                Download your resume as PDF or share it directly with potential employers with just one click.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16" style={{ backgroundColor: '#243e36' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 mr-2" />
                  <span className="text-4xl font-bold">50K+</span>
                </div>
                <p style={{ color: '#f1f7ed' }}>Resumes Created</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-8 h-8 mr-2" />
                  <span className="text-4xl font-bold">4.9</span>
                </div>
                <p style={{ color: '#f1f7ed' }}>Average Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-8 h-8 mr-2" />
                  <span className="text-4xl font-bold">95%</span>
                </div>
                <p style={{ color: '#f1f7ed' }}>Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#243e36' }}>
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#243e36', opacity: 0.8 }}>
            Join thousands of job seekers who have successfully landed their dream jobs
          </p>
          <Button
            size="lg"
            className="text-white text-lg px-12 py-4"
            style={{ backgroundColor: '#243e36' }}
            onClick={() => {
              if (auth.currentUser) {
                navigate('/builder');
              } else {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                  unsubscribe();
                  if (user) {
                    navigate('/builder');
                  } else {
                    navigate('/login');
                  }
                });
              }
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started for Free
          </Button>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#243e36' }} className="text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="w-6 h-6" style={{ color: '#7ca982' }} />
              <span className="text-xl font-bold">PaperForge</span>
            </div>
            <p style={{ color: '#f1f7ed' }}>
              © 2024 PaperForge. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
    // ------------------- END NON-AUTH LANDING ---------------------
  }

  // While loading
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f7ed] to-[#7ca982]">
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    );
  }

  // --------- LOGGED IN LANDING ----------
  return (
    <AuthenticatedLanding profile={profile || {}} resumes={resumes} loading={resumesLoading} />
  );
};

export default Landing;
