import React from 'react'
import "./Form.css"
import styled from 'styled-components'



function Form({name, fgt, fields , url }) {
    



    const Div = styled.div`
    background:url(${url}) no-repeat center;
    background-size: cover;
    height:100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
    const fieldList=fields.map(field => {
        return(
            <div className="input-group" >
                    <input type={field.type} name={field.name} id={field.id} required/>
                    <label for={field.name}>{field.name}</label>
            </div>
        )
    })
    
    return (
        <div>
            <Div>
                <form action="" className="form"  >
                    <img src={require("../img/icons8-male-user-96.png")} alt=""/>
                    <h2>{name}</h2>
                    { fieldList }
                    <div className={`input-group ${!fgt && "open1"}`}>
                        <input type="file" name="image" id=""/>
                        <label for="User Image">User Image</label>
                    </div>
                    <input type="submit" value={name} className="submit-btn1"/>
                    <a href="#forgot-pw" className={`forgot-pw ${fgt && "open1"}`}>Forgot Password</a>
                </form>

                <div id="forgot-pw">
                    <form action="" className="form">
                        <a href="/login" className="close">{'\u2A2F'}</a>
                        <h2>Reset Password</h2>
                        <div className="input-group">
                            <input type="email" name="email" id="email" required/>
                            <label for="email">Email</label>
                        </div>
                        <input type="submit" value="Submit" className="submit-btn"/>
                    </form>
                </div>
            </Div>
        </div>       
    )
}

export default Form
