import React from 'react';
import ReactDOM from 'react-dom';

//this exports a reference to a React class as the default export
export default React.createClass({
    
    getInitialState() {
        let position = Math.floor(Math.random()*4);

        return {
            moveDirection:position,
            directionNames:["up","right","down","left"]
        };
    },

    render() {
        if(this.props.gameState === "new") {
            this.state = this.getInitialState();
        }

        let style = {
            width: this.props.size,
            height: this.props.size
        };        

        let squareClass = 
            "square " + 
            this.props.color + " " + 
            this.state.directionNames[this.state.moveDirection] + " " +
            this.props.className;

        return <div className={squareClass} ref='square' style={style} />
    }
});