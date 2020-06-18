import React from "react";
import axios from "axios";
import ProjectTimer from "./ProjectTimer";

class ProjectItem extends React.Component {
  state = {
    activity: this.props.in_progress
  };

  getTime() {
    return new Date().toLocaleTimeString();
  }

  DisplayDuration(duration) {
    const hours = Math.floor(
      (duration / (60 * 60))
    );
    const minutes = Math.floor((duration % (60 * 60)) / (60));
    const seconds = Math.floor((duration % (60)));
    return hours + "h " + minutes + "m " + seconds + "s ";
  }

  onStartClick() {
    if (!this.state.activity) {
      axios
        .post(
          this.props.url + "/api/activities/",
          {
            project: this.props.id,
          },
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.setState({ activity: [response.data.id, response.data.start_time] });
          this.props.updateFunction();
        });
    }
  }

  onStopClick() {
    if (this.state.activity) {
      axios
        .patch(
          this.props.url + "/api/activities/" + this.state.activity[0] + "/",
          {},
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }
        )
        .then(this.setState({ activity: false }));
        this.props.updateFunction();
    }
  }

  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">
            <a>{this.DisplayDuration(this.props.time)}</a>
          </div>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
          <span className="right floated" style={{ marginTop: 20 }}>
            {this.props.tags.map((tag) => (
              <a className="ui horizontal label">{tag.name}</a>
            ))}
          </span>
        </div>

        {this.state.activity ? (
          <div className="extra content" style={{ backgroundColor: "papayawhip" }}>
            <center>
              <span style={{ margin: 20 }}>
                <ProjectTimer startTime={this.state.activity[1]}></ProjectTimer>
              </span>
              <button
                className="ui small red basic animated button"
                tabindex="0"
                onClick={(e) => this.onStopClick(e)}
              >
                <div className="visible content">
                  <i className="stop icon"></i>
                </div>
                <div className="hidden content">Stop</div>
              </button>
            </center>
          </div>
        ) : (
          <div className="extra content">
            <center>
              <button
                className="ui huge green animated button"
                tabindex="0"
                onClick={(e) => this.onStartClick(e)}
              >
                <div className="visible content">
                 <i className="play icon"></i>
                </div>
                <div className="hidden content">Start</div>
              </button>
            </center>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectItem;
