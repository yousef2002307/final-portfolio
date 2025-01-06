import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/images/Capture.png'; // Updated path to the image
import image2 from './assets/images/Capture2.png'; // Updated path to the image
import image3 from './assets/images/Capture4.png';
import image4 from './assets/images/5Capture.png';
import image5 from './assets/images/Capture6666.png';
import image6 from './assets/images/66Capture.png';
import image7 from './assets/images/44Capture.png';
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
      title: 'Food shooping and delivery (sharaqy)',
      description: `
       -Developed a web application for a food restaurant that 
helps users to view products ,  order them and add 
them to cart \n.  
-multilingual support , payment gateway integration(paymob),
 Admin dashboard that help owner of app to get statistics about orders and products, \n
 - to change products info to do CRUD operation on users , to view 
users order \n
 - Contact us Form.
      `,
      imageUrl: image2,
      url: 'https://sharqyeg.com/'
    },
    {
      id: 3,
      title: 'Heart clinic managment system',
      description: ` In this project, used PHP / Laravel, HTML/CSS, and vanilla 
JavaScript with Bootstrap. It provides services for  
patients, admins, doctors, and receptionists,provides live notifications betwwen admins and patients and provides live chat using websockets,includes 
online appointment scheduling, editing and providing  
information, searching and rating clinics, and other 
features 
 Created a responsive web application that allows users 
to book appointments , pay online , login and register 
and more great features`,
      imageUrl: image3,
      url: 'https://github.com/yousef2002307/cli-managment-final2.git'
    },
    {
      id: 4,
      title: 'Online Store(pearl store)',
      description: ` In this project, used PHP / Laravel to make the store, has full ecommerce features, includes admin dashboard, login and register,
      has online payment (using saded payment gateway in Qatar), cart , order, rating and faviourte functionality and nuch more.
      `,
      imageUrl: image4,
      url: 'https://pearl-store.net/'
    },
    {
      id: 5,
      title: 'Coffe shop(coffee point)',
      description: ` In this project, compress large product images using intervention image package in laravel,used PHP / Laravel to make the store, has full ecommerce (cart,order,rating,favourite) features, includes admin dashboard, login and register, much more.
      `,
      imageUrl: image5,
      url: 'https://pearl-store.net/'
    },
    {
      id: 6,
      title: 'School subject system using php',
      description: ` 
      This project i made using only php for the backend is about an advanced student results system where admin can assign student to subjects and add 
their results and student access their final results of exams
Technologies : php , Ajax, html, Css and bootstrap.
      
      `,
      imageUrl: image7,
      url: 'https://github.com/yousef2002307/subject-sysstem.git'
    },
    {
      id: 7,
      title: 'Chat app(Messenger clone)',
      description: `in this project used websockets and SSE(server side events) to make real time chat app using Laravel and jquery, includes chat system like messenger.`,
      imageUrl: image6,
      url: 'https://github.com/yousef2002307/chatApp-Using-Laravel.git'
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