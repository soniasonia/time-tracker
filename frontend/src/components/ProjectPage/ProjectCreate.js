import React from "react";
import axios from "axios";
import TagSelection from "./TagSelection";

class ProjectCreate extends React.Component {

state = { 
      projects: null, 
      tags: [],
      newProjectTitle: "", 
      newProjectDescription: "", 
      newProjectTags: [],
}

  ManageTag = (id) => {
    var tags = this.state.newProjectTags;
    if (tags.includes(id))
    {
      const index = tags.indexOf(id);
      if (index > -1) {
        tags.splice(index, 1);
      }
    }
    else
    {
      tags.push(id);
    }
    this.setState({newProjectTags: tags});
  }

  async GetTags() {
    const response = await axios.get(
      this.props.url + "/api/tags/", {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    console.log("Going to update...");
    this.setState({ tags: response.data });
    console.log("Tags loaded");
}

  componentDidMount() {
    this.GetTags();   
    console.log("Component did mount");       
}

  onFormSubmit(event) {
    event.preventDefault();
    axios.post(
      this.props.url + "/api/projects/", 
      {
        title: this.state.newProjectTitle,
        description: this.state.newProjectDescription,
        tags: this.state.newProjectTags, 
      }, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
    }).then(response => {
      this.setState({ newTag: "" });
      this.props.updateFunction();
    });
  }   

  render() {
    console.log("rendering...");
    console.log(this.state.tags);
    return (
      <div>
        <form onSubmit={(event) => this.onFormSubmit(event)} className="ui form">
          <div className="field">
              <label>Title</label>
              <input 
                  type="text" 
                  value={this.state.newTag}
                  onChange={e => this.setState({newProjectTitle: e.target.value})}
              />
          </div>
          <div className="field">
              <label>Description</label>
              <textarea 
                  rows="3"
                  value={this.state.newTag}
                  onChange={e => this.setState({newProjectDescription: e.target.value})}
              />
          </div>
          {this.state.tags ?
            (<div className="field">
                <label>Tags</label>                
                <TagSelection 
                  tags={this.state.tags} 
                  handleChange={this.ManageTag}/>
            </div>) : null}
          <button type="submit" className="ui button">Add new project</button>                    
      </form><br></br>
      </div>
    );
  }
}

export default ProjectCreate;
