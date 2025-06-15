
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Eye, Users, Star, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AvatarButton } from "@/components/AvatarButton";
import { ResumeTile } from "@/components/ResumeTile";

interface AuthenticatedLandingProps {
  profile: { name?: string; email?: string };
  resumes: Record<string, any>;
  loading: boolean;
}

const AuthenticatedLanding: React.FC<AuthenticatedLandingProps> = ({
  profile,
  resumes,
  loading,
}) => {
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
          <FileText className="w-8 h-8" style={{ color: "#243e36" }} />
          <span className="text-2xl font-bold" style={{ color: "#243e36" }}>
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

export default AuthenticatedLanding;
