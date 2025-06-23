import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import resume from './assets/images/full stack20254.pdf'; // Make sure to add your resume file here
import coverletter from './assets/images/coverletter.pdf';
import data from './data';
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  const projects = data

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <>
  
<section className="about-me">
  <p>
    I am a Backend  web developer with over 1.5 year of experience and a computer science graduate. 
    I have completed more than 60 projects in web development, including over +13 live projects for actual clients 
    during my work experience, from start to finish.
  </p>
  <button 
    className="resume-button"
    onClick={() => window.open(resume, '_blank')}
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
            <div key={project.id} className="card" onClick={() => window.open(project.url, '_blank')}>
              <img src={project.imageUrl} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
  );
}

export default App;