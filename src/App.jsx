import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/images/Capture.PNG'; // Updated path to the image
function App() {
  const projects = [
    {
      id: 1,
      title: 'learn hub(Mr.Omar)',
      description: `Developed an Api from start to finish using Laravel . 
 upload large videos to vimeo Api through Laravel, login 
, registration , forget password , verify email , and 
access tokens , student can see video of each lesson and take the exam associated with each lesson,Parent access to student rating and 
attendance and result on quiz using parent access 
token , Admin dashboard that all ow admin to make 
quiz , give rating and determine whether student 
attendant or not , and  other features. `,
      imageUrl: image,
      url: 'https://omarroshdy.com/'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Description of Project Two.',
      imageUrl: 'https://via.placeholder.com/150',
      url: 'https://example.com/project-two'
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Description of Project Three.',
      imageUrl: 'https://via.placeholder.com/150',
      url: 'https://example.com/project-three'
    },
    // Add more projects as needed
  ];

  return (
    <>
      <section className="projects">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="card" onClick={() => window.open(project.url, '_blank')}>
              <img src={project.imageUrl} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;