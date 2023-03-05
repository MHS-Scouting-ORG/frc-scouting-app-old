import React from 'react';
import Form from '../form/Form';

class Modal extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.data)
    }

    render(){
        //console.log("******** FROM MODAL *************");
        //console.log(this.props.data)
        if(this.props.onOff){
            return(
                <div>
                    <Form regional={this.props.regional} matchData={this.props.data}></Form>
                    <button onClick={() => this.props.offFunction()}></button>
                </div>
            )
        }
    }
}

export default Modal;