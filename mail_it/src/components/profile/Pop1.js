import React, { useState,useEffect } from 'react'
import './Pop1.css'
import {Link,useHistory} from 'react-router-dom'
import Loading from '../../Loading'

function Pop1() {
    const[title,setTitle] = useState("")
    const[body,setBody] = useState("")
    const[file,setFile] = useState("")
    const[url,setUrl] = useState("")
    const[para,setPara] = useState("")
    const[load,setLoad] = useState(false)
    const history=useHistory()
    useEffect(()=>{
        if(url){
            fetch("/create",{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:title,
                body:body,
                url:url
            })
            }).then(res=>res.json())
            .then(data=>{
            setLoad(false)
            if(data.error){
                setPara(data.error)
            }
            else{
                setPara(data.message)
                history.push('/profile')
            }
            }).catch(err=>{
            console.log(err)
            })
        }
    },[url])

    const PostData2= (e)=>{
        e.preventDefault()
    }
    
    const postDetails=(e)=>{
        e.preventDefault()
        setPara("")
        setLoad(true)
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","mail_it")
        data.append("cloud_name","raghu097")
        fetch("https://api.cloudinary.com/v1_1/raghu097/upload",{
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const history1 = useHistory()
    if(!JSON.parse(localStorage.getItem("user"))){
        history1.push('/login')
    }

    return (
        <div>
            <div className="wrap1">
                <form  action="" onSubmit={load ? PostData2 : postDetails} className="fo1">
                    <h2>Add New Project</h2>
                    <div className="input-group input" >
                        <input type='text' name='title' value={title} required onChange={(e)=>setTitle(e.target.value)}/>
                        <label htmlfor='Title'>Title</label>
                    </div>

                    <div className="input1" >
                        <label for="Body">Body</label>
                        <textarea name="Body" rows="9" cols="30" className="tet" value={body} required onChange={(e)=>setBody(e.target.value)}></textarea>
                    </div>

                    <div className="input-group input" >
                        <input type='file' name='File Upload' accept=".xlsx,.csv" required onChange={(e)=>setFile(e.target.files[0])}/>
                        <label for='File Upload'></label>
                    </div>

                    <div className="load">
                        {load ? <Loading /> : <p id="element">{para}</p> }
                        <input type="submit" value='Add Project'  className="submit1"  />
                    </div>
                    <Link to="/profile" className="close">{'\u2A2F'}</Link>
                </form>
            </div>
        </div>
    )
}

export default Pop1
