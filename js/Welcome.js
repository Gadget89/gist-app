import React from 'react'
import { Link } from 'react-router'
import ReactFire from 'reactfire'


export default React.createClass({
  componentDidMount() {
    this.setState({provider: new firebase.auth.GoogleAuthProvider()});

    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // Signed in successfully
        var signOutButton = document.querySelector("[data-js='nav__signOut']")
        if (signOutButton.className == "nav__signOut--hide") {
          signOutButton.className = "nav__signOut";
        }
        var currentUser = {};

        currentUser["/users/" + user.uid] = {
          email: user.email,
          name: user.displayName,
          picture: user.photoURL
        }

        //FIXME: Don't do this until we get data back from DB
        this.setState({
          currentName: user.email,
          name: user.displayName,
          picture: user.photoURL
        })

    //  firebase.database().ref().update(currentUser)
    //  firebase.database().ref("/users/" + user.uid).once("value").then((snapshot) => {
    //    var snapshotReturn = snapshot.val()
    //     this.setState({
    //       currentName: snapshotReturn.email,
    //       name: user.displayName,
    //       picture: user.photoURL
    //     })
    //   })
    }
    else { // signed out or something went wrong
      var signOutButton = document.querySelector("[data-js='nav__signOut']")
      if(signOutButton.className == "nav__signOut"){
        signOutButton.className = "nav__signOut--hide"
      }
    }
  })
  },
  getInitialState() {
    return {
      provider: () => {},
      currentName: "please log in",
      name: "",
      picture: ""
    }
  },
  logInUser() {
    firebase.auth().signInWithRedirect(this.state.provider);
    firebase.auth().getRedirectResult().then((result) => {
      if(result.credential) {
        var token = result.credential.accessToken;
      }
      var user = result.user;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("ERROR authenticating with firebase: " + errorMessage);
      //FIXME: Better logging/error handling
    });
  },
  signUserOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        currentName: "",
        picture: "",
        name: ""
      })
    })
  },
render() {
    return(
      <section>
        <nav className="nav_bar">
          <p>Welcome {this.state.currentName}</p>
          <img className="nav__currentUserImage" src={this.state.picture} />

        <div>
          <button className="nav__signIn"
              onClick={this.logInUser}
              data-js="nav__signIn"> Log In </button>
          <button className="nav__signOut--hide"
              onClick={this.signUserOut}
              data-js="nav__signOut"> Log Out</button>
        </div>
        </nav>

      </section>
    )
  }
})
