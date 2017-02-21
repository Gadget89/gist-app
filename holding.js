//Header
import React from 'react'

export default React.createClass({
  getDefaultProps() {
    return {
      user: { authed: false }
    }
  },

  // getInitialState() {
  //   return {
  //     provider: () => {},
  //     user: {
  //       authed: false,
  //       name: "",
  //       email: "",
  //       picture: ""
  //     },
  //   }
  // },
  getInitialState() {
    return {
      provider: () => {},
      user: {
        authed: false,
        name: "",
        email: "",
        picture: ""
      },
    }
  },
  componentDidMount() {
//    this.setState({provider: new firebase.auth.GoogleAuthProvider()});

    // FIXME: Put onAuthStateChanged in Welcome.componentDidMount
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // Signed in successfully
        // FIXME: Don't do document.querySelector stuff :(
        var signOutButton =  document.querySelector("[data-js='nav__signOut']")
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
  })
  },


  logInUser() {
    let provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithRedirect(provider);
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
    firebase.database().ref("/Notes/" + this.props.user.name + "/").on("value",   function(allData) {


      var notes = allData.val()
      console.log(notes);
      this.setState({notes})
    })
  },

  signUserOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: {
          authed: false,
          currentName: "",
          picture: "",
          name: ""
        }
      })
    })
  },

render() {
    return(
      <section>
        <nav className="nav_bar">
          <div className="nav_logo_wrapper">
            <p className="nav_logo">
              <b>gistApp=</b>
            </p>
            <br></br>
            <p>
                "notes for coders"
            </p>
            <div>
          </div>
            <img className="nav__currentUserImage" src={this.state.picture} />
            <button className="nav__signIn"
                onClick={this.logInUser}
                data-js="nav__signIn"> Log In </button>
            <button className="nav__signOut--hide"
                onClick={this.signUserOut}
                data-js="nav__signOut"> Log Out</button>
          </div>
            <div>
              <p className="nav__currentUser">Welcome {this.state.currentName}</p>
            </div>
        </nav>
      </section>
    )
  }
})
// notes*******
