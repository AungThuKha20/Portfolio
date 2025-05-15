import AnimatedBackground from "./components/animatedBackground"
import FakeCursorWithTail from "./components/FollowCursorDrag"
import Header from "./components/header"
import { About } from "./pages/about"
import Home from "./pages/home"
import { Projects } from "./pages/projects"
import { Skills } from "./pages/skill"

const App = () => {
  return (
    <>
      <AnimatedBackground />
      <FakeCursorWithTail >
        <div className="  text-gray-50 w-full">
          <Header />
          <Home />
          <About />
          <Skills />
          <Projects />
        </div>
      </FakeCursorWithTail>
    </>
  )
}

export default App