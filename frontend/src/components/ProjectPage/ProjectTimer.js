import React from "react";

class ProjectTimer extends React.Component {
  state = {
    duration: "",
  };

  AddSecond() {
    const startTime = Date.parse(this.props.startTime);
    const offset = (new Date()).getTimezoneOffset() * 60 * 1000;   
    const now = new Date().getTime();
    const duration = now - (startTime - offset);
    const hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    return hours + "h " + minutes + "m " + seconds + "s ";
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ duration: this.AddSecond(this.props.startTime)});
    }, 1000);
   
  }

  render() {
    return <span>{this.state.duration}</span>;
  }
}

export default ProjectTimer;
