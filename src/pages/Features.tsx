import React from 'react';
import { Brain, BarChart3, Users, Cloud, Database, Shield } from 'lucide-react';

function Features() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-16">How HavenAid Works</h1>

        {/* Predictive Analytics Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-semibold">Predictive Analytics</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Our AI-powered predictive analytics system processes vast amounts of data to forecast camp needs with unprecedented accuracy. By analyzing historical data, weather patterns, and population dynamics, we help camp managers stay ahead of potential challenges.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  <span>Real-time weather impact analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>Population movement tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Health crisis prevention</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-50 p-8 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Analytics Dashboard"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Resource Optimization Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-semibold">Resource Optimization</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Our resource optimization system ensures efficient allocation of supplies and personnel. Through machine learning algorithms, we minimize waste while maximizing the impact of available resources.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-green-600" />
                  <span>Smart inventory management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-600" />
                  <span>Automated supply chain optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Resource allocation prioritization</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-50 p-8 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Resource Management"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Personalized Aid Section */}
        <div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <Users className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-semibold">Personalized Aid</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Our AI creates tailored assistance plans for individuals and families based on their specific needs, circumstances, and preferences. This personalized approach ensures that aid is both effective and dignified.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  <span>Individual needs assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>Customized aid packages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Progress tracking and adjustment</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-50 p-8 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Personalized Aid"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;