import React, { useState, useEffect } from 'react';
import { Users, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import { aboutService } from '../services/aboutService';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [team, setTeam] = useState([]);
  const [impact, setImpact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aboutInfo, teamData, impactData] = await Promise.all([
          aboutService.getAbout(),
          aboutService.getTeam(),
          aboutService.getImpact(),
        ]);
        
        setAboutData(aboutInfo);
        setTeam(teamData);
        setImpact(impactData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading about information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Nawiri EmpowerHub
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Empowering communities through sustainable development, education, and healthcare initiatives across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {aboutData?.mission || "To empower communities through sustainable development programs that focus on education, healthcare, and economic empowerment, creating lasting positive change in the lives of those we serve."}
              </p>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                {aboutData?.vision || "A world where every community has access to quality education, healthcare, and opportunities for sustainable economic growth, enabling individuals to reach their full potential."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Our Approach</CardTitle>
                  <CardDescription>
                    We believe in community-driven solutions that address root causes and create sustainable change.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>
                    Integrity, compassion, sustainability, and empowerment guide everything we do.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Our Impact</CardTitle>
                  <CardDescription>
                    Measurable results that transform lives and strengthen communities for generations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated professionals working together to create positive change in communities across Kenya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.id} className="card-hover text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {member.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Timeline */}
      {impact.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Impact Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones and achievements that mark our journey of creating positive change.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {impact.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <Card className="flex-1 card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                          </div>
                          <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                            {new Date(event.date).getFullYear()}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Together, we can create lasting change and build stronger, more resilient communities. Your support makes all the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-involved"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Involved
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

