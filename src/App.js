import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import BackToTop from "./components/BackToTop";
import AIChat from "./components/AIChat";
import { ThemeProvider } from "./context/ThemeContext";

// Set API base URL for AI features
if (!process.env.REACT_APP_API_BASE) {
  process.env.REACT_APP_API_BASE = 'http://localhost:5000';
}

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <BackToTop />
        <AIChat />
        <Home />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
