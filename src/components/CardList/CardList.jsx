import React from 'react'

import API from '../../API/API'
import Spinner from '../UI/Spinner/Spinner'

import CardItem from './CardItem/CardItem'

import './CardList.scss'

export default class CardList extends React.Component {
  state = {
    movies: [],
    genres: [],
    isLoading: true,
  }

  componentDidMount() {
    const api = new API()

    api.getMoviesOnQuery('return').then((res) => {
      this.setState({
        movies: [...res],
        isLoading: false,
      })
    })

    api.getGenresList().then((res) => {
      this.setState({
        genres: [...res],
      })
    })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Spinner fontSize={60} />
        ) : (
          <ul className="card-list">
            {this.state.movies.map((item) => {
              return <CardItem key={item.id} movie={item} genresList={this.state.genres} />
            })}
          </ul>
        )}
      </>
    )
  }
}
