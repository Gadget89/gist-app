import React from 'react'
import ReactFire from 'reactfire'
import Header from './Header'
import Footer from './Footer'
import Notes from './Notes'


export default React.createClass({
  getInitialState() {
    return {
      provider: () => {},
      user: {
        authed: false,
        name: "",
        email: "",
        picture: ""
      },
      userDisplay: "x",
    }
  },

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
          user: {
            authed: true,
            currentName: user.email,
            name: user.displayName,
            picture: user.photoURL
          }
        })
        this.props.user
        var parent = this
        parent.setState({userDisplay:user.displayName})
        console.log("Logging user", user.displayName);
        console.log(parent.state.userDisplay);

      // promise for grabbing data from database
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
    this.readData()
  })

  },
  fbRead(fbUser){
  var comp = this
  firebase.database().ref("/Notes/" + fbUser).on("value", function(allData) {

    var notes = allData.val()
    comp.setState({notes})
    console.log(notes);
    console.log("data notes", comp.state.notes);
  })
},
  readData(){
    console.log(this.state.user.notes);
    console.log(this.state.userDisplay);
    var tempUser =  this.state.userDisplay
    var tempHold = tempUser.split(" ")
    console.log("user state", tempHold[0]);
    var fbUser = tempHold[0]

    this.fbRead(fbUser)
    console.log("data notes", this.state.user.notes);
      console.log("data notes", this.state.notes);
      console.log(this.state.user);
    this.setState(this.state.user)
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
      this.setState({user})
    });
    // var tempUser =  this.state.user.name
    // var tempHold = tempUser.split(" ")
    // console.log("user state", tempHold[0]);
    // var fbUser = tempHold[0]
    // firebase.database().ref("/Notes/" + fbUser).on("value", function(allData) {
    // // firebase.database().ref("/Notes/" + fbUser).on("value", function(allData) {
    //   var notes = allData.val()
    //   console.log("data notes", notes);
    //   this.setState({notes})
    // })
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
    return (
      <section>
        <Header user={this.state.user}
              logInUser={this.logInUser}
              signUserOut={this.signUserOut}/>
        {this.props.children && React.cloneElement(this.props.children,
                   { user: this.state.user })}
        <Notes user={this.state.user}
              notes={this.state.notes}/>
        <Footer />
      </section>
    )
  }
})
