import image from './assets/images/Capture.png'; // Updated path to the image
import image2 from './assets/images/Capture2.png'; // Updated path to the image
import image3 from './assets/images/Capture4.png';
import image4 from './assets/images/5Capture.png';
import image5 from './assets/images/Capture6666.png';
import image6 from './assets/images/66Capture.png';
import image7 from './assets/images/44Capture.png';
import image8 from './assets/images/ccapture.png';
import image9 from './assets/images/apture.png';
import image11 from './assets/images/Cwapture.png';
import image12 from './assets/images/Capturesina.png';
import image13 from './assets/images/tvshow.png';
import image14 from './assets/images/Capture565.png';
import image15 from './assets/images/chatcap.png';
import image16 from './assets/images/hotel.png';
import image17 from './assets/images/cart.png';
import image18 from './assets/images/1.png';
import image19 from './assets/images/6.png';
import image20 from './assets/images/7.png';
import image21 from './assets/images/Capture777.png';
import image22 from './assets/images/capture99.png';
 const data = [
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
      id : 11,
      title : "university management system(elrwad ibnsina)",
      description : `-Developed a web application for private college(ibn 
sina),multi-user system (student,teacher, admin), 
- the student can take exams and their exam graded automatically on the site see his schedule and 
more, 
-the teacher can make exams with its questions and answers  and see stats 
about his subjects, 
-the admin can import and export pdf and excel files, publish exams and reject and accept questions  make exam schedule and add students or teachers. And more features.`,
imageUrl : image12,
url : "https://elrawad-ibn-sina.com/"
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
      id: 4445,
      title: 'Multivendor restaurant-ecommerce(Daw2ni)',
      description: ` 
      this project is multi-vendor site and has 3 differnet panels(for customers,resturants,admin) and i worked with the rest of team on the 3 of them,dealing with firebase in laravel and making crud operation on firebase database,added new features and fix different bugs , and secured the site agianst xss attacks
      `,
      imageUrl: image21,
      url: 'https://board.dw2ni.com/locate/'
    },
   
    {
      id: 5,
      title: 'Coffe shop(coffee point)',
      description: ` In this project, compress large product images using intervention image package in laravel,used PHP / Laravel to make the store, has full ecommerce (cart,order,rating,favourite) features, includes admin dashboard, login and register, much more.
      `,
      imageUrl: image5,
      url: 'https://coffeepointegy.com/'
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
      id: 20,
      title: 'not found agency(company website)',
      description: `in this project create appointment booking system using Laravel , includes appointment booking and show avaliable times and book in automatic way and send remonders emails when meeting date is close and send email with meeting link, and contact us form with pdf attachment, and admin dashboard to the entire website design,SEO optimization.`,
      imageUrl: image14,
      url: 'https://notfound-agency.com/'
    },
    {
      id: 4446,
      title: 'Driver app Dashboard using Laravel And Javascript(Noah)',
      description: ` 
     admin panel connects with firebase and do crud opertions on collections like plans and drivers and control content of pages like privacy policy and terms and conditions and so on.
      `,
      imageUrl: image22,
      url: 'https://admin.noah-iq.com/'
    },
    {
      id: 30,
      title: 'Chat app(Messenger clone) using php',
      description: `in this project   SSE(server side events) to make real time chat app using php, jquery and ajax, includes chat system like messenger,send and recieve messages and seen and un seen messages and delete messages.`,
      imageUrl: image15,
      url: 'https://github.com/yousef2002307/chatapp.git'
    },
    
    {
      id: 8,
      title: 'Advanced Ecommerce using Laravel (Rabeemall)',
      description: `integration with fawry pay and paymob and pay in installments with Vulu,Scout search,and polymorphic relation and SEO optimization and classic ecommerce features(cart,orders,etc).`,
      imageUrl: image8,
      url: 'https://rabeamall.com/'
    },
    {
      id: 7,
      title: 'Chat app(Messenger clone) using laravel',
      description: `in this project used websockets and SSE(server side events) to make real time chat app using Laravel and jquery, includes chat system like messenger.`,
      imageUrl: image6,
      url: 'https://github.com/yousef2002307/chatApp-Using-Laravel.git'
    },
    {
      id : 9,
      title : "quiz app",
      description : `I built a quiz app using Laravel. It includes user registration, login functionality, and an admin dashboard 
for managing quizzes and users.`,
imageUrl : image9,
url : "https://github.com/yousef2002307/laravel-project-quiz-app.git"
    },
    {
      id : 40,
      title : "hotel booking app admin dashboard using PHP",
      description : `i built aan admin dashboard for hotel booking app using php.`,
imageUrl : image16,
url : "https://github.com/yousef2002307/hotel-managment-php_project.git"
    },
    {
      id : 12,
      title : "weather app using php",
      description : `I built a weather app using PHP . , dealt with external api using php Guzzle, It allows users to search for current weather conditions and get detailed information about the weather in their area.`,
imageUrl : image11,
url : "https://github.com/yousef2002307/weatherAppWithPhp.git"
    },
    {
      id : 60,
      title : "shopping cart using php",
      description : `I built a shopping cart using php. It allows users to add products to their cart and checkout using paypal.`,
imageUrl : image17,
url : "https://github.com/yousef2002307/shopping-cart-.git"
    },
    {
      id : 61,
      title : "Personal website using Wordpress",
      description : `I built a personal website using Wordpress and Elementor and added some custom css and js. and needed plugins for the website.`,
imageUrl : image18,
url : "https://drive.google.com/drive/folders/1z6ln3vr18tRBxTsDLN_yCKaicgWTuhRJ?usp=drive_link"
    },
    {
      id : 62,
      title : "company website using Wordpress",
      description : `I built a company website using Wordpress and Elementor and added some custom css and js. and needed plugins for the website.`,
imageUrl : image19,
url : "https://drive.google.com/drive/u/1/folders/1PawaqpQfqktxZQ-D5HbYMCZkizeZzj8g"
    },
    {
      id : 63,
      title : "blog website using Wordpress",
      description : `I built a blog website using Wordpress and Gutenberg and Blocksy theme and custom taxonomies and added some custom css and js. and needed plugins for the website.`,
imageUrl : image20,
url : "https://drive.google.com/drive/folders/145A4OWyFzZ0HcbGxjoF9I_ynpw9TWwJw?usp=drive_link"
    },
    {
      id : 133,
      title : "tv show tracker app",
      description : `I built a tv show tracker app using venilla js , css and html. It allows users to search for tv shows and get detailed information about them.`,
imageUrl : image13,
url : "https://helpful-tarsier-91a5be.netlify.app/"
    },
    
    // Add more projects as needed
  ];

  export default data;