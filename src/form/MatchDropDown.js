import React from "react";

class MatchDropDown extends React.Component{
    constructor(props){
        super(props);
        this.changeMatchType = this.changeMatchType.bind(this);
        this.generateMatchTypeNum = this.generateMatchTypeNum.bind(this);
        this.state ={
            matchType: ' ',
        };
    }
    
    changeMatchType(event){
        let matchType = event.target.value;
        if( matchType === 'Qualification' ){
            this.props.setMatchType('qm');
            this.setState({matchType: 'qm'});
        } else if(matchType === 'QuarterFinal'){
            this.props.setMatchType('qf');
            this.setState({matchType: 'qf'});
        } else if(matchType === 'SemiFinal'){
            this.props.setMatchType('sf');
            this.setState({matchType: 'sf'});
        } else if(matchType === 'Final'){
            this.props.setMatchType('f');
            this.setState({matchType: 'f'});
        }
    }

    generateMatchTypeNum(){
        return(
            this.props.generateMatchTypeNum(this.state.matchType)
        )
    }


    render(){
        return(
            <div>
                <select onChange={this.changeMatchType}>
                    <option>Select Option</option>
                    <option>Qualification</option>
                    <option>QuarterFinal</option>
                    <option>SemiFinal</option>
                    <option>Final</option>
                </select>
                {this.generateMatchTypeNum()}
            </div>
        )
    }
}

export default MatchDropDown;