import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProjectDetails from './ProjectDetails';
import data from './data';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const projects = data;

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <section className="about-me">
              <p>
                I am a Backend web developer with over 1.5 years of experience and a computer science graduate. 
                I have completed more than 60 projects in web development, including over +13 live projects for actual clients 
                during my work experience, from start to finish.
              </p>
              <button 
                className="resume-button"
                onClick={() => window.open('/resume.pdf', '_blank')}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                View CV
              </button>
            </section>
            <section className="projects">
              <h2>My Projects</h2>
              <div className="projects-grid">
                {currentProjects.map(project => (
                 <div key={project.id} className="card">
  <div className="card-content">
    <img src={project.imageUrl} alt={project.title} />
    <h3>{project.title}</h3>
    <p>{project.description.substring(0, 100)}...</p>
    <Link 
      to={`/project/${project.id}`} 
      className="view-details-button"
    >
      View Details
    </Link>
  </div>
</div>
                ))}
              </div>
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </section>
          </>
        } />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;