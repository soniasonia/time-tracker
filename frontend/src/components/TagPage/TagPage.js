import React from "react";
import axios from "axios";
import TagList from "./TagList";

class TagPage extends React.Component {
  state = { tags: null, newTag: "" };

  async onTagsClick(event) {
    const response = await axios.get(
      this.props.url + "/api/tags/", {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    this.setState({ tags: response.data });
  }

  onFormSubmit(event) {
    event.preventDefault();
    axios.post(
      this.props.url + "/api/tags/", 
      {name: this.state.newTag}, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
    }).then(response => {
      this.setState({ newTag: "" });
    });
  }   

  render() {
    return (
      <div style={{ margin: 10 }}>
        <form onSubmit={(event) => this.onFormSubmit(event)} className="ui form">
          <div className="field">
              <label>Name</label>
              <input 
                  type="text" 
                  value={this.state.newTag}
                  onChange={e => this.setState({newTag: e.target.value})}
              />
          </div>
          <button type="submit" className="ui button">Add new tag</button>                    
      </form><br></br>
        <button
          onClick={(e) => this.onTagsClick(e)}
          type="submit"
          className="ui button"
        >
          Get tags
        </button>
        {this.state.tags ? (
          <div>
            <h3>Found {this.state.tags.length} tags.</h3>
            <TagList tags={this.state.tags} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default TagPage;
