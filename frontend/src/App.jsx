import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/home/HomePage"
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;