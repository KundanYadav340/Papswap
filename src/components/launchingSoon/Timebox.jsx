import React from 'react';


const Timebox = (props) =>{
    return(
        <div id ="time-component">
            <div className='time-value'>
                <h2>{props.value}</h2>
            </div>
            <div className='time-unit'>
                {props.content}
            </div>
        </div>
    )
}

export default Timebox;