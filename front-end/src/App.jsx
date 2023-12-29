import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./Add";
import Users from "./Users";
import Update from "./Update";
import './App.css'

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/" element={<Users />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
