import React, { Component } from "react";
import bar from "../../images/cageBars.png";
import { Link } from 'react-router-dom';
import './index.css';

export class AnimalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barsVisible: props.animal.split("").map(e => true),
      name: props.animal.split("").map(e => "_ "),
      letters: [],
      incorrectLetters: [],
      targetPosition: 0,
      message: "Please help me out of this cage.",
      hint: "",
      isComplete: false,
      value: "",
      display: "none",
      // image style
      height: "175px",
      position: "relative",
      background: "linear-gradient( 160deg,rgb(140, 140, 140, 0.5) 15%,  rgb(80, 80, 80, 0.7))", 
      border: "4px solid #26c6c4 ",
      borderRadius: "15px",
      width: "300px",
      margin: "10px auto 0px"
    };
  }
  handleHintButton = event => {
    event.preventDefault();
    // Checks if the word is complete
    if (this.state.isComplete) {
      // if yes, then sets the state to the below
      this.setState({
        hint: "You did it! Nice Job!"
      });
    } else {
      // if no, then sets the state to the below
      this.setState({
        display: "block",
        hint:
          "Hint: " +
          '"' +
          this.props.animal[this.state.targetPosition].toUpperCase() +
          '"'
      });
    }
  };
  // Resets the game so that it can be replayed
  handleResetButton = event => {
    event.preventDefault();
    this.setState({
      barsVisible: this.props.animal.split("").map(e => true),
      name: this.props.animal.split("").map(e => "_ "),
      letters: [],
      guessLog: [],
      targetPosition: 0,
      message: "",
      hint: "",
      isComplete: false,
      value: "",
      border: "4px solid #F6E769",
      background: "linear-gradient( 160deg,rgb(140, 140, 140, 0.5) 15%,  rgb(80, 80, 80, 0.7))", 
      message: "Please help me out of this cage.",
      display: "none",
    });
  };
  // Captures the key pressed by the user
  onKeyUp = event => {
    // This makes sure that the letter entered is a letter and not something else. It takes in the key entered and only returns when a letter is passed in.
    const isLetter = prop => {
      const alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      let letter;
      alphabet.forEach(e => {
        if (prop === e) {
          letter = prop;
        }
      });
      return letter;
    };
    const word = this.props.animal; // word to guess
    const name = [...this.state.name];
    const letters = [...this.state.letters]; // total letters guessed
    const guessLog = [this.state.guessLog]; // Incorrect guesses
    const barsVisible = [...this.state.barsVisible]; // For toggling the bar visablitiy
    const key = isLetter(event.key.toLowerCase()); //  Event that catches the key pressed by the user
    const hint = "";
    // Checks if the key pressed matches the appropriate letter in the word
    if (key === word[this.state.targetPosition]) {
      // If it matches
      // Toggles the bar's visability to invisible
      barsVisible[this.state.targetPosition] = false;
      // Changes the "_" to the key pressed by the user
      name[this.state.targetPosition] = key;
     this.setState({
       value: "",
       display: "none",
     })
      //  Checks to see if the word has been finished and sets the state for the message and is completed
      if (this.state.targetPosition === word.length - 1) {
        this.setState({
          message: "The " + this.props.animal + " is free, hurray!!!",
          isComplete: true,
          hint: "",
          border: "4px solid silver",
          background: "linear-gradient( 180deg, whitesmoke 2%, #26c6c4  75%, rgb(053, 148, 105) 15%,rgb(123, 218, 185)",
        });
      }
      //   Adds to the posistion accumulator so that the index position will change each time this function is run
      this.setState({
        targetPosition: this.state.targetPosition + 1,
        barsVisible,
        name,
        hint,
        guessLog: [],
      });
    } else {
      guessLog.push(key); // adds incorrect letters to the letters arr and updates the h tag
      letters.push(key); // Addes all letters typed to an array of letters
      this.setState({ letters, barsVisible, guessLog, value: this.key });
    }
  };

  componentDidMount() {
    document.addEventListener("keyup", this.onKeyUp);
    const barsVisible = this.state.barsVisible;
    this.setState({ barsVisible, background: "linear-gradient( 160deg, rgb(140, 140, 140, 0.5) 15%,  rgb(80, 80, 80, 0.7))", color: "#F6E769" });
  }

  render() {
    return (
      <div className="card" style={playerCardStyle}>
        <div>
          <p id="title-top">SPELL ME!!!</p>
        </div>


<div id="hint-modal">
  <p id="hint-style" style={{ 
    display: this.state.display,
     }}>{this.state.hint}</p>
 </div>
        <div style={{
            height: this.state.height,
            position: this.state.position,
            background: this.state.background,
            border: this.state.border,
            borderRadius: this.state.borderRadius,
            width: this.state.width,
            margin: this.state.margin,
        }}>
          <img
            src={"../images/" + this.props.animal + ".png"}
            alt="Animal"
            style={{ height: "100%" }}
          />
          {this.state.barsVisible.map((visible, index) => {
            return (
              <div
                style={{
                  width: 10,
                  height: 200,
                  position: "absolute",
                  top: 0,
                  opacity: visible ? 1 : 0,
                  left:
                    ((index + 0.5) * 280) /
                    (this.state.barsVisible.length || 0.00001)
                }}
              >
                <img src={bar} alt="Cage Bars" style={barStyle} />
              </div>
            );
          })}
          <h1 style={correctLetterStyles}>{this.state.name}</h1>

          <input className="guess-input" type="text" value={this.state.value}></input>

          <h3 style={messStyle}>{this.state.message}</h3>

          <button style={buttonStyle} onClick={this.handleHintButton}>
            Get A Hint
          </button>
          <button style={buttonStyle} onClick={this.handleResetButton}>
            Reset
          </button>

          <Link to="/progress"><button style={buttonStyle} >Back</button></Link>
        </div>
      </div>
    );
  }
}
// Page styles below
const barStyle = {
  width: "9px",
  height: "175px",
  position: "absolute",
  zIndex: "10"
};
const playerCardStyle = {
  position: "relative",
  textAlign: "center",
  border: "6px solid #7B5D94",
  margin: "auto",
  marginTop: "25px",
  width: "90%",
  backgroundColor: "#156369",
  borderRadius: "25px",
  height: "35em"
};
const correctLetterStyles = {
  color: "#F6E769",
  fontFamily: "American Typewriter",
  fontSize: "50px",
  paddingBottom: "10px",
  borderBottom: "3px solid #7B5D94",
  marginTop: "10px",
  marginBottom: "0px"
};
const buttonStyle = {
  background: "#7B5D94",
  fontSize: "15px",
  borderRadius: "10px",
  margin: ".3em",
  marginTop: ".3em",
  color: "white"
};
const messStyle = {
  color: "#50D737",
  fontFamily: "'Sawarabi Gothic', sans-serif",
  marginTop: ".3em",
  fontWeight: "100",
};


export default AnimalCard;
