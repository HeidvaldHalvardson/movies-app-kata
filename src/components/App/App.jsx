import React from 'react'

import './App.scss'

import Main from '../Main/Main'
import Header from '../Header/Header'
import API from '../../API/API'
import { APIProvider } from '../../API-Context/API-Context'
import Error from '../UI/Error/Error'

export default class App extends React.Component {
  api = new API()

  state = {
    query: '',
    genres: [],
    guestId: '',
    tab: 'Search',
    isError: false,
  }

  searchMovies = (query) => {
    this.setState({
      query: query.trim(),
    })
  }

  getGenresList = () => {
    this.api
      .getGenresList()
      .then((res) => {
        this.setState({
          genres: res,
        })
      })
      .catch(this.onError)
  }

  getGuestId = () => {
    if (!sessionStorage.getItem('guestId')) {
      this.api
        .createGuestSession()
        .then((res) => {
          sessionStorage.setItem('guestId', res)
          this.setState({
            guestId: res,
          })
        })
        .catch(this.onError)
    } else {
      this.setState({
        guestId: sessionStorage.getItem('guestId'),
      })
    }
  }

  onChangeTabs = (key) => {
    this.setState({
      tab: key,
    })
  }

  componentDidMount() {
    this.getGuestId()
    this.getGenresList()
  }

  onError = () => {
    this.setState({
      isError: true,
    })
  }

  render() {
    const appView = this.state.isError ? (
      <Error message="Oops. Something went wrong. Try again." type="error" />
    ) : (
      <APIProvider
        value={{ genres: this.state.genres, postRating: this.api.postRating, deleteRating: this.api.deleteRating }}
      >
        <Header onChangeTabs={this.onChangeTabs} />
        <Main
          query={this.state.query}
          searchMovies={this.searchMovies}
          tab={this.state.tab}
          guestId={this.state.guestId}
        />
      </APIProvider>
    )
    return <>{appView}</>
  }
}
