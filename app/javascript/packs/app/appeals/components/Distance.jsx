import React, { useEffect, useState } from 'react'


const Distance = (props) => {

    if (props.distance=="") {
        return <div></div>
    }

    return <div>{props.distance} away</div>
}

export default Distance

