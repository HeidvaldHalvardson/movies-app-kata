import React from 'react'

import './CardList.scss'

import API from '../../API/API'

import CardItem from './CardItem/CardItem'

export default class CardList extends React.Component {
  state = {
    movies: [],
    genres: [],
  }

  componentDidMount() {
    const api = new API()

    api.getMoviesOnQuery('return').then((res) => {
      this.setState({
        movies: [...res],
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
      <ul className="card-list">
        {this.state.movies.map((item) => {
          return <CardItem key={item.id} movie={item} genresList={this.state.genres} />
        })}
      </ul>
    )
  }
}
