import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"

export default function SideBar({user, setUser}) {
    function handleLogOut() {
        // we should delegate the actual loggin out to the users service
        userService.logOut()
        setUser(null)
    }
    return (
        <>
        <Link to = '/new/post'>Create New Post</Link>
        &nbsp;&nbsp;
        <Link to = '/'>Home</Link>
        &nbsp;&nbsp;
        <span>Welcome {user.name}</span>
            &nbsp;&nbsp;
        <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
    )
}