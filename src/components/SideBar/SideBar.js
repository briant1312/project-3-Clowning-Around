import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"

export default function SideBar({user, setUser}) {
    function handleLogOut() {
        // we should delegate the actual loggin out to the users service
        userService.logOut()
        setUser(null)
    }
    return (
        <div className="side-bar">    
        <span>
            Welcome, {user.name}
        </span>
  
        <span>
            <Link to = '/'>Home</Link>
        </span>
    
        <span className="log-out">
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </span>

        <span>
            <Link to = '/new/post'>Create New Post</Link>
        </span>

        <h2> About</h2>
        <p>
            does this work
        </p>

        <h2> Rules </h2>
        <p>
            does this work
        </p>
        </div>
    )
}