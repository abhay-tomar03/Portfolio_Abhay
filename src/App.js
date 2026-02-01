import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <BackToTop />
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
