import React from 'react'

import './SearchInput.scss'

export default class SearchInput extends React.Component {
  state = {
    value: '',
  }

  onChange = (evt) => {
    this.setState({
      value: evt.target.value,
    })
    this.props.searchMovies(evt.target.value)
  }

  render() {
    return (
      <form className="form" onSubmit={(evt) => evt.preventDefault()}>
        <input
          className="search-input"
          placeholder="Type to search..."
          value={this.state.value}
          onChange={this.onChange}
        />
      </form>
    )
  }
}
