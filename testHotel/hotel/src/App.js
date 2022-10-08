import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import Habitaciones from './components/Habitaciones';
import Reservas from './components/Reservas';


function App() {


  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Habitaciones />} />
          <Route path="/reserva/:id" element={<Reservas />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
