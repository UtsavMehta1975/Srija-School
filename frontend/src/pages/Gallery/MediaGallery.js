import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Spinner, Tab, Nav } from 'react-bootstrap';
import { galleryAPI } from '../../services/api';

const MediaGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [albumsResponse, videosResponse] = await Promise.all([
        galleryAPI.getAlbums(),
        galleryAPI.getVideos()
      ]);
      
      setAlbums(albumsResponse.data.data);
      setVideos(videosResponse.data.data);
    } catch (error) {
      console.error('Error fetching media data:', error);
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
            <h1 className="text-primary mb-3">Media Gallery</h1>
            <p className="lead text-muted">
              Comprehensive collection of photos and videos from Srijan School events and activities
            </p>
          </div>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="photos">
        <Row>
          <Col>
            <Nav variant="tabs" className="justify-content-center mb-4">
              <Nav.Item>
                <Nav.Link eventKey="photos">Photos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="videos">Videos</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Tab.Content>
          {/* Photos Tab */}
          <Tab.Pane eventKey="photos">
            {albums.length > 0 ? (
              <Row className="g-4">
                {albums.map((album) => (
                  <Col md={6} lg={4} key={album.id}>
                    <Card className="h-100 border-0 shadow-sm">
                      {album.cover_image && (
                        <Image
                          src={`${process.env.REACT_APP_API_URL}${album.cover_image}`}
                          alt={album.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                          className="card-img-top"
                        />
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-primary">{album.name}</Card.Title>
                        {album.description && (
                          <Card.Text className="text-muted flex-grow-1">
                            {album.description}
                          </Card.Text>
                        )}
                        <div className="mt-auto">
                          <small className="text-muted">
                            📸 Photo Album
                          </small>
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
                        <span style={{ fontSize: '4rem' }}>📸</span>
                      </div>
                      <h4 className="text-primary mb-3">No Photo Albums Available</h4>
                      <p className="text-muted">
                        We're working on adding photo albums. Check back soon for updates!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Tab.Pane>

          {/* Videos Tab */}
          <Tab.Pane eventKey="videos">
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
                          <small className="text-muted">
                            📹 Video Content
                          </small>
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
                        We're working on adding video content. Check back soon for updates!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default MediaGallery;


