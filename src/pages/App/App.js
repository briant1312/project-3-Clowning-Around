import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service"
import HomePage from "../HomePage/HomePage";
import ShowPage from "../ShowPage/ShowPage"
import CreateForm from "../CreateForm/CreateForm";
import UpdateForm from "../UpdateForm/UpdateForm";
import SideBar from "../../components/SideBar/SideBar";

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      <div>
      <h1>Clowing Around</h1>
      </div>
      { user ?
        <>
          <SideBar setUser={setUser} user={user}/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/view/:postId" element={<ShowPage user={user}/>} />
            <Route path="/new/post" element={<CreateForm user={user} />} />
            <Route path="/update/:postId" element={<UpdateForm user={user} />} />
          </Routes>
        </> 
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;
