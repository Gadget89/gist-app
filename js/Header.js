import React from 'react'
import Notes from './Notes'

// document.getElementById('app')
// console.log("This is logging notes", Notes);
// var user

export default React.createClass({

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
            <img className="nav__currentUserImage" src={this.props.picture} />
            <button className="nav__signIn"
                onClick={this.props.logInUser}
                data-js="nav__signIn"> Log In </button>
            <button className="nav__signOut--hide"
                onClick={this.props.signUserOut}
                data-js="nav__signOut"> Log Out</button>
          </div>
            <div>
              <p className="nav__currentUser">Welcome {this.props.currentName}</p>
            </div>
        </nav>
      </section>
    )
  }
})
