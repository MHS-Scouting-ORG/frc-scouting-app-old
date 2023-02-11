import React from "react";

function TextBox(props){
    return(
        <div>
            <p>{props.title}</p>
            <textarea onChange={props.commentState} row="4" cols='50'
                style={{
                    wordWarp: 'normal',
                }}
            />
        </div>
    )
}

export default TextBox;