import React from 'react'

import './App.scss'

import Main from '../Main/Main'
import Header from '../Header/Header'

export default class App extends React.Component {
  state = {
    query: '',
  }

  searchMovies = (query) => {
    this.setState({
      query: query.trim(),
    })
  }

  render() {
    return (
      <>
        <Header searchMovies={this.searchMovies} />
        <Main query={this.state.query} />
      </>
    )
  }
}
