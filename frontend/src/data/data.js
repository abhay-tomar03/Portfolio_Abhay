import reactCart from '../assets/projects/react-redux-cart.png'
import Connect_4 from '../assets/projects/Connect_4_In_Python.png'
import Anime from '../assets/projects/Anime-Search-React.png'
import WeatherApp from '../assets/projects/Weather_App_JS.png'
import Tick_Tack_Toe from '../assets/projects/Flutter_Tick_Tack_toe_Game.png'
import Github_Api from '../assets/projects/All-Github-Closed-Pull-Request.png'
import Drum_Kit from '../assets/projects/Drum_Kit.png'

export const data=[
    {
        id:1,
        name:"React JS Cart",
        image:reactCart,
        github:"https://github.com/abhay-tomar03/React-Redux-Cart",
        live:"https://react-redux-cart09.netlify.app/",
        category: "React",
        description: "A fully functional e-commerce shopping cart built with React and Redux for state management. Features add/remove items, quantity updates, and real-time total calculation.",
        techStack: ["React.js", "Redux", "CSS", "JavaScript"],
    },
    {
        id:2,
        name:"Popular Anime ReactJs Application",
        image:Anime,
        github:"https://github.com/abhay-tomar03/Anime_Search_Info",
        live:"https://popular-anime-search.netlify.app/",
        category: "React",
        description: "An anime search and discovery app that fetches data from an external API. Users can search for popular anime, view details, ratings, and synopsis.",
        techStack: ["React.js", "REST API", "CSS", "JavaScript"],
    },
    {
        id:3,
        name:"Weather App",
        image:WeatherApp,
        github:"https://github.com/abhay-tomar03/Weather-App",
        live:"https://abhay-tomar03.github.io/Weather-App/",
        category: "JavaScript",
        description: "A real-time weather application that displays current weather conditions, temperature, humidity, and forecasts for any city using a weather API.",
        techStack: ["JavaScript", "HTML", "CSS", "Weather API"],
    },
    {
       id:4,
        name:"Connect 4 Game Python",
        image:Connect_4,
        github:"https://github.com/abhay-tomar03/Connect_4_Game_Python",
        live:null,
        category: "Python",
        description: "A classic Connect 4 board game built in Python with an interactive GUI. Supports two-player mode with win detection and board reset.",
        techStack: ["Python", "Pygame", "NumPy"],
    },
    {
        id:5,
        name:"Flutter Tick Tack Toe Game",
        image:Tick_Tack_Toe,
        github:"https://github.com/abhay-tomar03/FLutter-Tic-Tac-Toe-Game",
        live:null,
        category: "Flutter",
        description: "A cross-platform Tic Tac Toe game built with Flutter and Dart. Features clean UI, two-player gameplay, win/draw detection, and game reset.",
        techStack: ["Flutter", "Dart"],
    },
    {
       id:6,
        name:"Flutter Github Closed PR",
        image:Github_Api,
        github:"https://github.com/abhay-tomar03/-Pull-Request-GithubApi-App",
        live:null,
        category: "Flutter",
        description: "A Flutter app that fetches and displays all closed pull requests from a GitHub repository using the GitHub API. Features infinite scrolling and PR details.",
        techStack: ["Flutter", "Dart", "GitHub API"],
    },
    {
       id:7,
        name:"Drum Kit JS",
        image:Drum_Kit,
        github:"https://github.com/abhay-tomar03/drum-kit-website",
        live:"https://abhay-tomar03.github.io/drum-kit-website/",
        category: "JavaScript",
        description: "An interactive drum kit website where users can play drum sounds by clicking buttons or pressing keyboard keys. Features responsive design and audio playback.",
        techStack: ["JavaScript", "HTML", "CSS"],
    },
]

export const categories = ["All", "React", "JavaScript", "Python", "Flutter"];