//all import statements must go at the top of the file.
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './example-board';
import Controls from './example-controls';
import {Button, Modal, FormControl} from 'react-bootstrap';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

let Main = React.createClass({
    getInitialState() {
        return {
            size: this.props.size,
            squareSize: this.props.squareSize,
            gameState : "stop",
            modalShown: false,
            promptSize: this.props.size
        };
    },
    componentDidMount(){
        this.tick();  
    },
    tick() {
        if (this.state.gameState !== "play") {
            this.state.gameState = "stop";
        }
        
        this.state.tick = Math.random();
        this.setState(this.state);
        requestAnimationFrame(this.tick);
    },
    render() {
        return <div id="main" className={this.state.gameState}>
            <div className="desk">
                <Controls control={this}/>
                <Board size={this.state.size} 
                       squareSize={this.state.squareSize} 
                       gameState={this.state.gameState} 
                       stop={this.stop}/>
            </div>
            <Modal show={this.state.modalShown} onHide={this.hideModal} bsSize="small">
                <Modal.Header>
                    <Modal.Title>Set number of rows:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body" style={{textAlign:"center"}}>
                        <FormControl bsSize="sm" type="text" value={this.state.promptSize} onChange={this.setSize}/>
                        <Button onClick={this.hideModal}>ok</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>;
    },
    
    showModal(){
        this.state.modalShown = true;
        this.setState(this.state);
    },
    
    hideModal(){
        this.state.modalShown = false;
        this.state.size = this.state.promptSize;
        this.setState(this.state);
    },
    
    validate(e){
        this.state.size = e.target.value;
    },
    
    play() {
        this.state.gameState = "play";
        this.setState(this.state);
    },

    stop(setState) {
        this.state.gameState = "stop";
        if (setState) {
            this.setState(this.state);
        }
    },

    reset() {
        this.state.gameState = "reset";
        this.setState(this.state);
    },
    newBoard() {
        //generate a new board
        this.state.gameState = "new";
        this.setState(this.state);
    },

    setSize(evt) {
        this.state.promptSize = parseInt(evt.target.value);

        this.setState(this.state);
    }
});

ReactDOM.render(<Main squareSize={80} size={5}/>, content, () => {
    console.log("Rendered!");
});
