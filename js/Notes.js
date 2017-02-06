import React from 'react'

export default React.createClass({
  render() {
    return (
      <section className="gist_form">
        <p className="new_gist_title">New Gist</p>
        <button className="new_gist_save_button">Save</button>
        <button className="new_gist_clear_button">Clear</button>
        <form className="new_gist_wrapper">
          <input
            className="new_gist_input"
            placeholder="Title"
            type="text">
          </input>
          <input
            className="new_gist_input"
            placeholder="URL"
            type="text">
          </input>
          <input
            className="new_gist_input"
            placeholder="Make a note"
            type="text">
          </input>

        </form>
      </section>
    )
  }
})
