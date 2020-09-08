import React,{useEffect,useState} from 'react'
import './Pop2.css'
import {Link, useHistory} from 'react-router-dom'
import Loading from '../../Loading'
import DeleteIcon from '@material-ui/icons/Delete';

function Pop2() {
    const[pageload,setpageLoad]=useState(true)
    const[load,setLoad] = useState(false)
    const [myprojects,setProjects] = useState([])

    useEffect(()=>{
        fetch('/myproject',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setpageLoad(false)
            setProjects(result.myproject)
        })
    },[])

    function PostData2() {
        console.log("abe ruk ja")
    }

    function send(index){
        setLoad(true)
        document.getElementById(myprojects[index].file).innerHTML="Please Wait"
        document.getElementById(myprojects[index]._id).disabled=true
        fetch('/mail',{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:myprojects[index]._id,
                name:myprojects[index].belongTo.name,
                title:myprojects[index].title,
                body:myprojects[index].body,
                file:myprojects[index].file,
                Email:myprojects[index].belongTo.email
            })
        }).then(res=>res.json())
        .then(data=>{
            setLoad(false)
            document.getElementById(myprojects[index].file).innerHTML=""
            if(data.error){
                console.log(data)
                document.getElementById(myprojects[index]._id).value="failed"
            }
            else{
                document.getElementById(myprojects[index]._id).value="Successfully Sent"
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function del(index){
        fetch('/delete',{
            method:"post",
            headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt"),
               "Content-Type":"application/json"
           },
            body:JSON.stringify({
                id:myprojects[index]._id,
                })
        }).then(res=>res.json())
        .then(data=>{
            const newProject = myprojects.filter(item=>{
                return item._id !== data._id
            })
            setProjects(newProject)
    
        }).catch(err=>{
        console.log(err)
        })
    }

    const history1 = useHistory()
    if(!JSON.parse(localStorage.getItem("user"))){
            history1.push('/login')
    }

    if(pageload){
        return(
            <div>
                <div className="wrap2">
                    <div className="fo2">
                        <div className="load">
                            <Link to="/profile" className="close">{'\u2A2F'}</Link>
                            <h2>Your Projects</h2>
                            <Loading/>
                        </div>
                    </div>
                </div>
            </div> 
        )     
    } else {
    return (
        <div>
            <div className="wrap2">
                <div className="fo2">
                    <h2>Your Projects</h2>
                    <div className="box" id="#style-4">
                        {
                            myprojects.map(item=>{
                                var a = myprojects.indexOf(item)
                                var b = "/details/"+item._id
                                return(
                                    <div className="input-group input" >
                                        <div className="fir">
                                        <h3 className="titl">Title:  {item.title}</h3>
                                        <Link className="resci" to={b}>Project Preview</Link>
                                        </div>
                                        <div className="load1">
                                            <div id={item.file}></div>
                                            <input id={item._id} type="submit" 
                                            className="submit2" value={item.isSent?"Sent Successfully":"Send"} 
                                            style={{marginRight:"10px"}} disabled={item.isSent}  
                                            onClick={load ? ()=>PostData2() : ()=>send(a)}/>
                                            <DeleteIcon style={{cursor: "pointer"}} onClick={()=>del(a)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Link to="/profile" className="close">{'\u2A2F'}</Link>
                </div>
            </div>
        </div>
    
    )}
}

export default Pop2
