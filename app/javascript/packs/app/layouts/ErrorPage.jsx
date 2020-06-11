import React from 'react'


const ErrorPage = (props)=> {
    return <div className="container pt-5 text-center">
        <h4>{props.message}</h4>
    </div>
}

export default ErrorPage