import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../utils/API";
// import Animals from "../utils/zooAnimals.json";
import { CompositionPage } from "twilio/lib/rest/video/v1/composition";

class Status extends Component {
  // getStatus = () => {
  //   API.completedStatus().then(res => {
  //     // console.log(res.data);
  //   });
  // };

  state = {
    // name: res.data.animal_name
  }

  handleClick = (e) => {
    console.log("click");
  }

  render() {
    return (
      <div className="Site">
        <div className="Site-content">
          {/* Header */}
          <div className="App-header">
            <Header />
          </div>

          <div>
            <button onClick={this.handleClick}>CLICK ME</button>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    );
  }
}

export default Status;
