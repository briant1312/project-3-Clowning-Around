import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service"
import HomePage from "../HomePage/HomePage";
import ShowPage from "../ShowPage/ShowPage"

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      { user ?
        <>
          <NavBar setUser={setUser} user={user}/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/view/:postId" element={<ShowPage />} />
          </Routes>
        </> 
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;
