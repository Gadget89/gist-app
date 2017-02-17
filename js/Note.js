import React from 'react'
import Notes from './Notes'

export default React.createClass({
  onClickNoteList(e){
    if (this.refs.noteDetails.className === "hidden"){
    this.refs.noteDetails.className = "note_list"
    }else{
    this.refs.noteDetails.className= "hidden"
    }
  },

  render(){
    return (
      <main>
        <article className="note_list_wrapper">
          <a
            href="#"
            onClick={this.onClickNoteList}>
            <b> { this.props.title } </b>
          </a>
          <section
            className="hidden"
            ref="noteDetails">
            <a
              href={ this.props.url }
              target="_blank">
              { this.props.url }
            </a>
            <p>
              { this.props.note }
            </p>
          </section>
        </article>

      </main>

    )
  }
})
