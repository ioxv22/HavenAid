import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const resourceData = [
  { name: 'Jan', food: 4000, water: 2400, medical: 2400 },
  { name: 'Feb', food: 3000, water: 1398, medical: 2210 },
  { name: 'Mar', food: 2000, water: 9800, medical: 2290 },
  { name: 'Apr', food: 2780, water: 3908, medical: 2000 },
  { name: 'May', food: 1890, water: 4800, medical: 2181 },
  { name: 'Jun', food: 2390, water: 3800, medical: 2500 },
];

const populationData = [
  { name: 'Adults', value: 400 },
  { name: 'Children', value: 300 },
  { name: 'Elderly', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Dashboard() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Camp Management Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Population</h3>
            <p className="text-3xl font-bold text-blue-600">800</p>
            <p className="text-sm text-gray-500">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Available Resources</h3>
            <p className="text-3xl font-bold text-green-600">92%</p>
            <p className="text-sm text-gray-500">Current capacity</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Aid Requests</h3>
            <p className="text-3xl font-bold text-yellow-600">24</p>
            <p className="text-sm text-gray-500">Pending requests</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Usage Trends */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Resource Usage Trends</h3>
            <LineChart width={500} height={300} data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="food" stroke="#8884d8" />
              <Line type="monotone" dataKey="water" stroke="#82ca9d" />
              <Line type="monotone" dataKey="medical" stroke="#ffc658" />
            </LineChart>
          </div>

          {/* Population Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Population Distribution</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={populationData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {populationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Sample Profile */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sample Aid Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Personal Information</h4>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Name:</span> John Doe</p>
                <p><span className="font-medium">ID:</span> #12345</p>
                <p><span className="font-medium">Family Size:</span> 4</p>
                <p><span className="font-medium">Arrival Date:</span> 2024-01-15</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Aid Recommendations</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Priority access to medical supplies</li>
                <li>• Weekly food package for family of 4</li>
                <li>• Educational support for children</li>
                <li>• Temporary housing assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;