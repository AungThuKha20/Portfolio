import FakeCursorWithTail from "./components/FollowCursorDrag"
import Header from "./components/header"
import About from "./pages/about"
import Home from "./pages/home"
import Projects from "./pages/projects"
import Skills from "./pages/skill"
import Contact from "./pages/contact"
import AnimatedBackground from "./components/animatedBackground"


const App = () => {
  return (
    <>
      <AnimatedBackground />
      <FakeCursorWithTail >
        <div className="  text-gray-50 w-full overflow-x-hidden">
          <Header />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </FakeCursorWithTail>
    </>
  )
}

export default App