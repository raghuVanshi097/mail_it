import React,{useEffect,useState} from 'react'
import "./ProjectDetails.css"
import {Link,useParams,useHistory} from 'react-router-dom'
import Loading from '../../Loading'

function PorjectDetails() {
    const [details,setDetails] = useState([])
    const[pageload,setpageLoad]=useState(true)
    const {id} = useParams()
    const [title,setTitle] = useState("")
    useEffect(()=>{
        fetch('/myprojectdet',{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        }).then(res=>res.json())
        .then(result=>{
            setpageLoad(false)
            setDetails(result.details)
            setTitle(result.title)
        })
    },[])

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
                            <Loading/>
                        </div>
                        <Link to="/pop2" className="close">{'\u2A2F'}</Link>
                    </div>
                </div>
            </div> 
        )     
    } else {
    return (
        <div>
            <div className="wrap2">
                <div className="fo2">
                    <h2>{title}</h2>
                        {
                            details.map(item=>{
                                return(
                                    <div className="input-group input" >
                                        <p>To: {item.Email}</p>
                                        <p>Body: {item.Body}</p>
                                    </div>
                                )
                            })
                        }
                    <Link to="/pop2" className="close">{'\u2A2F'}</Link>
                </div>
            </div>
        </div>
    )}
}

export default PorjectDetails
