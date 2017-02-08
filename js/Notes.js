import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
    note: {
        title:"",
        url:"",
        note:""
      }
    }
  },
  onNewNoteChange() {
    this.setState({
      note: {
        title: this.refs.noteTitle.value,
        url: this.refs.noteUrl.value,
        note: this.refs.noteText.value
      }
    })
  },
  onSaveClick(e){
    e.preventDefault();
    var newNoteTitle = this.state.note.title
    var newNoteUrl = this.state.note.url
    var newNoteText = this.state.note.note
    this.refs.noteList.insertAdjacentHTML("afterbegin", `<ol><li>${newNoteTitle}</li><ol>`)
    this.refs.noteList2.insertAdjacentHTML("afterbegin",`<ol><li>${newNoteUrl}</li><li>${newNoteText}</li><ol>`)
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
          <p className="new_gist_title">New Gist</p>
          <button
            className="new_gist_save_button"
            onClick={ this.onSaveClick }
            type="submit">Save</button>
          <button className="new_gist_clear_button">Clear</button>
          <form onChange={this.onNewNoteChange} className="new_gist_wrapper">
            <input
              className="new_gist_input"
              placeholder="Title"
              type="text"
              ref="noteTitle">
            </input>
            <input
              className="new_gist_input"
              placeholder="URL"
              type="text"
              ref="noteUrl">
            </input>
            <input
              className="new_gist_input"
              placeholder="Make a note"
              type="text"
              ref="noteText">
            </input>
          </form>
        </div>
        <section>
          <div
            className="gist_form"
            ref="noteList">
          </div>
          <div
            className="gist_form"
            ref="noteList2">
          </div>
        </section>
      </section>
    )
  }
})
