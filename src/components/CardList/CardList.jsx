import React from 'react'
import debounce from 'lodash.debounce'

import API from '../../API/API'
import Spinner from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import PaginationUI from '../UI/Pagination/PaginationUI'
import { APIConsumer } from '../../API-Context/API-Context'

import CardItem from './CardItem/CardItem'

import './CardList.scss'

export default class CardList extends React.Component {
  state = {
    movies: [],
    isLoading: false,
    isError: false,
    message: 'Type to search...',
    currentPage: 1,
    currentPageRated: 1,
    totalItems: 0,
    tab: 'Search',
    ratingList: [],
  }

  api = new API()

  onMoviesLoad = (movies) => {
    this.setState({
      movies,
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

  getMoviesWithRating = (guestId, currentPage) => {
    this.api
      .getMoviesWithRating(guestId, currentPage)
      .then((res) => {
        this.onMoviesLoad(res.results)
        this.setState({
          totalItems: res.totalItems,
        })
      })
      .catch(this.onError)
  }

  debounceGetMovies = debounce((query, currentPage) => {
    this.setState({
      isLoading: true,
      message: 'We are very sorry, but we have not found anything...',
    })
    this.getMovies(query, currentPage)
  }, 1500)

  paginationOnChange = (page) => {
    if (this.state.tab === 'Search') {
      this.setState({
        currentPage: page,
      })
    } else {
      this.setState({
        currentPageRated: page,
      })
    }
  }

  addRatedMovie = (id, value) => {
    const newRatedMovie = { id, value }
    this.setState(({ ratingList }) => {
      return {
        ratingList: [...ratingList, newRatedMovie],
      }
    })
  }

  removeRatedMovie = (id) => {
    this.setState(({ ratingList }) => {
      const newRatingList = ratingList.filter((item) => item.id !== id)
      return {
        ratingList: newRatingList,
      }
    })
  }

  componentDidMount() {
    if (sessionStorage.getItem('ratingList')) {
      this.setState({
        ratingList: JSON.parse(sessionStorage.getItem('ratingList')),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.debounceGetMovies(this.props.query, this.state.currentPage)
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.getMovies(this.props.query, this.state.currentPage)
      window.scrollTo(0, 0)
    }

    if (prevState.currentPageRated !== this.state.currentPageRated) {
      this.getMoviesWithRating(this.props.guestId, this.state.currentPageRated)
      window.scrollTo(0, 0)
    }

    if (prevProps.tab !== this.props.tab && this.props.tab === 'Rated') {
      this.setState({
        tab: this.props.tab,
        message: 'We are very sorry, but we have not found anything...',
      })
      this.getMoviesWithRating(this.props.guestId, this.state.currentPageRated)
    }

    if (prevProps.tab !== this.props.tab && this.props.tab === 'Search') {
      this.setState({
        tab: this.props.tab,
        message: 'Type to search...',
      })
      this.getMovies(this.props.query, this.state.currentPage)
    }

    if (prevState.ratingList !== this.state.ratingList) {
      sessionStorage.setItem('ratingList', JSON.stringify(this.state.ratingList))
    }
  }

  render() {
    const { isLoading, isError, message, movies, currentPage, currentPageRated, ratingList } = this.state
    const errorView = isError ? <Error message="Oops. Something went wrong. Try again." type="error" /> : null
    const spinner = isLoading && !isError ? <Spinner fontSize={60} /> : null
    const page = this.state.tab === 'Search' ? currentPage : currentPageRated
    const cardList = !(isLoading || isError) ? (
      <CardListView
        movies={movies}
        message={message}
        current={page}
        onChange={this.paginationOnChange}
        totalItems={this.state.totalItems}
        guestId={this.props.guestId}
        addRatedMovie={this.addRatedMovie}
        removeRatedMovie={this.removeRatedMovie}
        ratingList={ratingList}
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

const CardListView = ({
  movies,
  message,
  current,
  onChange,
  totalItems,
  guestId,
  addRatedMovie,
  removeRatedMovie,
  ratingList,
}) => {
  return movies.length > 0 ? (
    <APIConsumer>
      {({ genres, postRating, deleteRating }) => {
        return (
          <>
            <ul className="card-list">
              {movies.map((movie) => {
                let rating
                ratingList.map((item) => {
                  if (item.id === movie.id) {
                    rating = item.value
                  }
                })
                return (
                  <CardItem
                    key={movie.id}
                    movie={movie}
                    genresList={genres}
                    postRating={postRating}
                    deleteRating={deleteRating}
                    guestId={guestId}
                    addRatedMovie={addRatedMovie}
                    removeRatedMovie={removeRatedMovie}
                    rating={rating}
                  />
                )
              })}
            </ul>
            <PaginationUI current={current} onChange={onChange} totalItems={totalItems} />
          </>
        )
      }}
    </APIConsumer>
  ) : (
    <Error message={message} type="info" />
  )
}
