import React from 'react';
import axios from 'axios';


class LogoutPage extends React.Component{

    state = {success: false}
  
    componentDidMount() {

        axios.get(this.props.url + '/api/user/logout/', {
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          })
        .then(response => {
            console.log(response);
            this.props.onSuccess();
            this.setState({success: true})
        });
    }

    render () {
        if (this.state.success)
        {
            return <div><h4>You have been logged out</h4></div>
        }
        return <div><h4>Something went wrong...</h4></div>

    }
}

export default LogoutPage;