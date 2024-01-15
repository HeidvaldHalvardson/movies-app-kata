import React from 'react'
import debounce from 'lodash.debounce'

import API from '../../API/API'
import Spinner from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import PaginationUI from '../UI/Pagination/PaginationUI'

import CardItem from './CardItem/CardItem'

import './CardList.scss'

export default class CardList extends React.Component {
  state = {
    movies: [],
    genres: [],
    isLoading: true,
    isError: false,
    message: 'Type to search...',
    currentPage: 1,
    totalItems: 0,
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
      isLoading: false,
      isError: false,
    })
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }

  getMovies = (query = '', currentPage) => {
    if (query.length === 0) {
      this.setState({
        message: 'Type to search...',
      })
    }
    this.api
      .getMoviesOnQuery(query, currentPage)
      .then((res) => {
        this.onMoviesLoad(res.results)
        this.setState({
          totalItems: res.totalItems,
        })
      })
      .catch(this.onError)
  }

  getGenres = () => {
    this.api.getGenresList().then(this.onGenresLoad).catch(this.onError)
  }

  debounceGetMovies = debounce((query, currentPage) => {
    this.setState({
      isLoading: true,
      message: 'We are very sorry, but we have not found anything...',
      currentPage: 1,
    })
    this.getMovies(query, currentPage)
  }, 1500)

  paginationOnChange = (page) => {
    this.setState({
      currentPage: page,
    })
  }

  componentDidMount() {
    this.getGenres()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.debounceGetMovies(this.props.query, this.state.currentPage)
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.getMovies(this.props.query, this.state.currentPage)
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { genres, isLoading, isError, message, movies, currentPage } = this.state
    const errorView = isError ? <Error message="Oops. Something went wrong. Try again." type="error" /> : null
    const spinner = isLoading && !isError ? <Spinner fontSize={60} /> : null
    const cardList = !(isLoading || isError) ? (
      <CardListView
        genres={genres}
        movies={movies}
        message={message}
        current={currentPage}
        onChange={this.paginationOnChange}
        totalItems={this.state.totalItems}
      />
    ) : null
    return (
      <>
        {errorView}
        {spinner}
        {cardList}
      </>
    )
  }
}

const CardListView = ({ movies, genres, message, current, onChange, totalItems }) => {
  return movies.length > 0 ? (
    <>
      <ul className="card-list">
        {movies.map((item) => {
          return <CardItem key={item.id} movie={item} genresList={genres} />
        })}
      </ul>
      <PaginationUI current={current} onChange={onChange} totalItems={totalItems} />
    </>
  ) : (
    <Error message={message} type="info" />
  )
}
