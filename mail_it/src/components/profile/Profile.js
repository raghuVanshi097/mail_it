import React from 'react'
import {Link} from 'react-router-dom'
import './Profile.css'
import {useHistory} from 'react-router-dom'


function Profile() {
    const history1 = useHistory()
    if(!JSON.parse(localStorage.getItem("user"))){
        history1.push('/login')
        
    }
    const name = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).name  : ""
    return (
        <div>
            <div className="wrapperr">
                <div action="" className="for"  >
                    <h2>Hi!! {name} </h2>
                    <div className="input-group input" >
                        <h4>You have subscribed to Free plan</h4>
                    </div>
                    
                    <div className="input-group input" >
                        <h4>You have Unlimited mails remaining</h4>
                    </div>
                    <Link to='/pop1' style={{textDecoration:'none'}}><input type="submit" value='Add new Project'  className="submit-bt"/></Link>
                    <Link to='/pop2' style={{textDecoration:'none'}}><input type="submit" value='View Projects'  className="submit-bt"/></Link>
                </div>
            </div>
        </div>
    )}
        
   
    
    


export default Profile
