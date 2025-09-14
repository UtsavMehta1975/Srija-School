import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AcademicCalendar from './pages/Achievements';
import MandatoryDisclosure from './pages/MandatoryDisclosure';

// Rules & Regulations Pages
import Rules from './pages/Rules/Index';
import AdmissionRules from './pages/Rules/AdmissionRules';
import BusRules from './pages/Rules/BusRules';
import FeesRules from './pages/Rules/FeesRules';
import ParentRecommendations from './pages/Rules/ParentRecommendations';
import DisciplineRules from './pages/Rules/DisciplineRules';
import SchoolRules from './pages/Rules/SchoolRules';
import SchoolTimings from './pages/Rules/SchoolTimings';
import SchoolUniform from './pages/Rules/SchoolUniform';
import TeacherServiceRules from './pages/Rules/TeacherServiceRules';
import VacationRules from './pages/Rules/VacationRules';

// Gallery Sub-pages
import PhotoGallery from './pages/Gallery/PhotoGallery';
import VideoGallery from './pages/Gallery/VideoGallery';
import MediaGallery from './pages/Gallery/MediaGallery';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academic-calendar" element={<AcademicCalendar />} />
              <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Gallery Routes */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/photos" element={<PhotoGallery />} />
              <Route path="/gallery/videos" element={<VideoGallery />} />
              <Route path="/gallery/media" element={<MediaGallery />} />
              
              {/* Rules & Regulations Routes */}
              <Route path="/rules" element={<Rules />} />
              <Route path="/rules/admission" element={<AdmissionRules />} />
              <Route path="/rules/bus" element={<BusRules />} />
              <Route path="/rules/fees" element={<FeesRules />} />
              <Route path="/rules/parent-recommendations" element={<ParentRecommendations />} />
              <Route path="/rules/discipline" element={<DisciplineRules />} />
              <Route path="/rules/school" element={<SchoolRules />} />
              <Route path="/rules/timings" element={<SchoolTimings />} />
              <Route path="/rules/uniform" element={<SchoolUniform />} />
              <Route path="/rules/teacher-service" element={<TeacherServiceRules />} />
              <Route path="/rules/vacation" element={<VacationRules />} />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

