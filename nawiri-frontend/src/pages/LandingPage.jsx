import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Heart, 
  Target, 
  Globe,
  UserPlus,
  Shield,
  Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const LandingPage = () => {
  const stats = [
    { number: '1,247', label: 'Lives Impacted', icon: Heart },
    { number: '15+', label: 'Active Programs', icon: Target },
    { number: '127', label: 'Volunteers', icon: Users },
    { number: '8', label: 'Communities', icon: Globe }
  ];

  const userOptions = [
    {
      title: 'Explore as Visitor',
      description: 'Browse our programs, impact stories, and learn about our mission without creating an account.',
      icon: Eye,
      link: '/home',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Join Our Community',
      description: 'Create an account to apply for volunteer opportunities, make donations, and stay connected.',
      icon: UserPlus,
      link: '/auth/register',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Member Login',
      description: 'Already have an account? Sign in to access your dashboard and manage your involvement.',
      icon: Users,
      link: '/auth/login',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-purple-600'
    },
    {
      title: 'Admin Access',
      description: 'Administrative portal for managing programs, volunteers, and organizational content.',
      icon: Shield,
      link: '/admin/login',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-orange-600'
    }
  ];

  const features = [
    {
      title: 'Community Programs',
      description: 'Discover our diverse range of programs focused on education, health, and empowerment.',
      image: '/api/placeholder/300/200'
    },
    {
      title: 'Volunteer Opportunities',
      description: 'Join our team of dedicated volunteers and make a direct impact in your community.',
      image: '/api/placeholder/300/200'
    },
    {
      title: 'Impact Stories',
      description: 'Read inspiring stories of transformation and see the real difference we\'re making together.',
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Nawiri EmpowerHub</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Empowering Communities, Building Futures</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering Communities,
            <span className="text-primary block">Building Futures</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Nawiri EmpowerHub in creating lasting change through education, health initiatives, 
            and community empowerment programs across Kenya.
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Options Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Would You Like to Get Started?</h2>
            <p className="text-lg text-gray-600">Choose the option that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                    <Link to={option.link}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">Discover the ways you can get involved and make a difference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of community members who are already creating positive change through Nawiri EmpowerHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Join Our Community
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/home">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nawiri EmpowerHub</h3>
                  <p className="text-gray-400 text-sm">Empowering Communities, Building Futures</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Dedicated to creating lasting positive change through community-driven programs 
                focused on education, health, and empowerment.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/programs" className="text-gray-400 hover:text-white">Programs</Link></li>
                <li><Link to="/media" className="text-gray-400 hover:text-white">Media & Impact</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2">
                <li><Link to="/auth/register" className="text-gray-400 hover:text-white">Volunteer</Link></li>
                <li><Link to="/get-involved" className="text-gray-400 hover:text-white">Donate</Link></li>
                <li><Link to="/get-involved" className="text-gray-400 hover:text-white">Events</Link></li>
                <li><Link to="/auth/login" className="text-gray-400 hover:text-white">Member Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Nawiri EmpowerHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

