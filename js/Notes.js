import React from 'react'
import Note from './Note'
import Header from './Header'



export default React.createClass({

  getInitialState(){
    return {
      notes: [
        {
          title:"",
          url:"",
          note: "",
          type: ""
        }
      ]
    }
  },
  onSaveClick(e){
    e.preventDefault()
    var selectedType=this.refs.selected.value
    var newNotes= {
      title: this.refs.title.value,
      url: this.refs.url.value,
      note: this.refs.note.value,
      type: selectedType
    }
    this.state.notes=this.state.notes.concat(newNotes)
    this.setState(this.state.notes)

    var tempUser = this.props.user.name
    var tempHold = tempUser.split(" ")
    var fbUser = tempHold[0]
    var updates = {}
    updates["/Notes/" + fbUser] = this.state.notes
    firebase.database().ref().update(updates)
    // firebase.database().ref("/Notes/" + tempHold[0] + "/").push().update(newNotes)

    this.refs.newGistForm.className = "hidden"
    this.refs.newGistButton.className = "new_gist_button"
    this.refs.title.value = ""
    this.refs.url.value= ""
    this.refs.note.value= ""
  },

  onAddNoteClick(e){
    this.refs.newGistForm.className = "gist_form"
    this.refs.newGistButton.className = "hidden"
  },

  onJsTabClick(e){
    this.refs.jsTab.className = "tab_content"
    this.refs.cssTab.className = "hidden"
    this.refs.htmlTab.className = "hidden"
  },
  onCssTabClick(e){
    this.refs.jsTab.className = "hidden"
    this.refs.cssTab.className = "tab_content"
    this.refs.htmlTab.className = "hidden"
  },
  onHtmlTabClick(e){
    this.refs.jsTab.className = "hidden"
    this.refs.cssTab.className = "hidden"
    this.refs.htmlTab.className = "tab_content"
  },


  render() {
        if(this.props.notes!=undefined){
          this.state.notes=this.props.notes
        }
    return (
      <section className="page_wrap">

        <div
          className="gist_form"
          ref="newGistForm">

          <form
            onSubmit={this.onSaveClick}
            className="new_gist_wrapper">
            <p className="new_gist_title">New Gist</p>
            <select
              className="dropdown"
              name="tab"
              ref="selected">
              <option value="JavaScript">JavaScript Note</option>
              <option value="HTML">HTML Note</option>
              <option value="CSS">CSS Note</option>
            </select>
            <button
              className="new_gist_clear_button"
              type="reset">
              Clear</button>
            <button
              className="new_gist_clear_button"
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

        <section>
        <div className="tab_wrapper">

          <button className="tab_links" onClick={this.onJsTabClick}>JavaScript</button>
          <button className="tab_links" onClick={this.onCssTabClick}>CSS</button>
          <button className="tab_links" onClick={this.onHtmlTabClick}>HTML</button>
          <button
            className="hidden"
            onClick={this.onAddNoteClick}
            ref="newGistButton">
            Add Note
          </button>
        </div>
        </section>
        <div id="" ref="jsTab" className="tab_content">
          <p className="tab_header">JavaScript Notes</p>
          { this.state.notes.map( (note, i)=>{
            if (note.type === "JavaScript"){
          return <Note title={note.title}
                          url={note.url}
                          note={note.note}
                          key={i} />
                }
              }
            )
          }
        </div>

        <div id="" ref="cssTab" className="hidden">
          <p className="tab_header">CSS Notes</p>
          { this.state.notes.map( (note, i)=>{
            if (note.type === "CSS"){
          return <Note title={note.title}
                          url={note.url}
                          note={note.note}
                          key={i} />
                }
              }
            )
          }
        </div>

        <div id="Tokyo" ref="htmlTab" className="hidden">
          <p className="tab_header">HTML Notes</p>
          { this.state.notes.map( (note, i)=>{
            if (note.type === "HTML"){
          return <Note title={note.title}
                          url={note.url}
                          note={note.note}
                          key={i} />
                }
              }
            )
          }
        </div>
      </section>
    )
  }
})
