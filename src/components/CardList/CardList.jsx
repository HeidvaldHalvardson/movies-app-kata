import React from 'react'
import debounce from 'lodash.debounce'

import API from '../../API/API'
import Spinner from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'

import CardItem from './CardItem/CardItem'

import './CardList.scss'

export default class CardList extends React.Component {
  state = {
    movies: [],
    genres: [],
    isLoading: true,
    isError: false,
    message: 'Type to search...',
  }

  api = new API()

  onMoviesLoad = (movies) => {
    this.setState({
      movies,
      isLoading: false,
      isError: false,
    })
  }

  onGenresLoad = (genres) => {
    this.setState({
      genres: genres,
    })
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }

  getMovies = (query = '') => {
    if (query.length === 0) {
      this.setState({
        message: 'Type to search...',
      })
    }
    this.api.getMoviesOnQuery(query).then(this.onMoviesLoad).catch(this.onError)
  }

  getGenres = () => {
    this.api.getGenresList().then(this.onGenresLoad).catch(this.onError)
  }

  debounceGetMovies = debounce((query) => {
    this.setState({
      isLoading: true,
      message: 'We are very sorry, but we have not found anything...',
    })
    this.getMovies(query)
  }, 1500)

  componentDidMount() {
    this.getMovies(this.props.query)
    this.getGenres()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.debounceGetMovies(this.props.query)
    }
  }

  render() {
    const { movies, genres, isLoading, isError, message } = this.state
    const errorView = isError ? <Error message="Oops. Something went wrong. Try again." type="error" /> : null
    const spinner = isLoading && !isError ? <Spinner fontSize={60} /> : null
    const cardList = !(isLoading || isError) ? <CardListView genres={genres} movies={movies} message={message} /> : null
    return (
      <>
        {errorView}
        {spinner}
        {cardList}
      </>
    )
  }
}

const CardListView = ({ movies, genres, message }) => {
  return movies.length > 0 ? (
    <ul className="card-list">
      {movies.map((item) => {
        return <CardItem key={item.id} movie={item} genresList={genres} />
      })}
    </ul>
  ) : (
    <Error message={message} type="info" />
  )
}
