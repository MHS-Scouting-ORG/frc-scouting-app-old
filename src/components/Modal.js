import React from 'react';
import Form from '../form/Form';

class Modal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let data = this.props.data[0]
        console.log(data)
        if(this.props.onOff){
            return(
                <div>
                    <Form regional={this.props.regional} matchData={data}></Form>
                    <button onClick={() => this.props.offFunction()}> FINISH EDIT </button>
                </div>
            )
        }
    }
}

export default Modal;