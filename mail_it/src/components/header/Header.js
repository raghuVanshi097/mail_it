import React, { useState, useEffect} from 'react';
import "./Header.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from 'react-router-dom';

function Header() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
    
    function click1(){
        setUser(null)
        localStorage.clear()
    }
    
    const renderList =()=>{
        if(user){
            return [
                <li><Link to="/profile" className="abc">Profile</Link></li>,
                <li onClick={click1}><Link to="/" className="abc">Log out</Link></li>
            ]
        }else{
            return [
                <li><Link to="/login" className="abc">Login</Link></li>,
                <li><Link to="/signin" className="abc">Signup</Link></li>
            ]
        }
    }

    function click(){
        const links=document.querySelector('.links');
        links.classList.toggle("open");
    }
    
    const [show,handleShow] = useState(false); 
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY>100)
                handleShow(true);
            else
                handleShow(false);
            });
    }, []);

    return (
        <nav className={`container ${show && "nav_white"}`}>
            <div className="title"><Link to="/" className="title" >Mail It!!</Link></div>
            <div className="hamburger" onClick={click}>
                <div className="Lines"></div>
                <div className="Lines"></div>
                <div className="Lines"></div>
            </div>

            <div className="buttons">
                <ul className="links">
                    <li><Link to="/" className="abc" ><FacebookIcon/></Link></li>
                    <li><Link to="/" className="abc"><TwitterIcon/></Link></li>
                    <li><Link to="/" className="abc"><InstagramIcon/></Link></li>
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Header
