import React from 'react'

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

  getMovies = () => {
    const query = 'return'
    this.api.getMoviesOnQuery(query).then(this.onMoviesLoad).catch(this.onError)
  }

  getGenres = () => {
    this.api.getGenresList().then(this.onGenresLoad).catch(this.onError)
  }

  componentDidMount() {
    this.getMovies()
    this.getGenres()
  }

  render() {
    const { movies, genres, isLoading, isError } = this.state
    const errorView = isError ? <Error message="Oops. Something went wrong. Try again." type="error" /> : null
    const spinner = isLoading && !isError ? <Spinner fontSize={60} /> : null
    const cardList = !(isLoading || isError) ? <CardListView genres={genres} movies={movies} /> : null
    return (
      <>
        {errorView}
        {spinner}
        {cardList}
      </>
    )
  }
}

const CardListView = ({ movies, genres }) => {
  return movies.length > 0 ? (
    <ul className="card-list">
      {movies.map((item) => {
        return <CardItem key={item.id} movie={item} genresList={genres} />
      })}
    </ul>
  ) : (
    <Error message="We are very sorry, but we have not found anything..." type="info" />
  )
}
