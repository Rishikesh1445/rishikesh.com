import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import RPlace from './pages/project/Rplace/Rplace';
import About from './pages/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/rplace" element={<RPlace />}/>
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;