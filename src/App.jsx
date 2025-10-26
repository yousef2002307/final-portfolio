import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ProjectDetails from './ProjectDetails';
import data from './data';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const projects = data;
  const navigate = useNavigate();

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleCardClick = (projectId, e) => {
    // Only navigate if the click wasn't on the View Details button
    if (!e.target.closest('.view-details-button')) {
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <section className="about-me">
              <p>
                I am a Backend web developer with over 1.5 years of experience and a computer science graduate. 
                I have completed more than 60 projects in web development, including over +13 live projects for actual clients 
                during my work experience, from start to finish.
              </p>
              {/* <button 
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
              </button> */}
            </section>
            <section className="projects">
              <h2>My Projects</h2>
              <div className="projects-grid">
                {currentProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="card"
                    onClick={(e) => handleCardClick(project.id, e)}
                  >
                    <div className="card-content">
                      <img src={project.imageUrl} alt={project.title} />
                      <h3>{project.title}</h3>
                      <p>{project.description.substring(0, 100)}...</p>
                      <Link 
                        to={`/project/${project.id}`} 
                        className="view-details-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details
                      </Link>
                      <button   className="view-details-button">
                        <a className='a' href={project.url} target="_blank" rel="noopener noreferrer">
                          view project
                        </a>
                      </button>
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
    </div>
  );
}

export default App;