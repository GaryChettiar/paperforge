
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ResumeAI</h1>
            </div>
            <Link to="/builder">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume with
            <span className="text-blue-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build professional resumes in minutes with our AI-powered editor. 
            Choose from beautiful templates, get smart suggestions, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Eye className="w-5 h-5 mr-2" />
              See Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose ResumeAI?
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to create a standout resume
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h3>
            <p className="text-gray-600">
              Get intelligent recommendations for content, formatting, and optimization to make your resume stand out.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Professional Templates</h3>
            <p className="text-gray-600">
              Choose from carefully designed templates that are loved by recruiters and hiring managers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Export & Share</h3>
            <p className="text-gray-600">
              Download your resume as PDF or share it directly with potential employers with just one click.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">50K+</span>
              </div>
              <p className="text-blue-100">Resumes Created</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">4.9</span>
              </div>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">95%</span>
              </div>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Create Your Perfect Resume?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of job seekers who have successfully landed their dream jobs
        </p>
        <Link to="/builder">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started for Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <p className="text-gray-400">
            © 2024 ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
