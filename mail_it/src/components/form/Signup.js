import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import Loading from '../../Loading'

import './Signup.css'
function Signup() {
    document.getElementsByClassName("kep-login-facebook metro").innertHTML=""
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [para,setPara] = useState("")
    const[load,setLoad] = useState(false)

    const PostData2= (e)=>{
        e.preventDefault()
    }

    const PostData = (e)=>{
        setLoad(true)
        setPara("")
        e.preventDefault();
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                type:"indirect"
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                setPara(data.error)
            }
            else{
                setPara(data.message)
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }

    function responseGoogle(res){
        setLoad(true)
        setPara("")
        console.log(res)
        const {name,email,googleId} = res.profileObj
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password:googleId,
                type:"direct"
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                setPara(data.error)
            }
            else{
                setPara("Success")
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                history.push('/profile')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    function responseFacebook (res){
        setLoad(true)
        setPara("")
        console.log(res);
        const {name,email,id} = res
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password:id,
                type:"direct"
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                setPara(data.error)
            }
            else{setPara("Success")
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            history.push('/profile')
            }
        }).catch(err=>{
                console.log(err)
        })
    }


    const history1 = useHistory()
    if(JSON.parse(localStorage.getItem("user"))){
        history1.push('/profile')
    }

    
    return (
        <div className="wrapper">
            <form action="" onSubmit={load ? PostData2 : PostData} className="form"  >
                <img src={require("../img/icons8-male-user-96.png")} alt=""/>
                <h2>Signup</h2>
                <div className="buttons1">
                    <GoogleLogin className="buttongoogle"
                        clientId="887725586976-puslgvk498pt9t41cnunca6s9h1poscq.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        appId="1246545492366729"
                        buttonText=""
                        callback={responseFacebook}
                        fields="name,email"
                        icon="fa-facebook" 
                    />
                </div>
                <div className="classic">
                    <p>Or Be Classical</p>
                </div>
                <div className="input-group input" >
                    <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)}   required/>
                    <label for='Full Name'>Full Name</label>
                </div>
                <div className="input-group input" >
                    <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <label for='Email'>Email</label>
                </div>
                <div className="input-group input" >
                    <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <label for='Password'>Password</label>
                </div>
                <div className="load">
                    {load ? <Loading /> : <p id="element">{para}</p> }
                    <input type="submit" value='Signup'  className="submit-btn1"/>
                </div>
            </form>
        </div>
    )
}

export default Signup