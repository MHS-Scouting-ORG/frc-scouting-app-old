import React from "react";

class TextBox extends React.Component{
    constructor(props){
        super(props)
        this.changeTextBox = this.changeTextBox.bind(this);
        this.state = {
            textBoxUsed: '',
        }
    }

    changeTextBox(event){
        this.props.textBoxUsed(event);
    }

    render(){
        <div>
            <p>{this.props.title}</p>
            <textarea onChange={this.changeTextBox}></textarea>
        </div>
    }
}

export default TextBox;