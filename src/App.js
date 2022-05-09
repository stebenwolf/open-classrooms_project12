import './styles/App.css';
import Header from './components/Header';
import Home from './components/Home';
import Profil from './components/Profil';
import Footer from './components/Footer';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Profil />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
