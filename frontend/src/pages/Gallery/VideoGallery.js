import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Spinner, Button } from 'react-bootstrap';
import { galleryAPI } from '../../services/api';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await galleryAPI.getVideos();
      setVideos(response.data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Video Gallery</h1>
            <p className="lead text-muted">
              Watch our collection of videos showcasing school events, activities, and achievements
            </p>
          </div>
        </Col>
      </Row>

      {videos.length > 0 ? (
        <Row className="g-4">
          {videos.map((video) => (
            <Col md={6} lg={4} key={video.id}>
              <Card className="h-100 border-0 shadow-sm">
                {video.thumbnail_url ? (
                  <Image
                    src={`${process.env.REACT_APP_API_URL}${video.thumbnail_url}`}
                    alt={video.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                    className="card-img-top"
                  />
                ) : (
                  <div 
                    className="bg-secondary d-flex align-items-center justify-content-center card-img-top"
                    style={{ height: '250px' }}
                  >
                    <span className="text-white" style={{ fontSize: '3rem' }}>📹</span>
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{video.title}</Card.Title>
                  {video.description && (
                    <Card.Text className="text-muted flex-grow-1">
                      {video.description}
                    </Card.Text>
                  )}
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100"
                    >
                      Watch Video
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5 text-center">
                <div className="text-muted mb-4">
                  <span style={{ fontSize: '4rem' }}>📹</span>
                </div>
                <h4 className="text-primary mb-3">No Videos Available</h4>
                <p className="text-muted">
                  We're working on adding exciting video content. Check back soon for updates!
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VideoGallery;



