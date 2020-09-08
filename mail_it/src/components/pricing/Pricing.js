import React from 'react';
import "./Pricing.css";

function Pricing({ id, tot, tag, price, mail, avil, rem, no }) {
    var name="";
    var abt="";
    if(id===1){
        name="item1";
        abt="abt";
    }
    else if(id===tot){
        name="itemlast";
        abt="abt";
    }   
    else{
        name="itemrest";
        abt="abt1";
    }
    
    return (
        <div className={name}>
            <h3>{tag}</h3>
            <div className="rupee">
                <h3>₹</h3>
                <h1>{price}</h1>
                <h2>/mo</h2>
            </div>
            
            <div className={abt}>
                <h3><b>{mail}</b> Mails per day</h3>
                <h3>Custom templates <b>{avil}</b></h3>
                <h3>Mail It logo <b>{rem}</b></h3>
                <h3><b>Mobile-friendly email designer</b></h3>
                <h3><b>{no}</b> send time optimization</h3>
            </div>
        </div>
    )
}

export default Pricing
