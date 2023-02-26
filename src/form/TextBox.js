import React from "react";

function TextBox(props){
    return(
        <div>
            <p>{props.title}</p>
            <p style={{fontSize: 16}}>{props.subtitle}</p>
            <textarea onChange={props.commentState} row="4" cols='50'
                style={{
                    wordWarp: 'normal',
                }} value={props.value}
            />
        </div>
    )
}

export default TextBox;