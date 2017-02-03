import React from 'react'
import ReactFire from 'reactfire'
import Header from './Header'
import Footer from './Footer'
import Notes from './Notes'


export default React.createClass({
  render() {
    return (
      <section>
        <Header/>
        {this.props.children && React.cloneElement(this.props.children,
        { user: this.state.user })}
        <Notes/>
        <Footer />
      </section>
    )
  }
})
