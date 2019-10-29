/* global gapi */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload....
        </p>
      </div>
    );
  }
}*/
class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const status = 'Next playerrrrrr: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class App extends React.Component {
  contructor(props) {
    //super(props)
    this.auth2
    this.userName
  this.userIdToken
  this.googleAuthObject
  this.gapi
    this.state = {
      isSignedIn: false,
    }
  }
  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, you're signed in </p>
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
        </div>
      )
    }
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>You are not signed in.</p>
          <div id="google-login-button" class="g-signin2" onclick={this.googleInit()}>login</div>
        </header>
      </div>
    );
  }
  googleInit() {
    gapi.load('auth2', () => { 
      this.auth2 = gapi.auth2.init({
        client_id: '968290368770-41286pviqm741nh77i2e7bcvc81p45qd.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      }).then((googleAuthObject) => {
        this.googleAuthObject = googleAuthObject
        let options = new gapi.auth2.SigninOptionsBuilder();
        options.setAppPackageName('com.web.mapap');
        options.setPrompt('select_account');
        options.setScope('profile').setScope('email');
        this.googleAuthObject.signIn(options)
        .then(googleUser => this.authenticateUser(googleUser))
      },
      (e)=>{ 
        console.log(e)
      })
      //this.attachSignin(document.getElementById('google-login-button'));
    });
  }
  authenticateUser(loggedInUser) {
    console.log(JSON.stringify(loggedInUser))
    this.userIdToken = loggedInUser.getAuthResponse().id_token;
    this.userName = loggedInUser.getBasicProfile().getName();
    // this.userService.authenticateUser(this.userIdToken).subscribe((_)=>{
    //   console.log(_)
    // })
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  onSignIn(googleUser) {
    console.log(JSON.stringify(googleUser))
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  onSuccess() {
    this.setState({
      isSignedIn: true
    })
  }
  /*componentDidMount() {
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '968290368770-41286pviqm741nh77i2e7bcvc81p45qd.apps.googleusercontent.com',
      })
      this.auth2.then((o) => {
        console.log(JSON.stringify(o))
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get(),
        });
      });
    })
    window.gapi.load('signin2', function () {
      // render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        onsuccess: this.onSuccess.bind(this),
      }
      gapi.signin2.render('loginButton', opts)
    })
  }*/
}

export default App;
