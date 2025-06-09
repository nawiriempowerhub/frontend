import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Users, DollarSign, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
//import VolunteerForm from '../components/forms/VolunteerForm';
//import DonationForm from '../components/forms/DonationForm';
import { eventsService } from '../services/eventsService';

const GetInvolved = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('volunteer');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const tabs = [
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
    { id: 'donate', label: 'Donate', icon: DollarSign },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading opportunities..." />
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
              Get Involved
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Join our mission to empower communities. Whether through volunteering, donating, or participating in events, your contribution makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'volunteer' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Become a Volunteer
                  </h2>
                  <p className="text-xl text-gray-600">
                    Join our team of dedicated volunteers and help us create positive change in communities across Kenya.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle>Make a Difference</CardTitle>
                      <CardDescription>
                        Directly impact lives and contribute to meaningful change in communities.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle>Build Connections</CardTitle>
                      <CardDescription>
                        Connect with like-minded individuals and build lasting relationships.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle>Develop Skills</CardTitle>
                      <CardDescription>
                        Gain valuable experience and develop new skills while serving others.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* <VolunteerForm /> */}
              </div>
            )}

            {activeTab === 'donate' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Support Our Mission
                  </h2>
                  <p className="text-xl text-gray-600">
                    Your donation helps us expand our programs and reach more communities in need.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <Card className="text-center">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">$25</CardTitle>
                      <CardDescription>
                        Provides educational materials for one child for a month.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">$50</CardTitle>
                      <CardDescription>
                        Supports healthcare services for a family for one month.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">$100</CardTitle>
                      <CardDescription>
                        Funds a complete skills training workshop for 10 participants.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <DonationForm />
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Upcoming Events
                  </h2>
                  <p className="text-xl text-gray-600">
                    Join us at our upcoming events and be part of the change you want to see.
                  </p>
                </div>

                {events.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Upcoming Events</h3>
                    <p className="text-gray-600 mb-8">We're planning exciting new events. Check back soon!</p>
                    <Button>Contact Us for Updates</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event) => (
                      <Card key={event.id} className="card-hover">
                        <CardHeader>
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {event.date && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.capacity && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{event.capacity} participants</span>
                              </div>
                            )}
                          </div>
                          <Button className="w-full mt-6">
                            Register for Event
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Every Action Counts
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Whether you volunteer your time, make a donation, or attend our events, every action contributes to positive change in communities across Kenya.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Contact Us to Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;

