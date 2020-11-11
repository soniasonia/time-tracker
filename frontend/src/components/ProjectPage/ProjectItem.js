import React from "react";
import axios from "axios";
import ProjectTimer from "./ProjectTimer";
import ProjectDetailModal from "./ProjectDetailModal";

class ProjectItem extends React.Component {
  state = {
    activity: this.props.in_progress,
    detailInfo: false,
  };

  getTime() {
    return new Date().toLocaleTimeString();
  }

  DisplayDuration(duration) {
    const hours = Math.floor(duration / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);
    const seconds = Math.floor(duration % 60);
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
          this.setState({
            activity: [response.data.id, response.data.start_time],
          });
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

  async getDetail() {
    try {
      const response = await axios.get(
        this.props.url + "/api/projects/" + this.props.id + "/",
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200 && response.data) {
        this.setState({ detailInfo: response.data});
      }
    } catch (error) {
      console.log(error.toString()); //TODO: better error handling
    }
  }

  showOrHideDetails() {
    if (!this.state.detailInfo) {
      this.getDetail();
    }
    else {
      this.setState({detailInfo: false});
    }
    
  }



  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="header">{this.props.title}</div>

          <div className="meta" onClick={(e) => this.showOrHideDetails(e)}>{this.DisplayDuration(this.props.time)}</div>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
          <span className="right floated" style={{ marginTop: 20 }}>
            {this.props.tags.map((tag) => (
              <span key={tag.id} className="ui horizontal label">
                {tag.name}
              </span>
            ))}
          </span>
        </div>

        {this.state.activity ? (
          <div
            className="extra content"
            style={{ backgroundColor: "papayawhip" }}
          >
            <center>
              <span style={{ margin: 20 }}>
                <ProjectTimer startTime={this.state.activity[1]}></ProjectTimer>
              </span>
              <button
                className="ui small red basic animated button"
                tabIndex="0"
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
                tabIndex="0"
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

{this.state.detailInfo ? (

            <ProjectDetailModal
            show={true}
  //          onHide={() => this.state.setModalShow(false)} //TODO: Fukcja źle
            detailInfo={this.state.detailInfo}
            displayDuration={this.DisplayDuration}
          />
          ) : (null)}
      </div>
    );
  }
}

export default ProjectItem;
