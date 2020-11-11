import React from "react";
import axios from "axios";

const errorStyle = {
  backgroundColor: "#fff6f6",
  color: "#9f3a38",
  borderColor: "#e0b4b4",
};

class LoginForm extends React.Component {
  state = { login: "", password: "", errors: {} };

  async onFormSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
    });
    try {
      const response = await axios.post(this.props.url + "/api/user/login/", {
        username: this.state.login,
        password: this.state.password,
      });
      const token = response.data.token;
      this.props.trigger(token);
      this.render();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.status === 400
      ) {
        this.setState({ errors: error.response.data });
        return;
      }

      this.setState({
        errors: { unknown: error.toString() },
      });
    }
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <form
          onSubmit={(event) => this.onFormSubmit(event)}
          className="ui form"
        >
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={this.state.login}
              onChange={(e) => this.setState({ login: e.target.value })}
            />

            {this.state.errors.username ? (
              <div className="ui pointing basic label" style={errorStyle}>
                {this.state.errors.username}
              </div>
            ) : null}
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />

            {this.state.errors.password ? (
              <div className="ui pointing basic label" style={errorStyle}>
                {this.state.errors.password}
              </div>
            ) : null}
          </div>

          {this.state.errors.non_field_errors ? (
            <div className="ui negative message" style={errorStyle}>
              {this.state.errors.non_field_errors}
            </div>
          ) : null}

          {this.state.errors.unknown ? (
            <div className="ui negative message" style={errorStyle}>
              {this.state.errors.unknown}
            </div>
          ) : null}

          <button type="submit" className="ui button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;