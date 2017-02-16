import React from 'react'
import Note from './Note'

export default React.createClass({
  getInitialState(){
    return {
      notes: [
        {
          title:"Get Initial State in React",
          url:"https://facebook.github.io/react/",
          note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    }
  },
  onSaveClick(e){
    e.preventDefault()
    this.setState({
      notes: this.state.notes.concat({
        title: this.refs.title.value,
        url: this.refs.url.value,
        note: this.refs.note.value
      })
    })
    this.refs.newGistForm.className = "hidden"
    this.refs.newGistButton.className = "new_gist_clear_button"
  },
  // Do I need a componentDidMount event here to handle geting the data to the list of notes?
  // Maybe get each by id?
  onAddNoteClick(e){
    this.refs.newGistForm.className = "gist_form"
    this.refs.newGistButton.className = "hidden"
  },

  render() {
    return (
      <section>
        <button
          className="hidden"
          onClick={this.onAddNoteClick}
          ref="newGistButton">
          +
        </button>
        <div
          className="gist_form"
          ref="newGistForm">

          <form
            onSubmit={this.onSaveClick}
            className="new_gist_wrapper">
            <p className="new_gist_title">New Gist</p>
            <select
              className="dropdown"
              name="tab">
              <option value="JavaScript">JavaScript</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
            </select>
            <button
              className="new_gist_button"
              type="reset">
              Clear</button>
            <button
              className="new_gist_button"
              onClick={ this.onSaveClick }
              type="submit">Save</button>
            <input
              className="new_gist_input"
              name="title"
              placeholder=" Title"
              type="text"
              ref="title" />
            <input
              className="new_gist_input"
              name="url"
              placeholder=" URL"
              type="text"
              ref="url" />
            <textarea
              className="new_gist_input"
              placeholder=" Make a note"
              type="text"
              rows="3"
              ref="note" />
          </form>
        </div>
        { this.state.notes.map( (note, i)=>{
        return <Note title={note.title}
                        url={note.url}
                        note={note.note}
                        key={i} />
      } ) }
      </section>

    )
  }
})
