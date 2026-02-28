import reactCart from '../assets/projects/react-redux-cart.png'
import Connect_4 from '../assets/projects/Connect_4_In_Python.png'
import Anime from '../assets/projects/Anime-Search-React.png'
import WeatherApp from '../assets/projects/Weather_App_JS.png'
import Tick_Tack_Toe from '../assets/projects/Flutter_Tick_Tack_toe_Game.png'
import Github_Api from '../assets/projects/All-Github-Closed-Pull-Request.png'
import Drum_Kit from '../assets/projects/Drum_Kit.png'
import SneakHub from '../assets/projects/Sneaker-Hub.png'
export const data=[
     {
        id: 1,
        name: "SneakHub - E-Commerce Platform",
        image: SneakHub,
        github: "https://github.com/abhay-tomar03/Sneaker-Store",
        live: "https://sneaker-store-frontend-navy.vercel.app/",
        category: "Next Js",
        featured: true,
        description: `SneakHub is a comprehensive, full-stack e-commerce platform designed for sneaker enthusiasts. It delivers a seamless shopping experience with a focus on performance, security, and intelligent user engagement.\n\nKey Features:\n- Extensive product catalog with real-time discounts, ratings, and stock management\n- User authentication, profile management, and secure checkout with Razorpay integration\n- Cart, wishlist, and order history for personalized shopping\n- Limited time offers, promotional banners, and dynamic pricing\n- Fast shipping, easy 30-day returns, and robust customer support\n- Fully responsive, modern UI built with Tailwind CSS\n- Admin dashboard for product, order, and user management\n\nAI Capabilities:\n- Personalized product recommendations using collaborative filtering and user behavior analysis\n- AI-powered chatbot for instant customer support, order tracking, and FAQs\n- Visual search: users can upload sneaker images to find similar products using computer vision\n- Dynamic pricing engine that adjusts prices based on demand, inventory, and user engagement\n- Sentiment analysis on customer reviews to highlight top-rated products and flag issues\n\nTechnical Implementation:\n- Frontend: Next.js and React.js for SSR, fast navigation, and SEO optimization\n- Backend: Node.js with RESTful APIs, secure authentication, and scalable architecture\n- Payments: Razorpay API for secure, PCI-compliant transactions\n- Styling: Tailwind CSS for rapid, consistent UI development\n- AI/ML: Integrates with external AI services and custom models for recommendations and visual search\n- Deployment: Vercel for frontend, scalable cloud backend\n\nSneakHub stands out for its blend of modern design, robust e-commerce features, and smart AI-driven enhancements, making it a showcase project for both technical depth and user-centric innovation.`,
        techStack: ["Next.js", "React.js", "Tailwind CSS", "Razorpay API", "Node.js"],
    },
    {
        id:2,
        name:"React JS Cart",
        image:reactCart,
        github:"https://github.com/abhay-tomar03/React-Redux-Cart",
        live:"https://react-redux-cart09.netlify.app/",
        category: "React",
        description: "A fully functional e-commerce shopping cart built with React and Redux for state management. Features add/remove items, quantity updates, and real-time total calculation.",
        techStack: ["React.js", "Redux", "CSS", "JavaScript"],
    },
    {
        id:3,
        name:"Popular Anime ReactJs Application",
        image:Anime,
        github:"https://github.com/abhay-tomar03/Anime_Search_Info",
        live:"https://popular-anime-search.netlify.app/",
        category: "React",
        description: "An anime search and discovery app that fetches data from an external API. Users can search for popular anime, view details, ratings, and synopsis.",
        techStack: ["React.js", "REST API", "CSS", "JavaScript"],
    },
    {
        id:4,
        name:"Weather App",
        image:WeatherApp,
        github:"https://github.com/abhay-tomar03/Weather-App",
        live:"https://abhay-tomar03.github.io/Weather-App/",
        category: "JavaScript",
        description: "A real-time weather application that displays current weather conditions, temperature, humidity, and forecasts for any city using a weather API.",
        techStack: ["JavaScript", "HTML", "CSS", "Weather API"],
    },
    {
       id:5,
        name:"Connect 4 Game Python",
        image:Connect_4,
        github:"https://github.com/abhay-tomar03/Connect_4_Game_Python",
        live:null,
        category: "Python",
        description: "A classic Connect 4 board game built in Python with an interactive GUI. Supports two-player mode with win detection and board reset.",
        techStack: ["Python", "Pygame", "NumPy"],
    },
    {
        id:6,
        name:"Flutter Tick Tack Toe Game",
        image:Tick_Tack_Toe,
        github:"https://github.com/abhay-tomar03/FLutter-Tic-Tac-Toe-Game",
        live:null,
        category: "Flutter",
        description: "A cross-platform Tic Tac Toe game built with Flutter and Dart. Features clean UI, two-player gameplay, win/draw detection, and game reset.",
        techStack: ["Flutter", "Dart"],
    },
    {
       id:7,
        name:"Flutter Github Closed PR",
        image:Github_Api,
        github:"https://github.com/abhay-tomar03/-Pull-Request-GithubApi-App",
        live:null,
        category: "Flutter",
        description: "A Flutter app that fetches and displays all closed pull requests from a GitHub repository using the GitHub API. Features infinite scrolling and PR details.",
        techStack: ["Flutter", "Dart", "GitHub API"],
    },
    {
       id:8,
        name:"Drum Kit JS",
        image:Drum_Kit,
        github:"https://github.com/abhay-tomar03/drum-kit-website",
        live:"https://abhay-tomar03.github.io/drum-kit-website/",
        category: "JavaScript",
        description: "An interactive drum kit website where users can play drum sounds by clicking buttons or pressing keyboard keys. Features responsive design and audio playback.",
        techStack: ["JavaScript", "HTML", "CSS"],
    },
   
]

export const categories = ["All","Next Js","Express Js" ,"React", "JavaScript", "Python", "Flutter"];