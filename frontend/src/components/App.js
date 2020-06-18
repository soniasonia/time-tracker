import React from 'react';
import LoginForm from './LoginForm';
import TagPage from './TagPage';
import ProjectPage from './ProjectPage/ProjectPage';
import LogoutPage from './LogoutPage';

const APP_URL = 'http://0.0.0.0:8000';


class App extends React.Component {

    state = {
        isLoggedIn: localStorage.getItem('token') ? true : false,
        page: ""
    }

    onLoginSuccessful = (token) => {
        localStorage.setItem('token', token);
        this.setState({isLoggedIn: true})
        this.setState({page: ""})
        console.log("Token obtained in App");
    }

    onLogoutSuccessful = () => {
        localStorage.removeItem('token');  
        console.log("Removed token in App");
        this.setState({isLoggedIn: false})  
    }

    onLogoutClick = () => {
        this.setState({ page: "logout"});
    }

    onTagsClick() {        
        this.setState({ page: "tags"});
      }

    onProjectsClick() {
        this.setState({ page: "projects"});
      }
      

    renderContent()
    {
        if (this.state.page === "tags")
        {
            return <TagPage url={APP_URL}/>        
        } 
        if (this.state.page === "projects")
        {
            return <ProjectPage url={APP_URL}/>   
        }
        if (this.state.page === "logout")
        {
            return <LogoutPage url={APP_URL} onSuccess={this.onLogoutSuccessful}/>   
        }
    }

    render () {
        if (this.state.isLoggedIn) 
        {
            return (
                <div><div class="ui menu">
                <a
                onClick={(e) => this.onTagsClick(e)}
                className="item"
                >Tags</a>
                <a
                onClick={(e) => this.onProjectsClick(e)}
                className="item"
                >Projects</a>
                <a
                onClick={(e) => this.onLogoutClick(e)}
                className="item"
                >Log out</a>
                </div>{this.renderContent()}</div>);           
        }
            return <div><LoginForm url={APP_URL} trigger={this.onLoginSuccessful}/>{this.renderContent()}</div>            
        }
    }

export default App;