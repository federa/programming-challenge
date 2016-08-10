import React from 'react';

//this exports a reference to a React class as the default export
export default React.createClass({
    render() {
        let cName = "checker ";
        cName += this.props.className !== "" ? ("error-" + this.props.className) : '';

        let checkers = [];
        for (let i = 0; i < 6; i++) {
            let transform = {
                transform:'translate3d(0,0,'+i+ 'px)'
            };
            checkers.push(<div className='stack' style={transform} key={i}>
                        <span className="glyphicon glyphicon-tower" />
                </div>);
        }

        return <div className={cName} 
            style={this.props.style}
            ref="checker"
            onTransitionEnd={this.props.transitionEnd} 
            onAnimationEnd={this.props.transitionEnd}>
                {checkers}
            </div>;
    }
});