import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, FileSpreadsheet, AreaChart, PieChart, Download, Zap, TrendingUp, Database, Users, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">Transform Your Excel Data</span>
              <span className="block text-blue-600">Into Powerful AI-Driven Insights</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Upload Excel files, create stunning visualizations, get AI-powered insights, and export in multiple formats.
              Everything you need for professional data analysis.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 border border-gray-300 shadow-lg text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 mb-20 relative">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              <img
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard preview"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Professional Analytics Dashboard</h3>
                <p className="text-lg opacity-90">Interactive charts, AI insights, and comprehensive data management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Complete Excel Analytics Solution
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              From data import to AI-powered insights, we provide everything you need for professional data analysis
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3 mb-16">
            {/* Excel Import */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mx-auto mb-6">
                <FileSpreadsheet className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Excel Import</h3>
                <p className="text-gray-600 mb-4">
                  Seamlessly upload .xls and .xlsx files with automatic data parsing and column detection
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ Drag & drop interface</li>
                  <li>✓ Automatic data validation</li>
                  <li>✓ Real-time preview</li>
                  <li>✓ Large file support</li>
                </ul>
              </div>
            </div>

            {/* Interactive Charts */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white mx-auto mb-6">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Interactive Charts</h3>
                <p className="text-gray-600 mb-4">
                  Create stunning visualizations with our advanced charting engine
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ 8+ chart types (Bar, Line, Pie, Scatter, 3D)</li>
                  <li>✓ Real-time customization</li>
                  <li>✓ Responsive design</li>
                  <li>✓ Interactive legends</li>
                </ul>
              </div>
            </div>

            {/* Export & Share */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white mx-auto mb-6">
                <Download className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💾 Export & Share</h3>
                <p className="text-gray-600 mb-4">
                  Export your visualizations in multiple professional formats
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ PNG, JPEG, PDF exports</li>
                  <li>✓ CSV data downloads</li>
                  <li>✓ High-resolution output</li>
                  <li>✓ Batch export options</li>
                </ul>
              </div>
            </div>

            {/* Data History */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white mx-auto mb-6">
                <Database className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🗂️ Data History</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive tracking and management of all your data and charts
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ Upload history tracking</li>
                  <li>✓ Saved chart library</li>
                  <li>✓ Version control</li>
                  <li>✓ Quick access dashboard</li>
                </ul>
              </div>
            </div>

            {/* Multiple Chart Types */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white mx-auto mb-6">
                <PieChart className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Multiple Chart Types</h3>
                <p className="text-gray-600 mb-4">
                  Extensive library of visualization options for every data type
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ Bar & Column charts</li>
                  <li>✓ Line & Area charts</li>
                  <li>✓ Pie & Scatter plots</li>
                  <li>✓ 3D visualizations</li>
                </ul>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Insights</h3>
                <p className="text-gray-600 mb-4">
                  Advanced AI-powered analysis and intelligent recommendations
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>✓ Smart chart suggestions</li>
                  <li>✓ Trend analysis</li>
                  <li>✓ Data insights</li>
                  <li>✓ Automated recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Try It Now - Demo Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-2">👤 Regular User</h4>
                  <p className="text-sm text-gray-600 mb-1">Email: user@example.com</p>
                  <p className="text-sm text-gray-600">Password: password123</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-2">🛡️ Admin User</h4>
                  <p className="text-sm text-gray-600 mb-1">Email: admin@example.com</p>
                  <p className="text-sm text-gray-600">Password: admin123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Details */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
              Everything You Need for Data Analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Features */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600">
                    Get deep insights from your data with statistical analysis, trend detection, and pattern recognition.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
                  <p className="text-gray-600">
                    Share insights with your team, manage user permissions, and collaborate on data projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-gray-600">
                    Your data is protected with enterprise-grade security, encryption, and access controls.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Data visualization"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust our platform for their data analysis needs.
              Start your free trial today.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;