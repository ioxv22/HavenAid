import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BarChart3, Users } from 'lucide-react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            HavenAid – AI for Humanitarian Action
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Empowering Aid, One Solution at a Time
          </p>
          <div className="space-x-4">
            <Link
              to="/features"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            HavenAid leverages artificial intelligence to revolutionize refugee camp management,
            ensuring efficient resource allocation and personalized aid delivery to those who need
            it most. Our platform combines cutting-edge technology with humanitarian expertise to
            create lasting positive impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-gray-600">
                Advanced AI algorithms forecast camp needs and resource requirements with
                unprecedented accuracy.
              </p>
            </div>
            <div className="text-center p-6">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resource Optimization</h3>
              <p className="text-gray-600">
                Smart allocation systems ensure resources are distributed efficiently and
                effectively.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Aid</h3>
              <p className="text-gray-600">
                Tailored assistance plans based on individual needs and circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                alt="Sarah Johnson"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 mb-4">
                "HavenAid's predictive analytics have transformed how we manage resources in our
                camp. We can now anticipate needs before they become critical."
              </p>
              <p className="font-semibold">Sarah Johnson</p>
              <p className="text-sm text-gray-500">Camp Manager</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                alt="David Chen"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 mb-4">
                "The personalized aid recommendations have helped us provide more effective
                support to individuals and families in need."
              </p>
              <p className="font-semibold">David Chen</p>
              <p className="text-sm text-gray-500">Aid Worker</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                alt="Maria Garcia"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 mb-4">
                "HavenAid's platform has streamlined our operations and helped us serve more
                people with the same resources."
              </p>
              <p className="font-semibold">Maria Garcia</p>
              <p className="text-sm text-gray-500">NGO Director</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;