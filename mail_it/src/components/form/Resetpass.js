import React, { useState } from 'react'
import "./Login.css"
import {useHistory,useParams} from 'react-router-dom'
import Loading from '../../Loading'

function Resetpass() {
    const[load,setLoad] = useState(false)
    const history = useHistory()
    const {token} = useParams()
    const [password,setPassword] = useState("")
    const [para,setPara] = useState("")
    
    
    const PostData2= (e)=>{
        e.preventDefault()
    }


    const PostData = (e)=>{
        e.preventDefault();
        setLoad(true)
        setPara("")
        fetch("/reset",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                token:token
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                setPara(data.error)
            }
            else{
                setPara(data.message)
                history.push('/login')
            }
           
        }).catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div>
            <div className="wrapper1">
                <form action="" onSubmit={load ? PostData2 : PostData} className="form1"  >
                    <div className="input-group input" >
                        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <label for='Password'>New Password</label>
                    </div>
                    
                    <div className="load" >
                    {load ? <Loading /> : <p id="element">{para}</p> }
                    <input type="submit" value='Reset Password'  className="submit-btn1"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Resetpass
