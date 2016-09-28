import React, { Component }  from 'react';
import "./collapse.css";

class CollapseDiv extends Component{
    render(){
        return(
            <div className="collapseDiv">
                <i className="material-icons expand" onClick={this.props.onClickHelp}>help</i>
                <div className={this.props.textStatus+" help-text"}>
                    {this.props.children}
                </div>
            </div>
            )
    }
}

export default CollapseDiv;