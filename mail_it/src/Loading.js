import React from 'react'
import '../node_modules/spinkit/spinkit.min.css'
import './Loading.css'

function Loading() {
    return (
            <div className="sk-flow">
                <div className="sk-flow-dot"></div>
                <div className="sk-flow-dot"></div>
                <div className="sk-flow-dot"></div>
            </div>
    )
}

export default Loading
