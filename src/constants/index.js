import {
  first,
  second,
  fullstack,
  java,
  cab,
  mangaPanel,
  mobile,
  hr,
  backend,
  creator,
  web,
  javascript,
  rtmnu,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  github,
 
  threejs,
  wiriya,
  anExpo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
   {
    id:"certification",
    title:"Certification"
  },
  {
    id: "contact",
    title: "Contact",
  },
 
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React  Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "MERN Stack Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
 
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "github",
    icon: github,
  },
  
 
];

const experiences = [
  {
    title: "Graduation",
    company_name: "BSC Computer Science from RTMNU University",
    icon: rtmnu,
    iconBg: "#fff",
    date: "May 2020 - May 2023",
    points: [
      "Learned programming languages like C, C++, & Java.",
"Studied data structures, algorithms, and database management systems",
"Understood computer organization and operating systems basics.",
"Worked on small coding projects and lab assignments.",
"Gained problem-solving and logical thinking skills through coding practice."
    ],
  },
  {
    title: "POST Graduation",
    company_name: "MCA from RTMNU University",
    icon: rtmnu,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Learned advanced programming languages like Java, Python, and C++.",
      "Studied Object-Oriented Programming (OOP) and design principles.",
      "Learned front-end technologies: HTML, CSS, JavaScript, React ",
      "Worked with databases like MySQL, MongoDB, and SQL Server.",
      "Studied arrays, linked lists, stacks, queues, trees, and graphs.",

    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "Wiriya Technology Pvt. Ltd",
    icon: wiriya,
    iconBg: "#383E56",
    date: "Jan 2025 - july 2025",
    points: [
      "Developed responsive interfaces using React.js and Laravel Blade, enhancing user experience across devices." ,
" Integrated RESTful APIs with frontend modules for dynamic and seamless data flow. ",
 "Implemented state management and reusable UI components in React for better maintainability. ",
 "Improved web application performance and optimized rendering speed by 25%. ",
" Collaborated with senior developers, contributing to testing, debugging, and version control (Git)."
    ],
  },
 
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Cab Booking System",
    description:
      "Web-based platform that allows users to search, book, and manage car  from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: cab,
    live_link:"",
    source_code_link: "https://github.com/SagarMule268/cabBooking_Service",
  },
  {
    name: "Hr Portal",
    description:
      "A web-based HR management system for employee onboarding, leave tracking, and payroll processing.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      
    ],
    image: hr,
    live_link :"https://human-resource-frontend-im8m.vercel.app/",
    source_code_link: "https://github.com/SagarMule268/humanResource_frontend",
  },
  {
    name: "Anime Explorer",
    description:
      "A website which allows users to search and explore various anime series and movies.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "JikenAPI",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: anExpo,
    live_link:"https://animeexpo.vercel.app/",
    source_code_link: "https://github.com/SagarMule268/anime-expo",
  },
  
  {
    name: "MangaPnel X",
    description:
      "A website which allows users to search and read various anime Manga series .",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mangadex Api",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: mangaPanel,
    live_link:"https://manga-panel-x.vercel.app/",
    source_code_link: "https://github.com/SagarMule268/anime-expo",
  },
];

const certification = [
  {
    name:"Build a strong MERN Foundation ",
    date:"7th January 2025",
    certification_code:"7374215",
    cert_image:first,
    authority:"Simplilearn"
  },
  {
    name:"Design a Dynamic Frontend with React ",
    date:"7th Jan 2025",
    certification_code:"7736726",
    cert_image:second,
    authority:"Simplilearn"
  },
  {
    name:"Full Stack Developer - MERN Stack",
    date:"29 April 2025",
    certification_code:"141374542",
    cert_image:fullstack,
    authority:"Simplilearn"
  },
  {
    name:"Java Certification Course",
    date:"28th Feb 2025",
    certification_code:"4194418",
    cert_image:java,
    authority:"Simplilearn"
  },

] ;


export { services, technologies, experiences, testimonials, projects ,certification };