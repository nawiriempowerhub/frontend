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
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all'); // New state for media type filter
  const [activeTab, setActiveTab] = useState('media');

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
        return <Image className="text-primary" style={{ width: '20px', height: '20px' }} />;
      case 'video':
        return <Video className="text-primary" style={{ width: '20px', height: '20px' }} />;
      case 'document':
        return <FileText className="text-primary" style={{ width: '20px', height: '20px' }} />;
      default:
        return <Image className="text-primary" style={{ width: '20px', height: '20px' }} />;
    }
  };

  // Get unique media types for filter options
  const mediaTypes = [...new Set(media.map(item => item.type?.toLowerCase()))].filter(Boolean);

  const filteredMedia = media.filter(item => {
    const matchesFilter = filter === 'all' || 
      (filter === 'hasUrl' ? item.url : !filter);
    const matchesMediaType = mediaTypeFilter === 'all' || 
      item.type?.toLowerCase() === mediaTypeFilter;
    return matchesFilter && matchesMediaType;
  });

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
            <h2 className="display-4 fw-bold mb-4">
              Media & Impact
            </h2>
            <p className="fs-4 text-gray-100">
              Explore our gallery of photos, videos, and stories that showcase the impact of our programs and the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white" style={{ zIndex: 1020 }}>
        <div className="container-fluid px-3">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'media' ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab('media')}
              >
                Media Gallery
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'impact' ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab('impact')}
              >
                Impact Stories
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Media Gallery Section */}
      {activeTab === 'media' && (
        <section className="section-padding bg-gray-50">
          <div className="container-fluid px-3">
            {/* Filter Tabs */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
              {/* Content Type Filter */}
              {/* <div className="w-100 text-center mb-3">
                <h5 className="fw-semibold text-muted mb-3">Filter by Content Type</h5>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  {['all', 'hasUrl', 'noUrl'].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`btn btn-sm px-4 py-2 rounded-pill fw-medium ${
                        filter === filterType
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                    >
                      {filterType === 'hasUrl' ? 'Has URL' : 
                       filterType === 'noUrl' ? 'No URL' : 
                       'All Content'}
                    </button>
                  ))}
                </div>
              </div> */}
              
              {/* Media Type Filter */}
              <div className="w-100 text-center">
                <h5 className="fw-semibold text-muted mb-3">Filter by Media Type</h5>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button
                    onClick={() => setMediaTypeFilter('all')}
                    className={`btn btn-sm px-4 py-2 rounded-pill fw-medium ${
                      mediaTypeFilter === 'all'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    }`}
                  >
                    All Media Types
                  </button>
                  {mediaTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setMediaTypeFilter(type)}
                      className={`btn btn-sm px-4 py-2 rounded-pill fw-medium ${
                        mediaTypeFilter === type
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Gallery */}
            {filteredMedia.length === 0 ? (
              <div className="text-center py-5">
                <div className="bg-white p-5 rounded-3 shadow-sm">
                  <h3 className="fs-3 fw-semibold text-dark mb-3">No Media Available</h3>
                  <p className="text-muted mb-4">We're working on adding more content. Check back soon!</p>
                  <button 
                    className="btn btn-outline-primary me-2"
                    onClick={() => setFilter('all')}
                  >
                    Reset Content Filter
                  </button>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setMediaTypeFilter('all')}
                  >
                    Reset Type Filter
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                      <div className="card-header bg-white border-bottom-0">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          {getMediaIcon(item.type)}
                          <span className="small text-muted text-capitalize">
                            {item.type || 'Media'}
                          </span>
                        </div>
                        <h5 className="card-title fs-6 fw-semibold">{item.title}</h5>
                        {item.description && (
                          <p className="card-text text-muted small">{item.description}</p>
                        )}
                      </div>
                      <div className="card-body pt-0">
                        {item.url ? (
                          <div className="ratio ratio-16x9 bg-light rounded mb-3 d-flex align-items-center justify-content-center overflow-hidden">
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                              {getMediaIcon(item.type)}
                              <span className="ms-2 small text-muted">Click to view</span>
                            </div>
                          </div>
                        ) : (
                          <div className="ratio ratio-16x9 bg-light rounded mb-3 d-flex align-items-center justify-content-center">
                            {getMediaIcon(item.type)}
                          </div>
                        )}
                        {item.created_at && (
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small text-muted mb-0">
                              {new Date(item.created_at).toLocaleDateString()}
                            </p>
                            <button className="btn btn-sm btn-outline-primary">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Impact Stories Section - Remaining code stays the same */}
      {activeTab === 'impact' && (
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

            {impact.length === 0 ? (
              <div className="text-center py-5">
                <div className="bg-white p-5 rounded-3 shadow-sm">
                  <h3 className="fs-3 fw-semibold text-dark mb-3">No Impact Stories Yet</h3>
                  <p className="text-muted">We're collecting stories of how our programs are making a difference. Check back soon!</p>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {impact.map((story) => (
                  <div key={story.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                      <div className="card-header bg-white border-bottom-0">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Calendar style={{ width: '16px', height: '16px' }} className="text-primary" />
                          <span className="small text-muted">
                            {new Date(story.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h5 className="card-title fs-5 fw-semibold">{story.title}</h5>
                        <p className="card-text text-muted small">{story.description}</p>
                      </div>
                      <div className="card-body pt-0">
                        {story.impact_metrics && (
                          <div className="bg-light rounded p-3 mb-3">
                            <h6 className="fw-semibold text-dark mb-2 small">Impact Metrics</h6>
                            <p className="small text-muted">{story.impact_metrics}</p>
                          </div>
                        )}
                        <button className="btn btn-sm btn-primary w-100">
                          Read Full Story
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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