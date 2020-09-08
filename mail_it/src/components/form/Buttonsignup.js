import React from 'react'
import './buttons.css'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-login-github';
import GithubButton from 'react-github-login-button'

function Buttonsignup() {

    function responseGoogle1(res){
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
                password:googleId
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                setPara(data.error)
            }
            else{
                console.log(data)
                history.push('/login')
            }
           
        }).catch(err=>{
            console.log(err)
        })
        
    }
    function responseGoogle2(res){
        console.log(res)}

    function responseFacebook (response){
            console.log(response);
    }
    return (
        <div>
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
                        icon="fa-facebook" 
                    />
                    <GitHubLogin className="gitbutton" clientId="2eddd09e861c89760705"
                        onSuccess={responseGoogle1}
                        onFailure={responseGoogle2}
                    ><GithubButton/></GitHubLogin>
        </div>
    )
}

export default Buttonsignup
