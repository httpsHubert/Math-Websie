import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./essential-components/NavBar";
import AskAssistant from "./pages/AskAssistant";
import UnderstandEquation from "./pages/UnderstandEquation";
import TestKnowledge from "./pages/TestKnowledge";

function App() {
    return (
        <div className="h-full">
            <Router>
                <div className="w-full h-full flex flex-wrap flex-row font-[Poppins]">
                    <NavBar />
                    <div className="w-full p-6 h-full text-center">
                        <Routes>
                            <Route path="/" element={<UnderstandEquation />} />
                            <Route path="/pages/ask-assistant" element={<AskAssistant />} />
                            <Route path="/pages/understand-equation" element={<UnderstandEquation />} />
                            <Route path="/pages/test-knowledge" element={<TestKnowledge />} />
                            <Route path="*" element={<UnderstandEquation /> } />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
