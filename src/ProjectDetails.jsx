import { useParams, Link } from 'react-router-dom';
import data from './data';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = data.find(project => project.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-details">
      <Link to="/" className="back-button">← Back to Projects</Link>
      <div className="project-header">
        <h1>{project.title}</h1>
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-project-button"
        >
          View Project
        </a>
      </div>
      <div className="project-content">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="project-image"
        />
        <div className="project-description">
          {project.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;