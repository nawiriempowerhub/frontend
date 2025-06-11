
import React, { useState, useEffect } from 'react';
import { Image, Video, FileText, Calendar } from 'lucide-react';
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
        return <Image style={{ width: '20px', height: '20px' }} />;
      case 'video':
        return <Video style={{ width: '20px', height: '20px' }} />;
      case 'document':
        return <FileText style={{ width: '20px', height: '20px' }} />;
      default:
        return <Image style={{ width: '20px', height: '20px' }} />;
    }
  };

  const filteredMedia = filter === 'all' 
    ? media 
    : media.filter(item => item.type?.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading size="lg" text="Loading media content..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">
              Media & Impact
            </h1>
            <p className="fs-4 text-gray-100">
              Explore our gallery of photos, videos, and stories that showcase the impact of our programs and the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding bg-gray-50">
        <div className="container-fluid px-3">
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            {['all', 'image', 'video', 'document'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-pill fw-medium transition-colors ${
                  filter === filterType
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover-bg-gray-100'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          {/* Media Gallery */}
          {filteredMedia.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="fs-3 fw-semibold text-dark mb-3">No Media Available</h3>
              <p className="text-muted">We're working on adding more content. Check back soon!</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredMedia.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card card-hover">
                    <div className="card-header">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {getMediaIcon(item.type)}
                        <span className="small text-gray-500 text-capitalize">
                          {item.type || 'Media'}
                        </span>
                      </div>
                      <h5 className="card-title fs-6">{item.title}</h5>
                      {item.description && (
                        <p className="card-text text-muted">{item.description}</p>
                      )}
                    </div>
                    <div className="card-body">
                      {item.url ? (
                        <div className="ratio ratio-16x9 bg-gray-200 rounded mb-3 d-flex align-items-center justify-content-center">
                          <span className="text-gray-500">Media Content</span>
                        </div>
                      ) : (
                        <div className="ratio ratio-16x9 bg-primary-accent-gradient rounded mb-3 d-flex align-items-center justify-content-center">
                          {getMediaIcon(item.type)}
                        </div>
                      )}
                      {item.created_at && (
                        <p className="small text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Stories */}
      {impact.length > 0 && (
        <section className="section-padding">
          <div className="container-fluid px-3">
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold text-dark mb-3">
                Stories of Impact
              </h2>
              <p className="fs-5 text-muted">
                Real stories from the communities we serve, showcasing the transformative power of our programs and initiatives.
              </p>
            </div>

            <div className="row g-4">
              {impact.map((story) => (
                <div key={story.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card card-hover">
                    <div className="card-header">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Calendar style={{ width: '16px', height: '16px' }} className="text-primary" />
                        <span className="small text-gray-500">
                          {new Date(story.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h5 className="card-title fs-5">{story.title}</h5>
                      <p className="card-text text-muted">{story.description}</p>
                    </div>
                    <div className="card-body">
                      {story.impact_metrics && (
                        <div className="bg-gray-50 rounded p-3">
                          <h6 className="fw-medium text-dark mb-2">Impact Metrics</h6>
                          <p className="small text-muted">{story.impact_metrics}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="hero-gradient text-white section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">
              Be Part of Our Story
            </h2>
            <p className="fs-5 mb-4 text-gray-100">
              Join us in creating more stories of impact and transformation. Your involvement can help us reach more communities and create lasting change.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a href="/get-involved" className="btn btn-light text-primary hover-bg-gray-100 fw-medium">
                Get Involved
              </a>
              <a href="/programs" className="btn btn-outline-light fw-medium">
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