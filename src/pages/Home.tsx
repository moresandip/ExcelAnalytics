import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, FileSpreadsheet, AreaChart, PieChart, Download, Zap } from 'lucide-react';

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
              <span className="block text-blue-600">Into Powerful Insights</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Upload any Excel file and instantly generate beautiful, interactive charts and analytics.
              No coding required.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 mb-20 relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard preview"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                <p className="text-lg font-medium">Interactive dashboard with powerful visualization tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Powerful Features, Simple Interface
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to analyze your Excel data in one place.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Excel Import</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Upload any Excel file (.xls or .xlsx) and get instant access to your data.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Interactive Charts</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Generate 2D and 3D charts with just a few clicks. Customize axes and chart types.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-600 text-white mx-auto">
                  <Download className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Export & Share</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Download your charts as PNG or PDF files to include in presentations and reports.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-amber-500 text-white mx-auto">
                  <AreaChart className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Data History</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access your upload history and previous analyses from your personal dashboard.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  <PieChart className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">Multiple Chart Types</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Bar, line, pie, scatter plots, 3D columns, and more visualization options.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-red-500 text-white mx-auto">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get smart summaries and trend analysis powered by advanced AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Create an account today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              Join thousands of users who are already turning their Excel data into beautiful visualizations.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;