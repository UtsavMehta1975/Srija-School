import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Spinner, Modal, Button } from 'react-bootstrap';
import { galleryAPI } from '../../services/api';

const PhotoGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await galleryAPI.getAlbums();
      setAlbums(response.data.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumImages = async (albumId) => {
    try {
      const response = await galleryAPI.getImagesByAlbum(albumId);
      setAlbumImages(response.data.data);
    } catch (error) {
      console.error('Error fetching album images:', error);
    }
  };

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
    fetchAlbumImages(album.id);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
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
            <h1 className="text-primary mb-3">Photo Gallery</h1>
            <p className="lead text-muted">
              Explore our collection of photographs capturing memorable moments and events at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Photo Albums</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {albums.length > 0 ? (
                <div className="list-group list-group-flush">
                  {albums.map((album) => (
                    <button
                      key={album.id}
                      className={`list-group-item list-group-item-action border-0 ${
                        selectedAlbum?.id === album.id ? 'active' : ''
                      }`}
                      onClick={() => handleAlbumSelect(album)}
                    >
                      <div className="d-flex align-items-center">
                        {album.cover_image && (
                          <Image
                            src={`${process.env.REACT_APP_API_URL}${album.cover_image}`}
                            alt={album.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="rounded me-3"
                          />
                        )}
                        <div>
                          <h6 className="mb-1">{album.name}</h6>
                          {album.description && (
                            <small className="text-muted">{album.description}</small>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center text-muted">
                  <p>No albums available.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={9}>
          {selectedAlbum ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="text-primary mb-2">{selectedAlbum.name}</h3>
                  {selectedAlbum.description && (
                    <p className="text-muted mb-0">{selectedAlbum.description}</p>
                  )}
                </div>
                <Button 
                  variant="outline-primary" 
                  onClick={() => setSelectedAlbum(null)}
                >
                  View All Albums
                </Button>
              </div>
              
              {albumImages.length > 0 ? (
                <Row className="g-3">
                  {albumImages.map((image) => (
                    <Col md={4} key={image.id}>
                      <div 
                        className="gallery-item cursor-pointer"
                        onClick={() => handleImageClick(image)}
                      >
                        <Image
                          src={`${process.env.REACT_APP_API_URL}${image.image_url}`}
                          alt={image.title || 'Gallery image'}
                          fluid
                          className="rounded shadow-sm"
                          style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                        />
                        {image.title && (
                          <div className="mt-2">
                            <h6 className="mb-1">{image.title}</h6>
                            {image.description && (
                              <small className="text-muted">{image.description}</small>
                            )}
                          </div>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center text-muted py-5">
                  <h5>No images in this album</h5>
                  <p>Check back later for new photos!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted py-5">
              <h5>Select an album to view photos</h5>
              <p>Choose from the albums on the left to explore our photo collection</p>
            </div>
          )}
        </Col>
      </Row>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.title || 'Gallery Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <Image
              src={`${process.env.REACT_APP_API_URL}${selectedImage.image_url}`}
              alt={selectedImage.title || 'Gallery image'}
              fluid
            />
          )}
          {selectedImage?.description && (
            <p className="mt-3 text-muted">{selectedImage.description}</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PhotoGallery;


