import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import AskAssistant from "./pages/AskAssistant";
import UnderstandEquation from "./pages/UnderstandEquation";
import TestKnowledge from "./pages/TestKnowledge";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <div className="w-full flex flex-wrap flex-row font-[Poppins]">
                <NavBar />
                <div className="w-full p-6 h-full text-center">
                    <Routes>
                        <Route path="/pages/home" element={<Home />} />
                        <Route path="/pages/ask-assistant" element={<AskAssistant />} />
                        <Route path="/pages/understand-equation" element={<UnderstandEquation />} />
                        <Route path="/pages/test-knowledge" element={<TestKnowledge />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
