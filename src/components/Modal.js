import React from 'react'

class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: true,
        }
    }

    render(){
        if(this.state.show){
            return (
                null
            )
        }
    }
}

export default Modal;