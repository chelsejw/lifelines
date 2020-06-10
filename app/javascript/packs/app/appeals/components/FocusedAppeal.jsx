import React from 'react';

const FocusedAppeal = (props) => {

    return (
        <div>
            <h3>Needed: {props.data.species.name} donor needed to save {props.data.pet_name}!</h3>
            <img src={props.data.img_url} className="img-fluid"/>
            <p>{props.data.description}</p>
        </div>
    )
}

export default FocusedAppeal