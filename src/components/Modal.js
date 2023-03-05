import React from 'react';
import Form from '../form/Form';

class Modal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.onOff){
            const data = this.props.data[0]
            console.log(data)
            return(
                <div className="modal">
                    <Form regional={this.props.regional} matchData={data}></Form>
                    <button onClick={() => this.props.offFunction()}> FINISH EDIT </button>
                </div>
            )
        }
    }
}

export default Modal;