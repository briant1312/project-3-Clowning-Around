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
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(getUser())
  const [menuIconVisible, setMenuIconVisible] = useState(true)
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  function toggleMenu() {
    setMenuIconVisible(!menuIconVisible)
  }

  return (
    <main className="App">
      <div className="jumbotron">
      <h1 onClick={handleClick} className="display-4">
        <span style={{color: 'blue'}}>C</span>
        <span style={{color: 'red'}}>l</span>
        <span style={{color: 'green'}}>o</span>
        <span style={{color: 'yellow'}}>w</span>
        <span style={{color: 'violet'}}>n</span>
        <span style={{color: 'cyan'}}>i</span>
        <span style={{color: 'pink'}}>n</span>
        <span style={{color: 'purple'}}>g</span>
          &nbsp;
        <span style={{color: 'blue'}}>A</span>
        <span style={{color: 'red'}}>r</span>
        <span style={{color: 'green'}}>o</span>
        <span style={{color: 'yellow'}}>u</span>
        <span style={{color: 'violet'}}>n</span>
        <span style={{color: 'cyan'}}>d</span>
      </h1>
      </div>
      { user ?
        <>
          <div onClick={toggleMenu} className="menu-icon"><span className={menuIconVisible ? 'hamburger' : 'close'}></span></div>
          <div className={menuIconVisible ? "background-cover" : "background-cover visible"}></div>
          <SideBar setMenuIconVisible={setMenuIconVisible} visible={menuIconVisible} setUser={setUser} user={user}/>
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
