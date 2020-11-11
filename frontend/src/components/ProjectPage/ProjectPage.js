import React from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";

class ProjectPage extends React.Component {
  state = {
    projects: null,
    create: false,
    modalShow: true,
    setModalShow: false
  };

  async componentDidMount() {
    const projects = await this.GetProjects();
    const tags = await this.GetTags();
    this.setState({ projects: projects, tags: tags });
  }

  async GetProjects() {
    const response = await axios.get(this.props.url + "/api/projects/", {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    return response.data;
  }

  async GetTags() {
    const response = await axios.get(this.props.url + "/api/tags/", {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    return response.data;
  }

  UpdateProjects = async () => {
    const projects = await this.GetProjects();
    this.setState({ projects: projects });
  };

  onCreateButtonClick() {
    if (this.state.create) {
      this.setState({ create: false });
    } else {
      this.setState({ create: true });
    }
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div className="ui left labeled button" tabIndex="0">
            <div className="ui basic green right pointing label">
              {this.state.projects ? (
                <p>You have {this.state.projects.length} projects.</p>
              ) : null}
            </div>
            <button
              onClick={(e) => this.onCreateButtonClick(e)}
              type="submit"
              className="ui green button"
            >
              Create new project
            </button>
          </div>
        </div>
        <br></br>        
        {this.state.create ? (
          <ProjectCreate
            url={this.props.url}
            updateFunction={this.UpdateProjects}
          />
        ) : null}
        <br></br>
        {this.state.projects ? (
          <div>
            <ProjectList
              projects={this.state.projects}
              updateFunction={this.UpdateProjects}
              tags={this.state.tags}
              url={this.props.url}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProjectPage;
