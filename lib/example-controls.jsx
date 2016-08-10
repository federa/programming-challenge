import React from 'react';
//this syntax is called obejct destructing.
import {Button, ButtonToolbar} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        let playEnabled = this.props.control.state.gameState === "play",
            stopEnabled = !playEnabled;
        
        return <ButtonToolbar className="controls">
            <Button bsStyle="primary" onClick={this.onNew}>New</Button>
            <Button bsStyle="primary" onClick={this.onSetSize}>Size...</Button>
            <Button bsStyle="warning" onClick={this.onReset}>Reset</Button>
            <Button bsStyle="success" onClick={this.onPlay} disabled={playEnabled} bsSize="large">Play</Button>
            <Button bsStyle="danger"  onClick={this.onStop} disabled={stopEnabled} bsSize="large">Stop</Button>
        </ButtonToolbar>
    },

    onPlay() {
        this.props.control.play();
    },

    onStop() {
        this.props.control.stop();
    },

    onReset() {
        this.props.control.reset();
    },

    onSetSize() {
        this.props.control.showModal();
    },
    onNew(){
        this.props.control.newBoard();
    }
});