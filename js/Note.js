import React from 'react'
import Notes from './Notes'

export default React.createClass({
  render(){
    return (
      <article className="note_list">
        <button
          className="#"
          onClick={this.onListNoteClick}>
          <b> { this.props.title } </b>
        </button>
        <div
          className="hidden"
          ref="noteDetails">
          <p>
            { this.props.url }
          </p>
          <p>
            { this.props.note }
          </p>
        </div>
      </article>
    )
  }
})
