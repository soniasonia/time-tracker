import React from 'react';
import axios from 'axios';


class LoginForm extends React.Component {

    state = {login: '', password: ''};


    onFormSubmit(event) {
        event.preventDefault();
        axios.post(this.props.url + '/api/user/login/', {
            username: this.state.login, 
            password: this.state.password
        }).then(response => {
            var token = response.data.token;            
            this.props.trigger(token);
            this.render();
        });
    }    

    render() {
        return (
            <div style={{margin: 10}}>
                <form onSubmit={(event) => this.onFormSubmit(event)} className="ui form">
                    <div className="field">
                        <label>Login</label>
                        <input 
                            type="text" 
                            value={this.state.login}
                            onChange={e => this.setState({login: e.target.value})}
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="ui button">Submit</button>                    
                </form>
            </div>
        );
    }
};

export default LoginForm;