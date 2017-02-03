import React from 'react'

export default React.createClass({
  render() {
    return (
      <section className="gist_form">
        <p>New Gist</p>
        <form>
          <input
            className="gist_input"
            placeholder="Title"
            type="text">
          </input>
          <input
            className="gist_input"
            placeholder="URL"
            type="text">
          </input>
          <input
            className="gist_input"
            placeholder="Make a note"
            type="text">
          </input>
        </form>
      </section>
    )
  }
})
