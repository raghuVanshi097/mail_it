import React,{ useState } from 'react'
import "./Login.css"
import {useHistory,useParams} from 'react-router-dom'
import Loading from '../../Loading'

function Verify() {
    const[load,setLoad] = useState(false)
    const history = useHistory()
    const {token} = useParams()

    const PostData2= (e)=>{
        e.preventDefault()
    }

    const PostData = (e)=>{
        setLoad(true)
        e.preventDefault();
        fetch("/verify-email",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:token
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            if(data.error){
                console.log(data.error)
            }
            else{
                history.push('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="wrapper1">
                <form action="" onSubmit={load ? PostData2 : PostData} className="form85"  >
                    <div className="load" >
                        {load ? <Loading /> : <p></p> }
                        <input type="submit" value='Click To Verify'  className="submit-btn2"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Verify
