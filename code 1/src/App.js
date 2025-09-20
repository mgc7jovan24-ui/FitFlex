import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/About';
import HomeSearch from './components/HomeSearch';
import SearchResults from './pages/SearchResults';
import ExerciseDetails from './pages/ExerciseDetails';
import ExercisePage from './pages/Exercisepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/homeSearch" element={<HomeSearch />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
        <Route path="/exercisepage/:id" element={<ExercisePage />} />
        <Route path="/" element={<Hero />} />
        <Route path="/home-search" element={<HomeSearch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
