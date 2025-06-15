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
import ExcelDataFlow from '../components/animations/ExcelDataFlow';
import ChartMorphing from '../components/animations/ChartMorphing';
import DataVisualizationFlow from '../components/animations/DataVisualizationFlow';
import ExcelSpreadsheetAnimation from '../components/animations/ExcelSpreadsheetAnimation';
import AnalyticsParticles from '../components/animations/AnalyticsParticles';

const Home: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <ExcelDataFlow isActive={true} className="opacity-30" />
        <AnalyticsParticles particleCount={30} className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <FadeInUp delay={200}>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <PulsingOrb size="lg" color="blue" intensity="medium" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ChartMorphing size="md" speed={3000} />
                  </div>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                <span className="block">Transform Your Excel Data</span>
                <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Into{' '}
                  <TypewriterText 
                    texts={['Powerful Insights', 'Beautiful Charts', 'AI Analytics', 'Interactive Dashboards', '3D Visualizations']}
                    className="text-gradient"
                  />
                </span>
              </h1>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                Upload Excel files, create stunning 3D visualizations, get AI-powered insights, and export in multiple formats.
                Everything you need for professional data analysis with beautiful custom animations.
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
        
        {/* Animated Excel Demo */}
        <FadeInUp delay={1000}>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <ExcelSpreadsheetAnimation 
                  className="hover-lift"
                  cellCount={16}
                  animationSpeed={200}
                />
              </div>
              <div className="relative">
                <DataVisualizationFlow 
                  data={[25, 45, 35, 60, 40, 55, 50]}
                  className="hover-glow"
                  animated={true}
                />
              </div>
            </div>
          </div>
        </FadeInUp>
        
        <WaveBackground />
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <AnalyticsParticles particleCount={40} className="opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Trusted by Data Professionals</h2>
              <p className="text-xl text-gray-300">Join thousands who've transformed their data analysis with beautiful animations</p>
            </div>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FadeInUp delay={200}>
              <div className="text-center glass rounded-2xl p-8 hover-glow group">
                <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:animate-bounce-gentle">
                  <AnimatedCounter end={50000} suffix="+" />
                </div>
                <p className="text-gray-300">Files Processed</p>
                <div className="mt-2 text-2xl animate-excel-data-flow">📊</div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="text-center glass rounded-2xl p-8 hover-glow group">
                <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:animate-scale-pulse">
                  <AnimatedCounter end={125000} suffix="+" />
                </div>
                <p className="text-gray-300">Charts Created</p>
                <div className="mt-2 text-2xl animate-chart-morph">📈</div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <div className="text-center glass rounded-2xl p-8 hover-glow group">
                <div className="text-4xl font-bold text-pink-400 mb-2 group-hover:animate-analytics-pulse">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <p className="text-gray-300">Happy Users</p>
                <div className="mt-2 text-2xl animate-particle-dance">👥</div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={800}>
              <div className="text-center glass rounded-2xl p-8 hover-glow group">
                <div className="text-4xl font-bold text-green-400 mb-2 group-hover:animate-pulse-fast">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <p className="text-gray-300">Satisfaction Rate</p>
                <div className="mt-2 text-2xl animate-glow">⭐</div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <ExcelDataFlow isActive={true} className="opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Complete Excel Analytics Solution with Beautiful Animations
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                From data import to AI-powered insights, we provide everything you need for professional data analysis with stunning visual effects
              </p>
            </div>
          </FadeInUp>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-16">
            {/* Excel Import */}
            <FadeInUp delay={200}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <AnalyticsParticles particleCount={8} className="opacity-20" />
                <div className="relative z-10">
                  <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mx-auto mb-6 group-hover:animate-bounce-gentle">
                    <FileSpreadsheet className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Excel Import</h3>
                    <p className="text-gray-600 mb-4">
                      Seamlessly upload .xls and .xlsx files with automatic data parsing and animated column detection
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-center justify-center animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Drag & drop interface
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Automatic data validation
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Real-time preview
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Large file support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Interactive Charts */}
            <FadeInUp delay={400}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <ChartMorphing size="sm" speed={2000} />
                </div>
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white mx-auto mb-6 group-hover:animate-scale-pulse">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Interactive Charts</h3>
                  <p className="text-gray-600 mb-4">
                    Create stunning visualizations with our advanced charting engine and smooth animations
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.1s'}}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      15+ chart types (2D & 3D)
                    </li>
                    <li className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Real-time customization
                    </li>
                    <li className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Responsive design
                    </li>
                    <li className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                      Interactive legends
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* Export & Share */}
            <FadeInUp delay={600}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white mx-auto mb-6 group-hover:animate-rotate-slow">
                    <Download className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">💾 Export & Share</h3>
                    <p className="text-gray-600 mb-4">
                      Export your visualizations in multiple professional formats with animated previews
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-center justify-center animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                        PNG, JPEG, PDF exports
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                        CSV data downloads
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                        High-resolution output
                      </li>
                      <li className="flex items-center justify-center animate-slide-in-right" style={{animationDelay: '0.4s'}}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                        Batch export options
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Data History */}
            <FadeInUp delay={800}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white mx-auto mb-6 group-hover:animate-pulse-medium">
                  <Database className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🗂️ Data History</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive tracking and management of all your data and charts with timeline animations
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center justify-center animate-zoom-in" style={{animationDelay: '0.1s'}}>
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Upload history tracking
                    </li>
                    <li className="flex items-center justify-center animate-zoom-in" style={{animationDelay: '0.2s'}}>
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Saved chart library
                    </li>
                    <li className="flex items-center justify-center animate-zoom-in" style={{animationDelay: '0.3s'}}>
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Version control
                    </li>
                    <li className="flex items-center justify-center animate-zoom-in" style={{animationDelay: '0.4s'}}>
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Quick access dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInUp>

            {/* 3D Visualizations */}
            <FadeInUp delay={1000}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white mx-auto mb-6 group-hover:animate-bounce-gentle">
                    <PieChart className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">🌐 3D Visualizations</h3>
                    <p className="text-gray-600 mb-4">
                      Advanced 3D charts, geographic mapping, and surface visualizations with smooth transitions
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-center justify-center animate-excel-highlight" style={{animationDelay: '0.1s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        3D Column & Surface charts
                      </li>
                      <li className="flex items-center justify-center animate-excel-highlight" style={{animationDelay: '0.2s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Geographic Power Maps
                      </li>
                      <li className="flex items-center justify-center animate-excel-highlight" style={{animationDelay: '0.3s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Interactive 3D controls
                      </li>
                      <li className="flex items-center justify-center animate-excel-highlight" style={{animationDelay: '0.4s'}}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Time-based animations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* AI Insights */}
            <FadeInUp delay={1200}>
              <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift hover-glow transition-all duration-500 relative overflow-hidden">
                <AnalyticsParticles particleCount={12} className="opacity-30" colors={['#EF4444', '#EC4899', '#8B5CF6']} />
                <div className="relative z-10">
                  <div className="flex justify-center items-center h-16 w-16 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white mx-auto mb-6 group-hover:animate-glow">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Insights</h3>
                    <p className="text-gray-600 mb-4">
                      Advanced AI-powered analysis and intelligent recommendations with animated feedback
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-center justify-center animate-particle-dance" style={{animationDelay: '0.1s'}}>
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                        Smart chart suggestions
                      </li>
                      <li className="flex items-center justify-center animate-particle-dance" style={{animationDelay: '0.2s'}}>
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                        Trend analysis
                      </li>
                      <li className="flex items-center justify-center animate-particle-dance" style={{animationDelay: '0.3s'}}>
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                        Data insights
                      </li>
                      <li className="flex items-center justify-center animate-particle-dance" style={{animationDelay: '0.4s'}}>
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                        Automated recommendations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Demo Credentials */}
          <FadeInUp delay={1400}>
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200 glass relative overflow-hidden">
              <ExcelDataFlow isActive={true} className="opacity-20" />
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-2 text-blue-600 animate-pulse" />
                  🚀 Try It Now - Demo Credentials with Beautiful Animations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-md hover-lift animate-slide-in-left">
                    <h4 className="font-bold text-gray-900 mb-2">👤 Regular User</h4>
                    <p className="text-sm text-gray-600 mb-1">Email: user@example.com</p>
                    <p className="text-sm text-gray-600">Password: password123</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md hover-lift animate-slide-in-right">
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
                Everything You Need for Data Analysis with Stunning Animations
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics with Animations</h3>
                    <p className="text-gray-600">
                      Get deep insights from your data with statistical analysis, trend detection, and pattern recognition enhanced with beautiful visual animations.
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
                      Share insights with your team, manage user permissions, and collaborate on data projects with real-time animated updates.
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
                      Your data is protected with enterprise-grade security, encryption, and access controls, all with smooth animated interfaces.
                    </p>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right side - Animated Demo */}
            <FadeInUp delay={800}>
              <div className="relative">
                <div className="relative rounded-2xl shadow-2xl overflow-hidden hover-lift">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8">
                    <DataVisualizationFlow 
                      data={[30, 55, 40, 70, 45, 65, 50, 80]}
                      className="mb-6"
                      animated={true}
                    />
                    <ExcelSpreadsheetAnimation 
                      cellCount={12}
                      animationSpeed={180}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-10"></div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient relative overflow-hidden">
        <AnalyticsParticles particleCount={60} className="opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-float-medium"></div>
          <div className="absolute top-3/4 left-3/4 w-16 h-16 bg-white/10 rounded-full animate-float-fast"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-20">
          <FadeInUp>
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
                Ready to Transform Your Data with Beautiful Animations?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who trust our platform for their data analysis needs.
                Start your free trial today with stunning custom animations and AI insights.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <GlowingButton
                  variant="secondary"
                  size="lg"
                  icon={Sparkles}
                  onClick={() => window.location.href = '/register'}
                  className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce-gentle"
                >
                  Start Free Trial
                </GlowingButton>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 group animate-glow"
                >
                  Sign In Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform animate-pulse" />
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