import React, { useState, useEffect } from 'react';
import { Image, Video, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import { mediaService } from '../services/mediaService';
import { aboutService } from '../services/aboutService';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [impact, setImpact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mediaData, impactData] = await Promise.all([
          mediaService.getMedia(),
          aboutService.getImpact(),
        ]);
        
        setMedia(mediaData);
        setImpact(impactData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMediaIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      default:
        return <Image className="w-5 h-5" />;
    }
  };

  const filteredMedia = filter === 'all' 
    ? media 
    : media.filter(item => item.type?.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading media content..." />
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
              Media & Impact
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Explore our gallery of photos, videos, and stories that showcase the impact of our programs and the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'image', 'video', 'document'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          {/* Media Gallery */}
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Media Available</h3>
              <p className="text-gray-600">We're working on adding more content. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <Card key={item.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      {getMediaIcon(item.type)}
                      <span className="text-sm text-gray-500 capitalize">
                        {item.type || 'Media'}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.description && (
                      <CardDescription>{item.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {item.url ? (
                      <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                        <span className="text-gray-500">Media Content</span>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center mb-4">
                        {getMediaIcon(item.type)}
                      </div>
                    )}
                    {item.created_at && (
                      <p className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Stories */}
      {impact.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stories of Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from the communities we serve, showcasing the transformative power of our programs and initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {impact.map((story) => (
                <Card key={story.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-500">
                        {new Date(story.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{story.title}</CardTitle>
                    <CardDescription>{story.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {story.impact_metrics && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Impact Metrics</h4>
                        <p className="text-sm text-gray-600">{story.impact_metrics}</p>
                      </div>
                    )}
                  </CardContent>
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
              Be Part of Our Story
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join us in creating more stories of impact and transformation. Your involvement can help us reach more communities and create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-involved"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Involved
              </a>
              <a
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-primary transition-colors"
              >
                View Our Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;

