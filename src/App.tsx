import FakeCursorWithTail from "./components/FollowCursorDrag"
import Header from "./components/header"
import { About } from "./pages/about"
import Home from "./pages/home"
import { Skills } from "./pages/skill"

const App = () => {
  return (
    <FakeCursorWithTail >
      <div className=" bg-gray-950 text-gray-50 w-full">
        <Header />
        <Home />
        <About />
        <Skills />
        <div className="h-[100vh]"></div>
      </div>
    </FakeCursorWithTail>
  )
}

export default App