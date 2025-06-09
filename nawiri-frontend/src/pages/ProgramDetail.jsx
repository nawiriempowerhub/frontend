import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import { programsService } from '../services/programsService';
import { mediaService } from '../services/mediaService';

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        const [programData, mediaData] = await Promise.all([
          programsService.getProgram(id),
          mediaService.getMediaByProgram(id),
        ]);
        
        setProgram(programData);
        setMedia(mediaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading program details..." />
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

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message="Program not found" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-max">
          <div className="mb-6">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/programs">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Programs
              </Link>
            </Button>
          </div>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {program.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Program</h2>
                <p className="text-gray-600 mb-8">
                  {program.long_description || program.description}
                </p>

                {program.objectives && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Objectives</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {program.objectives.split('\n').map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.activities && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Activities</h3>
                    <p className="text-gray-600">{program.activities}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {program.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">{program.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {program.participants && (
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Participants</p>
                        <p className="text-sm text-gray-600">{program.participants} people</p>
                      </div>
                    </div>
                  )}
                  
                  {program.start_date && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-sm text-gray-600">
                          {new Date(program.start_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {program.status && (
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Status</p>
                        <p className="text-sm text-gray-600 capitalize">{program.status}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Involved</CardTitle>
                  <CardDescription>
                    Support this program and help us create lasting change.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/get-involved">Volunteer</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Media */}
      {media.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Program Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map((item) => (
                <Card key={item.id} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.description && (
                      <CardDescription>{item.description}</CardDescription>
                    )}
                  </CardHeader>
                  {item.url && (
                    <CardContent>
                      <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">Media Content</span>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Support {program.title}
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Your contribution can help us expand this program and reach more communities in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/get-involved">
                  Get Involved
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;

