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
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>

        <h2> Rules </h2>
        <p>
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        </div>
    )
}