import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Image, Modal, Spinner, Button } from 'react-bootstrap';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [imagesLoading, setImagesLoading] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Load photos
      const photoData = [
        { id: 1, title: "School Building", url: "/aboutus.JPG", category: "infrastructure" },
        { id: 2, title: "School Campus", url: "/aboutus2.JPG", category: "infrastructure" },
        { id: 3, title: "School Activities", url: "/IMG_1973.JPG", category: "activities" },
        { id: 4, title: "Students Learning", url: "/IMG_2023.JPG", category: "students" },
        { id: 5, title: "Learning Environment", url: "/IMG_2029.JPG", category: "environment" },
        { id: 6, title: "School Life", url: "/IMG_2030.JPG", category: "life" },
        { id: 7, title: "School Events", url: "/IMG_2436.JPG", category: "events" },
        { id: 8, title: "Student Activities", url: "/IMG_2031.JPG", category: "activities" },
        { id: 9, title: "Classroom", url: "/IMG_2032.JPG", category: "environment" },
        { id: 10, title: "Library", url: "/IMG_2033.JPG", category: "infrastructure" },
        { id: 11, title: "Laboratory", url: "/IMG_2034.JPG", category: "infrastructure" },
        { id: 12, title: "Sports", url: "/IMG_2329.JPG", category: "activities" },
        { id: 13, title: "More Activities", url: "/IMG_2331.JPG", category: "activities" },
        { id: 14, title: "School Events", url: "/IMG_2436.JPG", category: "events" },
        { id: 15, title: "Student Life", url: "/IMG_8192.JPG", category: "life" },
        { id: 16, title: "Learning Moments", url: "/IMG_8193.JPG", category: "students" },
        { id: 17, title: "School Environment", url: "/IMG_8191.JPG", category: "environment" },
        { id: 18, title: "Special Events", url: "/IMG_8190.JPG", category: "events" },
        { id: 19, title: "Daily Life", url: "/IMG_8188.JPG", category: "life" },
        { id: 20, title: "Student Engagement", url: "/IMG_8189.JPG", category: "students" },
        { id: 21, title: "School Activities", url: "/IMG_8187.JPG", category: "activities" },
        { id: 22, title: "Educational Environment", url: "/IMG_8184.JPG", category: "environment" },
        { id: 23, title: "Student Success", url: "/IMG_8185.JPG", category: "students" },
        { id: 24, title: "Learning Experience", url: "/IMG_8186.JPG", category: "environment" }
      ];
      
      // Load videos
      const videoData = [
        { id: 1, title: "School Tour", url: "/vediossrijan .mp4", thumbnail: "/IMG_2331.JPG", category: "tour" },
        { id: 2, title: "Annual Day", url: "/vediossrijan .mp4", thumbnail: "/IMG_2436.JPG", category: "events" },
        { id: 3, title: "Sports Day", url: "/vediossrijan .mp4", thumbnail: "/IMG_2329.JPG", category: "sports" }
      ];
      
      setImages(photoData);
      setVideos(videoData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const handleImageLoad = (imageId) => {
    setImagesLoading(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  const handleImageStartLoading = (imageId) => {
    setImagesLoading(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  // Beautiful Loading Component
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-text">
        <h4>Loading Media Gallery</h4>
        <p>Please wait while we prepare your content...</p>
      </div>
    </div>
  );

  const categories = {
    photos: ['all', 'infrastructure', 'activities', 'students', 'environment', 'life', 'events'],
    videos: ['all', 'tour', 'events', 'sports']
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const displayedImages = showAllImages ? filteredImages : filteredImages.slice(0, 12);

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(vid => vid.category === selectedCategory);

  if (loading) {
    return (
      <div className="gallery-loading">
        <Container className="py-5">
          <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="media-gallery">
      <Container className="py-5">
        {/* Header with Image */}
        <Row className="mb-5">
          <Col>
            <div className="gallery-header-image-container">
              <img 
                src="/mediagallerytop.JPG" 
                alt="Srijan School Media Gallery" 
                className="gallery-header-image"
                onLoad={() => handleImageLoad('header')}
                onLoadStart={() => handleImageStartLoading('header')}
              />
              {imagesLoading['header'] && (
                <div className="gallery-header-loader">
                  <Spinner animation="border" variant="light" />
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Navigation Tabs */}
        <Row className="mb-4">
          <Col>
            <div className="gallery-nav-wrapper">
              <Nav variant="pills" className="gallery-nav justify-content-center">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'photos'} 
                    onClick={() => {
                      setActiveTab('photos');
                      setSelectedCategory('all');
                    }}
                    className="gallery-nav-link"
                  >
                    📸 Photos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'videos'} 
                    onClick={() => {
                      setActiveTab('videos');
                      setSelectedCategory('all');
                    }}
                    className="gallery-nav-link"
                  >
                    🎥 Videos
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
        </Row>

        {/* Category Filter */}
        <Row className="mb-4">
          <Col>
            <div className="category-filter">
              <Nav variant="pills" className="justify-content-center">
                {categories[activeTab].map((category) => (
                  <Nav.Item key={category}>
                    <Nav.Link 
                      active={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                      className="category-nav-link"
                    >
                      {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </Col>
        </Row>

        {/* Content */}
        <Tab.Container activeKey={activeTab}>
          <Tab.Content>
            {/* Photos Tab */}
            <Tab.Pane eventKey="photos">
              <Row className="gallery-grid">
                {displayedImages.map((image) => (
                  <Col xs={6} sm={4} md={3} lg={3} key={image.id} className="mb-4">
                    <Card 
                      className="gallery-card h-100"
                      onClick={() => handleImageClick(image)}
                    >
                      <div className="gallery-image-container">
                        {imagesLoading[image.id] && (
                          <div className="image-loading-overlay">
                            <Spinner animation="border" variant="light" />
                          </div>
                        )}
                        <Image 
                          src={image.url} 
                          alt={image.title}
                          className="gallery-image"
                          loading="lazy"
                          onLoad={() => handleImageLoad(image.id)}
                          onLoadStart={() => handleImageStartLoading(image.id)}
                        />
                        <div className="gallery-overlay">
                          <div className="gallery-overlay-content">
                            <h6>{image.title}</h6>
                            <span className="gallery-icon">🔍</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              
              {/* Show All Button */}
              {filteredImages.length > 12 && (
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={() => setShowAllImages(!showAllImages)}
                      className="btn-school-primary"
                    >
                      {showAllImages ? 'Show Less' : `View All ${filteredImages.length} Photos`}
                    </Button>
                  </Col>
                </Row>
              )}
            </Tab.Pane>

            {/* Videos Tab */}
            <Tab.Pane eventKey="videos">
              <Row className="gallery-grid">
                {filteredVideos.map((video) => (
                  <Col xs={12} sm={6} md={4} lg={4} key={video.id} className="mb-4">
                    <Card className="video-card h-100">
                      <div className="video-container">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="video-thumbnail"
                        />
                        <div className="video-overlay">
                          <div className="play-button">
                            <span className="play-icon">▶️</span>
                          </div>
                        </div>
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title className="h6">{video.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Image Modal */}
        <Modal 
          show={showImageModal} 
          onHide={handleCloseModal} 
          size="lg" 
          centered
          className="gallery-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedImage?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            {selectedImage && (
              <Image 
                src={selectedImage.url} 
                alt={selectedImage.title}
                fluid
                className="modal-image"
              />
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Gallery;