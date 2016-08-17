# To install
Run the following commands:
1. `npm install`
1. `npm sass` - this will compile and aggregate the css for the project 

# To run
1. `electron .`

# Gameplay

The commands on the board are as follows:
- New - Creates a new board of the same size with new arrows and checker position
- Size - Allows the board size to be customized
- Reset - Moves the checker back to its initial position and clears any cycle information
- Play - Starts moving the checker across the board according to the arrows on each square.  Play will automatically stop when the checker attempts to move off the board.
- Stop - Will halt the checker moving, but can continue by pressing play again.

When a cycle is detected, the squares that are part of the cycle will be tinted green, and an audio alert will be played.

# Notes
 


#Original Docs

## The Challenge

Consider a checkerboard of unknown size. On each square is an arrow that randomly points either up, down, 
left, or right. A checker is placed on a random square. Each turn the checker moves one square in the direction 
of the arrow. Visualize 1) an algorithm that determines if the checker moves off the edge of the board and 2) an algorithm that determines when the checker enters a cycle.

  - Include UI controls to play, stop, and reset the game.
  - Include UI controls to change the size of the board and to shuffle the arrows.
  - Include UI indicators for the checker 1) moving off the board and 2) entering a cycle
  - Include audio to make things more interesting.
  - Add some style to make it look good.
  
The skeleton project is set up to use a front end framework called [React](https://facebook.github.io/react/). React is pretty easy to learn, so definitely read the documentation. The skeleton project has one example of each important aspect of React. So please be sure to study the comments and the code.
The UI is setup using [react-bootstrap](http://react-bootstrap.github.io/components.html). React-bootstrap has
common UI elements such as buttons, and inputs so should help speed up development.

Using react and react-bootstrap isn't required, but it can really help speed development.

## Some important notes

Use the file extension `.jsx` for all your javascript files. The project is automagically setup to recognize that extension and transpile the JSX (used with React) and ES6 syntax to regular ES5 at runtime.

The entry point to the application is `index.html`, which in turn points immediately to `lib/main.jsx`. **Do not modify `index.html` or `main.js`**, which is just a bootstrap to get electron running.

Use whatever libraries you want from the npm public repository. Again you can find them [here](https://www.npmjs.com/) and install them with `npm install cool-lib-i-found --save`. However, for the purpose of this challenge, less is more so try to use the minimal set of node modules.

There is an optimal algorithm for determining when the checker is in a cycle. Feel free to google it.