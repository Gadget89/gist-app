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
      <section>
      <div className="tab_wrapper">
        <button className="tab_links" onClick="">JavaScript</button>
        <button className="tab_links" onClick="">CSS</button>
        <button className="tab_links" onClick="">HTML</button>
      </div>

      <div id="London" className="tab_content">
        <h3>London</h3>
        <p>London is the capital city of England.</p>
      </div>

      <div id="Paris" className="tab_content">
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div id="Tokyo" className="tab_content">
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>

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
            </section>
    )
  }
})
