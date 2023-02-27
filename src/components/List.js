import React from 'react';
import Checkbox from './Checkbox'

class List extends React.Component{
    constructor(props){
        super(props);
        this.addOnColumnSort = this.addOnColumnSort.bind(this);
        this.state = {
            list: []
        };
    }

    addOnColumnSort(bool, value, id){
        let checkboxState = Array.from(this.state.list);

        if (bool === true) {
            checkboxState[id] = value
        } else {
            checkboxState[id] = ""
        }
        this.setState({ list: checkboxState})
        this.props.setList(checkboxState);
    }

    render(){
        return(
            <div style={{fontSize: '18px'}}>
                <Checkbox value = "Grid Points" changeState={this.addOnColumnSort}></Checkbox>
                <Checkbox value = "Cone Points" changeState={this.addOnColumnSort}></Checkbox>
                <Checkbox value = "Accurate Cone Placement" changeState={this.addOnColumnSort}></Checkbox>
                <Checkbox value = "Cube Points" changeState={this.addOnColumnSort}></Checkbox>
                <Checkbox value = "Accurate Cube Placement" changeState={this.addOnColumnSort}></Checkbox>
                <Checkbox value = "Charge Station" changeState={this.addOnColumnSort}></Checkbox>
            </div>
        )
    }
}

export default List;