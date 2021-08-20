import React from "react";
//import { getLatestComicData, getRandomComicData } from "./API";
import { getAPI } from "./API";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {getImg: null, maxNum: 0, searchNum: ""};
        this.getNewComic = this.getNewComic.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    async componentDidMount() {
        const image = await getAPI.get()
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
        console.log(image.num);
        this.setState({ getImg: image, maxNum: image.num });
    }

    async getNewComic(element) {
        element.preventDefault();
        if (isNaN(this.state.searchNum)) {
            console.warn("Request aborted! Please enter an integer!");
            alert("Request aborted! Please enter an integer!");
            return;
        }

        if (this.state.searchNum > this.state.maxNum) {
            console.warn("Request aborted! Number entered exceeds max number!");
            alert("Request aborted! Number entered exceeds max number!");
            return;
        }
        
        console.log(`Number entered: ${this.state.searchNum}`);
        const image = await getAPI.get(`?num=${this.state.searchNum}`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
        console.log(image.num);
        this.setState({ getImg: image});
    }

    onChange(element) {
        this.setState({searchNum: element.target.value});
    }

    render() {
        if (this.state.getImg == null) {
            return (
                <div>
                    <h1>Getting the latest comic...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <p>The latest comic published has the number: {this.state.maxNum}</p>
                    <form onSubmit={this.getNewComic}>
                        <label>
                            Please enter a number : 
                            <input type="text" placeholder="Enter a number" value={this.state.searchNum} onChange={this.onChange}></input>
                            <button type="submit" onClick={this.getNewComic}>Submit</button>
                        </label>
                        <p>Hint: You can enter nothing or 0 to fetch the latest comic.</p>
                    </form>
                    <div>
                        <h3>{this.state.getImg.num}: {this.state.getImg.title}</h3>
                        <img src={this.state.getImg.img} alt={this.state.getImg.alt}></img>
                        <p>Comic published on: {this.state.getImg.day}/{this.state.getImg.month}/{this.state.getImg.year}</p>
                    </div>
                </div>
            )
        }
    }
}

export default Body;
