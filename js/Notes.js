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
    this.refs.noteList.insertAdjacentHTML("afterbegin", `<section><p>${newNoteTitle}</p><<section>`)
    this.refs.noteList.insertAdjacentHTML("afterbegin", `<section><p>${newNoteUrl}</p><<section>`)
    this.refs.noteList.insertAdjacentHTML("afterbegin", `<section><p>${newNoteText}</p><<section>`)
  },
  render() {
    return (
      <section className="gist_form">
        <p className="new_gist_title">New Gist</p>
        <button
          className="new_gist_save_button"
          onClick={ this.onSaveClick }
          type="submit">Save</button>
        <button className="new_gist_clear_button">Clear</button>
        <form className="new_gist_wrapper">
          <input
            onChange={this.onNewNoteChange}
            className="new_gist_input"
            placeholder="Title"
            type="text"
            ref="noteTitle">
          </input>
          <input
            onChange={this.onNewNoteChange}
            className="new_gist_input"
            placeholder="URL"
            type="text"
            ref="noteUrl">
          </input>
          <input
            onChange={this.onNewNoteChange}
            className="new_gist_input"
            placeholder="Make a note"
            type="text"
            ref="noteText">
          </input>
          <section ref="noteList">

          </section>
        </form>
      </section>
    )
  }
})
