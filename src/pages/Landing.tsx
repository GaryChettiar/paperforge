
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f1f7ed 0%, #7ca982 100%)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8" style={{ color: '#243e36' }} />
              <h1 className="text-2xl font-bold" style={{ color: '#243e36' }}>ResumeAI</h1>
            </div>
            <Link to="/builder">
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#243e36' }}>
                Get Started
              </Button>
            </Link>
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
            <Link to="/builder">
              <Button size="lg" className="text-white text-lg px-8 py-3" style={{ backgroundColor: '#243e36' }}>
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover:bg-opacity-50" style={{ borderColor: '#243e36', color: '#243e36', backgroundColor: 'transparent' }}>
              <Eye className="w-5 h-5 mr-2" />
              See Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#243e36' }}>
            Why Choose ResumeAI?
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
        <Link to="/builder">
          <Button size="lg" className="text-white text-lg px-12 py-4" style={{ backgroundColor: '#243e36' }}>
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started for Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#243e36' }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-6 h-6" style={{ color: '#7ca982' }} />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <p style={{ color: '#f1f7ed' }}>
            © 2024 ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
