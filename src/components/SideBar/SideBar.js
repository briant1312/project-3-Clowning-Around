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
         🚗 Welcome, {user.name} 🚗
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

        <h2>🚧 Rules 🚧</h2>
        
        <ul className="rules">
            <li>Be respectful!</li>
            <br></br>
            <li>Clowning topics only!</li>
            <br></br>
            <li>Clowns are supposed to be funny, no scary stuff!</li>
        </ul>


        <h2>🤡 About 🤡</h2>
        <p>
            Welcome to Clowning Around, a community dedicated to all things clowning! Whether you're a professional clown, a hobbyist, or simply have a love for all things clown-related, this forum is the perfect place to share your passion with others.
        </p>
        <p>

            Our community is comprised of clowns of all ages and backgrounds, united by our love for the art of clowning. Here, you can connect with other like-minded individuals, share tips and tricks, and discuss everything from makeup and costumes to performance techniques and stage presence.
        </p>
        <p>

            We encourage open and respectful communication, and our moderators are always on hand to ensure that discussions remain friendly and constructive. So whether you're looking for advice on how to perfect your juggling routine or just want to share a funny story from your latest gig, you can feel confident that you're in a supportive and welcoming environment.
        </p>
        <p>
            In addition to our lively discussion forums, we also host regular events and challenges to help members hone their skills and connect with each other. From online workshops and virtual performances to in-person meetups and clown conventions, there's always something exciting happening in our community.
        </p>
        <p>

            So if you're a clown, a clown enthusiast, or just curious about the world of clowning, come join us! We can't wait to meet you and share our love for all things clown-related.
        </p>
        </div>
    )
}