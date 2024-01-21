import React from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import './CardItem.scss'

const CardItem = ({
  movie,
  genresList,
  postRating,
  deleteRating,
  guestId,
  addRatedMovie,
  removeRatedMovie,
  rating,
}) => {
  const TRIM_LENGTH = 200

  const getTrimText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, text.indexOf(' ', length)) + '...'
    }
    return text
  }

  const rateOnChange = (value) => {
    if (value === 0) {
      deleteRating(guestId, movie.id)
      removeRatedMovie(movie.id)
    } else {
      postRating(guestId, movie.id, value)
      addRatedMovie(movie.id, value)
    }
  }

  const genres = genresList.filter((item) => movie.genre_ids.includes(item.id))

  const voteAverage = movie.vote_average.toFixed(1)

  let ratingClass

  if (voteAverage < 3) {
    ratingClass = 'rating__low'
  } else if (voteAverage < 5) {
    ratingClass = 'rating__middle'
  } else if (voteAverage < 7) {
    ratingClass = 'rating__high'
  } else {
    ratingClass = 'rating__highest'
  }

  return (
    <li className="card-item">
      <img
        className="card-item__image"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://artworks.thetvdb.com/banners/movies/292873/posters/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg'
        }
        alt="poster"
      />
      <div className="card-item__wrapper">
        <div className="card-item__header">
          <h2 className="card-item__title">{movie.title}</h2>
          <span className={`rating ${ratingClass}`}>{voteAverage}</span>
        </div>
        <span className="card-item__date">
          {movie.release_date ? format(`${movie.release_date}`, 'MMMM dd, yyyy') : 'Release date is unknown...'}
        </span>
        <ul className="card-item__genre-list">
          {genres.map((item) => {
            return (
              <li className="card-item__genre-item" key={item.id}>
                <span>{item.name}</span>
              </li>
            )
          })}
        </ul>
        <p className="card-item__description">
          {movie.overview ? getTrimText(movie.overview, TRIM_LENGTH) : 'No description...'}
        </p>
        <Rate className="rate" count={10} allowHalf onChange={rateOnChange} defaultValue={rating ? rating : 0} />
      </div>
    </li>
  )
}

export default CardItem
