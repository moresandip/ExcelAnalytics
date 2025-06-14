import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, FileSpreadsheet, AreaChart, PieChart, Download, Zap, TrendingUp, Database, Users, Shield, ArrowRight, Sparkles } from 'lucide-react';
import FadeInUp from '../components/animations/FadeInUp';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import GlowingButton from '../components/animations/GlowingButton';
import TypewriterText from '../components/animations/TypewriterText';
import FloatingElements from '../components/animations/FloatingElements';
import PulsingOrb from '../components/animations/PulsingOrb';
import WaveBackground from '../components/animations/WaveBackground';

const Home: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <FloatingElements />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <FadeInUp delay={200}>
              <div className="flex justify-center mb-8">
                <PulsingOrb size="lg" color="blue" intensity="medium" />
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                <span className="block">Transform Your Excel Data</span>
                <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Into{' '}
                  <TypewriterText 
                    texts={['Powerful Insights', 'Beautiful Charts', 'AI Analytics', 'Interactive Dashboards']}
                    className="text-gradient"
                  />
                </span>
              </h1>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                Upload Excel files, create stunning 3D visualizations, get AI-powered insights, and export in multiple formats.
                Everything you need for professional data analysis with beautiful animations.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={800}>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <GlowingButton 
                  variant="primary" 
                  size="lg"
                  icon={Sparkles}
                  onClick={() => window.location.href = '/register'}
                >
                  Start Free Trial
                </GlowingButton>
                <GlowingButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.location.href = '/login'}
                >
                  Sign In
                </GlowingButton>
              </div>
            </FadeInUp>
          </div>
        </div>
        
        <FadeInUp delay={1000}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 mb-20 relative">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover-lift">
                <img
                  src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Dashboard preview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2 animate-bounce-gentle">Professional Analytics Dashboard</h3>
                  <p className="text-lg opacity-90">Interactive charts, AI insights, and comprehensive data management</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
        
        <WaveBackground />
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Trusted by Data Professionals</h2>
              <p className="text-xl text-gray-300">Join thousands who've transformed their data analysis</p>
            </div>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FadeInUp delay={200}>
              <div className="text-center glass rounded-2xl p-8 hover-glow">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={50000} suffix="+" />
                </div>
                <p className="text-gray-300">Files Processed</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="text-center glass rounded-2xl p-8 hover-glow">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter end={125000} suffix="+" />
                </div>
                <p className="text-gray-300">Charts Created</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <div className="text-center glass rounded-2xl p-8 hover-glow">
                <div className="text-4xl font-bold text-pink-400 mb-2">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <p className="text-gray-300">Happy Users</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={800}>
              <div className="text-center glass rounded-2xl p-8 hover-glow">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <p className="text-gray-300">Satisfaction Rate</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Complete Excel Analytics Solution
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                From data import to AI-powered insights, we provide everything you need for professional data analysis
              </p>
            </div>
          </FadeInUp>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-16">
            {/* Excel Import */}
            <FadeInUp delay={200}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mx-auto mb-6 group-hover:animate-bounce-gentle">
                  <FileSpreadsheet className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Excel Import</h3>
                  <p className="text-gray-600 mb-4">
                    Seamlessly upload .xls and .xlsx files with automatic data parsing and column detection
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Drag & drop interface
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Automatic data validation
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Real-time preview
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Large file support
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Interactive Charts */}
            <FadeInUp delay={400}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white mx-auto mb-6 group-hover:animate-scale-pulse">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Interactive Charts</h3>
                  <p className="text-gray-600 mb-4">
                    Create stunning visualizations with our advanced charting engine
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      15+ chart types (2D & 3D)
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Real-time customization
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Responsive design
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Interactive legends
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Export & Share */}
            <FadeInUp delay={600}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white mx-auto mb-6 group-hover:animate-rotate-slow">
                  <Download className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">💾 Export & Share</h3>
                  <p className="text-gray-600 mb-4">
                    Export your visualizations in multiple professional formats
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                      PNG, JPEG, PDF exports
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                      CSV data downloads
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                      High-resolution output
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                      Batch export options
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Data History */}
            <FadeInUp delay={800}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white mx-auto mb-6 group-hover:animate-pulse-medium">
                  <Database className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🗂️ Data History</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive tracking and management of all your data and charts
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Upload history tracking
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Saved chart library
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Version control
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Quick access dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Multiple Chart Types */}
            <FadeInUp delay={1000}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white mx-auto mb-6 group-hover:animate-bounce-gentle">
                  <PieChart className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 3D Visualizations</h3>
                  <p className="text-gray-600 mb-4">
                    Advanced 3D charts, geographic mapping, and surface visualizations
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      3D Column & Surface charts
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Geographic Power Maps
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Interactive 3D controls
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Time-based animations
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* AI Insights */}
            <FadeInUp delay={1200}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500">
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white mx-auto mb-6 group-hover:animate-glow">
                  <Zap className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Insights</h3>
                  <p className="text-gray-600 mb-4">
                    Advanced AI-powered analysis and intelligent recommendations
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                      Smart chart suggestions
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                      Trend analysis
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                      Data insights
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                      Automated recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Demo Credentials */}
          <FadeInUp delay={1400}>
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200 glass">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-2 text-blue-600 animate-pulse" />
                  🚀 Try It Now - Demo Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-md hover-lift">
                    <h4 className="font-bold text-gray-900 mb-2">👤 Regular User</h4>
                    <p className="text-sm text-gray-600 mb-1">Email: user@example.com</p>
                    <p className="text-sm text-gray-600">Password: password123</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md hover-lift">
                    <h4 className="font-bold text-gray-900 mb-2">🛡️ Admin User</h4>
                    <p className="text-sm text-gray-600 mb-1">Email: admin@example.com</p>
                    <p className="text-sm text-gray-600">Password: admin123</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Feature Details */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full animate-float-medium"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                Everything You Need for Data Analysis
              </h2>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Features */}
            <div className="space-y-8">
              <FadeInUp delay={200}>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:animate-bounce-gentle">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600">
                      Get deep insights from your data with statistical analysis, trend detection, and pattern recognition.
                    </p>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={400}>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:animate-pulse-medium">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
                    <p className="text-gray-600">
                      Share insights with your team, manage user permissions, and collaborate on data projects.
                    </p>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={600}>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:animate-scale-pulse">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">
                      Your data is protected with enterprise-grade security, encryption, and access controls.
                    </p>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right side - Image */}
            <FadeInUp delay={800}>
              <div className="relative">
                <div className="relative rounded-2xl shadow-2xl overflow-hidden hover-lift">
                  <img
                    src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Data visualization"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-20"></div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-float-medium"></div>
          <div className="absolute top-3/4 left-3/4 w-16 h-16 bg-white/10 rounded-full animate-float-fast"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-20">
          <FadeInUp>
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
                Ready to Transform Your Data?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who trust our platform for their data analysis needs.
                Start your free trial today with beautiful animations and AI insights.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <GlowingButton
                  variant="secondary"
                  size="lg"
                  icon={Sparkles}
                  onClick={() => window.location.href = '/register'}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Start Free Trial
                </GlowingButton>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 group"
                >
                  Sign In Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </div>
  );
};

export default Home;