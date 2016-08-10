import React from 'react';
import Square from './example-square';
import Checker from './checker';

export default React.createClass({
    componentDidMount() {
        this.state.initialCheckerPosition = this.state.checkerSquare;
        this.checkerAudio = this.refs.checkerAudio;
        this.errorAudio = this.refs.errorAudio;
        this.cycleAudio = this.refs.cycleAudio; 
    },

    getInitialState() {
        return {
            checkerSquare : this.getCheckerPosition(),
            cycleSquares : [],
            skipMove : false
        };
    },
    
    /**
     * Generate initial position for checker
     */
    getCheckerPosition(){
        return  Math.floor(Math.random()*this.props.size*2);
    },

    /**
     * Detects if the current square is part of a cycle
     * returns array of squares that are part of the cycle
     */
    detectCycle() {
        let moveList = [this.state.checkerSquare],
            move = {
                error:'',
                square: this.state.checkerSquare
            };

        while(!move.error)
        {
            let nextDirection = this.refs['square'+move.square].state.moveDirection,
                newMove = this.getMove(nextDirection, move.square);

            if(newMove.error){
                //no cycle if you go off the board
                return [];
            }

            // check if we've been to this square before
            for (let i = moveList.length; i >= 0; i--)
            {
                // found a repeat
                if (moveList[i] === newMove.square)
                {
                    return newMove.square === this.state.checkerSquare ?
                        moveList.slice(i,moveList.length) : [];
                }
            }

            // add to the list and continue
            moveList.push(newMove.square);
            move = newMove;
        }
    },
    
    /**
     * calculates the next move for the checker
     * will return an object that contains the next move or an error state if invalid
    */
    getMove(nextDirection, currentSquare) {
        let err = '',
            square = currentSquare;

        if (nextDirection === 0) {
            //up
            if (currentSquare < this.props.size) {
                //error state
                err = "up";
            }
            else {
                square -= this.props.size;
            }
        } else if (nextDirection === 1) {
            //right
            if ( (currentSquare + 1) % this.props.size == 0) {
                //error
                err = "right";
            }
            else {
                square++;
            }
        } else if (nextDirection === 2){
            //down
            if (currentSquare + this.props.size > this.props.size * this.props.size) {
                err = "down";
            }
            else {
                square += this.props.size;
            }
        }else if (nextDirection === 3){
            //left
            if (currentSquare % this.props.size == 0) {
                err = "left";
            }
            else {
                square--;
            }
        }

        return {
            error:err,
            square:square
        };
    },
    
    /** function that's run after the checker transition or animation has completed
     * this will alert the board to continue in game loop
     */
    checkerMoved(e) {
        this.state.skipMove = false;
        //animationEnd occurs on an error "shake" - stop game since there are no more moves
        if (e.type === "animationend") {
            this.props.stop();
        }
        this.setState(this.state);
    },
    
    // main update function for board
    // calculates next move, if the next square puts the checker in a cycle or invalid move
    updateBoardData() {
        let currentSquare = this.refs['square'+this.state.checkerSquare];
        this.state.cycleSquares = this.detectCycle();
        if (this.state.cycleSquares.length && !this.state.cycleAudioPlayed) {
            this.cycleAudio.play();
            this.state.cycleAudioPlayed = true;
        }
        let moveData = this.getMove(currentSquare.state.moveDirection, this.state.checkerSquare);
        this.state.checkerClassName = moveData.error;
        this.state.checkerSquare = moveData.square;
    },
    
    // reset board - clears cycle information and moves checker to initial position
    reset() {
        this.state.checkerSquare = this.state.initialCheckerPosition;
        this.state.cycleSquares = [];
        this.state.cycleAudioPlayed = false;
    },
    
    // main React render function
    render() {
        let size = (this.props.squareSize) * this.props.size + 1,
            style = {
                width: size,
                height: size,
                marginLeft:"auto",
                marginRight:"auto"
            };

        if (this.props.gameState == "stop") {
            this.state.skipMove = false;
            this.state.checkerClassName = "";
        }
        else if ( this.props.gameState === "play" && !this.state.skipMove ) {
            let previousSquare = this.state.checkerSquare;
            
            this.updateBoardData();
            let checkerHasMoved = this.state.checkerSquare != previousSquare;
            
            if (checkerHasMoved || this.state.checkerClassName !== "") {
                // wait until movement is completed to rerender
                this.state.skipMove = true;
            }
            
            checkerHasMoved ? this.checkerAudio.play() : this.errorAudio.play();
        }
        else if (this.props.gameState === "reset"){
            this.reset();
        }
        else if (this.props.gameState ==="new" ) {
            this.reset();
            this.state.initialCheckerPosition = this.getCheckerPosition();
        }

        let checkerStyle = {
            left:((80 * (this.state.checkerSquare%this.props.size))) + "px",
            top: ((80 * Math.floor(this.state.checkerSquare/this.props.size))) + "px"
        };

        //create a new array of squares
        let squares = [];
        let key = 0;
        let isEven = this.props.size % 2 === 0;
        for(let i = 0; i < this.props.size; i++) {
            let invert = isEven && (i % 2 === 0);
            for(let j = 0; j < this.props.size; j++) {
                let className = this.state.cycleSquares.indexOf(key) !== -1 ? 'cycle' : '',
                    color = invert ^ (key % 2) === 0 ? 'dark' : 'light';
                squares.push(<Square key={key} ref={'square'+key} size={this.props.squareSize} color={color} gameState = {this.props.gameState} className={className} />);
                key++;
            }
        }
        
        return <div className="cube">
            <div className="front face"></div>
            <div className="side face"></div>
            <div className="grid face" style={style}>
                {squares}
                <Checker style={checkerStyle} className = {this.state.checkerClassName} transitionEnd={this.checkerMoved} />
                <audio src="ogg/checker.ogg" ref="checkerAudio">
                    <p>Your browser does not support the <code>audio</code> element </p>
                </audio>
                <audio src="ogg/error.ogg" ref="errorAudio">
                    <p>Your browser does not support the <code>audio</code> element </p>
                </audio>
                <audio src="ogg/cycle.ogg" ref="cycleAudio">
                    <p>Your browser does not support the <code>audio</code> element </p>
                </audio>
            </div>
        </div>;
    }
});