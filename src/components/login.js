import React, {Component} from 'react';
import {withCookies} from 'react-cookie';

class Login extends Component {

    state = {
        credentials:{
            username: '',
            password: ''
        },

        isLoginView: true

    }

    inputChanged = (event) => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    login = (event) => {
        if(this.state.isLoginView){
            fetch(`http://127.0.0.1:8000/auth/`, {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'},
           body: JSON.stringify(this.state.credentials)
           }).then( resp => resp.json())
           .then( res => {
               console.log(res.token);
               this.props.cookies.set('mr-token' , res.token)
               window.location.href ="/movies";
           })

        }else {
            fetch(`http://127.0.0.1:8000/api/users/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(this.state.credentials)
           }).then( resp => resp.json())
           .then( res => {
               this.setState({ isLoginView : true})
           })
        }
    }

    toggleView = () => {
        this.setState({ isLoginView : !this.state.isLoginView});
    }

    render(){
        return (
        <div className= "login">
            <div className="login-container"> 
            <h1>
                {this.state.isLoginView ? 'Login' : 'Register'}
            </h1>
            <h1>Username</h1> <br/>
            <input type="text" name="username" value={this.state.credentials.username} 
                onChange={this.inputChanged}/><br/>
            <h1>Password</h1> <br/>
            <input type="password" name="password" value={this.state.credentials.password} 
                onChange={this.inputChanged}/><br/>
            
            <button onClick={this.login}> {this.state.isLoginView ? 'Login' : 'Register'}</button>
            <p onClick={this.toggleView}> 
            {this.state.isLoginView ? <h3>Create Acoount </h3> : <h3>back to login</h3>}
             </p>
        </div>
        </div>
        )
        

    }
}

export default withCookies(Login);