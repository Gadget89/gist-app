import React from 'react'

export default React.createClass({
  render(){
    return (
      <article className="article">
        <h2 className="article__title">
          { this.props.title }
        </h2>
        <p className="article__description">
          { this.props.url }
        </p>
        <p className="article__image">
          { this.props.note }
        </p>
           <a className="article__link"
           href="#">
           read more
        </a>
      </article>
    )
  }
})
