import React from "react";
import LoginForm from "./Auth/LoginForm";
import CreateUserForm from "./Auth/CreateUserForm";
import TagPage from "./TagPage/TagPage";
import ProjectPage from "./ProjectPage/ProjectPage";
import LogoutPage from "./Auth/LogoutPage";
import NavBar from "./NavBar";
import axios from "axios";

const APP_URL = "http://0.0.0.0:8000";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    page: "",
    username: "",
    error: null,
  };

  componentDidMount = () => {
    const isToken = localStorage.getItem("token") ? true : false;
    if (isToken) {
      this.verifyToken();
    }
  };

  async verifyToken() {
    try {
      const response = await axios.get(APP_URL + "/api/user/me/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      if (response.data && response.data.username && response.status === 200) {
        this.setState({ isLoggedIn: true, username: response.data.username });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  onLoginSuccessful = (token) => {
    localStorage.setItem("token", token);
    this.setState({ isLoggedIn: true });
    this.setState({ page: "" });
    console.log("Token obtained in App");
  };

  onLogoutSuccessful = () => {
    localStorage.removeItem("token");
    console.log("Removed token in App");
    this.setState({ isLoggedIn: false });
  };

  loadTags = () => {
    this.setState({ page: "tags" });
  };

  loadProjects = () => {
    this.setState({ page: "projects" });
  };

  loadLogout = () => {
    this.setState({ page: "logout" });
  };

  renderContent() {
    if (this.state.page === "tags") {
      return <TagPage url={APP_URL} />;
    }
    if (this.state.page === "projects") {
      return <ProjectPage url={APP_URL} />;
    }
    if (this.state.page === "logout") {
      return <LogoutPage url={APP_URL} onSuccess={this.onLogoutSuccessful} />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <img
          style={{
            backgroundImage: `url("http://localhost:3000/images/pexels-photo-295771.jpeg")`,
            backgroundSize: "cover",
            position: "fixed",
            top: "0",
            left: "0",
            minWidth: "100%",
            minHeight: "100%",
          }}
          alt=""
        />

        {this.state.isLoggedIn ? (
          <div
            style={{
              width: "100%",
              position: "relative",
            }}
          >
            <NavBar
              loadLogout={this.loadLogout}
              loadTags={this.loadTags}
              loadProjects={this.loadProjects}
              username={this.state.username}
            ></NavBar>
            {this.renderContent()}
          </div>
        ) : (
          <div
            style={{
              width: "675px",
              position: "relative",
              margin: "0 auto",
              paddingTop: "15%",
            }}
          >
            <div className="ui placeholder segment">
              <div className="ui two column very relaxed stackable grid">
                <div className="column">
                  <h3>Login</h3>
                  <LoginForm url={APP_URL} trigger={this.onLoginSuccessful} />
                </div>
                <div className="column">
                  <h3>Create new user</h3>
                  <CreateUserForm url={APP_URL} />
                </div>
              </div>
              <div className="ui vertical divider">Or</div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;