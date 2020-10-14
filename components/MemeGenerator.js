import React, { Component } from "react";
// import { randomcolor } from "randomcolor";
const randomcolor = require("random-color");
class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
      color: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const memeImg = Math.floor(Math.random() * this.state.allMemeImgs.length);
    this.setState({
      randomImg: this.state.allMemeImgs[memeImg].url,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({
          allMemeImgs: memes,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.randomImg !== this.state.randomImg) {
      const newColor = randomcolor();
      this.setState({ color: newColor.hexString() });
    }
  }

  render() {
    return (
      <div
        className="container"
        onSubmit={this.handleSubmit}
        style={{ backgroundColor: this.state.color }}
      >
        <h2>Wanna create your own meme?</h2>
        <form className="meme-form">
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            placeholder="Top Text"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="Bottom Text"
            onChange={this.handleChange}
            required
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
/**
 * We'll be using an API that provides a bunch of meme images.
 *
 * Your task:
 * make an API call to "https://api.imgflip.com/get_memes" and save the
 * data that comes back (`response.data.memes`) to a new state property
 * called `allMemeImgs`. (The data that comes back is an array)
 */
