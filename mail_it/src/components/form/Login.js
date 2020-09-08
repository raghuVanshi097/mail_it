import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import "./Login.css"
import FacebookLogin from 'react-facebook-login';
import Loading from '../../Loading'

function Login() {
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [email1,setEmail1] = useState("")
    const [password,setPassword] = useState("")
    const [para,setPara] = useState("")
    const [para1,setPara1] = useState("")
    const[load,setLoad] = useState(false)

    const PostData1 = (e)=>{
        setLoad(true)
        setPara1("")
        e.preventDefault();
        fetch("/forgot-pw",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email1
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                setPara1(data.error)
            }
            else{
                setPara1(data.message)
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData2= (e)=>{
        e.preventDefault()
    }
    
    const PostData = (e)=>{
        setLoad(true)
        setPara("")
        e.preventDefault();
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
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
        const {email,id} = res
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password:id
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

    function responseGoogle1(res){
        setLoad(true)
        setPara("")
        console.log(res)
        const {email,googleId} = res.profileObj
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password:googleId
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
    
    function responseGoogle2(res){
        console.log(res)}

    const history1 = useHistory()
    if(JSON.parse(localStorage.getItem("user"))){
        history1.push('/profile')
    }

    return (
       <div>
            <div className="wrapper1">
                <form action="" onSubmit={load ? PostData2 : PostData} className="form1"  >
                    <img src={require("../img/icons8-male-user-96.png")} alt=""/>
                    <h2>Login</h2>
                    <div className="buttons1">
                        <GoogleLogin className="buttongoogle"
                        clientId="887725586976-puslgvk498pt9t41cnunca6s9h1poscq.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={responseGoogle1}
                        onFailure={responseGoogle2}
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
                        <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <label for='Email'>Email</label>
                    </div>

                    <div className="input-group input" >
                        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <label for='Password'>Password</label>
                    </div>

                    <div className="load">
                        {load ? <Loading className="lo"/> : <p id="element">{para}</p> }
                        <input type="submit" value='Login'  className="submit-btn1"/>
                    </div>
                    <a href="#forgot-pw" className='forgot-pw'>Forgot Password</a>
                </form>
                <div id="forgot-pw">
                    <form action="" onSubmit={load ? PostData2 : PostData1} className="form1">
                        <a href="/login" className="close">{'\u2A2F'}</a>
                        <h2>Reset Password</h2>
                        <div className="input-group">
                            <input type="email" name="email" id="email" value={email1} onChange={(e)=>setEmail1(e.target.value)} required/>
                            <label for="email">Email</label>
                        </div>
                            
                        <div className="load">
                            {load ? <Loading /> : <p id="element">{para1}</p> }
                            <input type="submit" value="Submit" className="submit-btn1"/>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    )  
}

export default Login
