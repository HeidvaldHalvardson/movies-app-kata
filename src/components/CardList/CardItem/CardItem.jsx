import React from 'react';

import {format} from "date-fns";

import './CardItem.scss'

const CardItem = ({movie, genresList}) => {

  const TRIM_LENGTH = 200

  const getTrimText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, text.indexOf(' ', length)) + '...'
    }
      return text
  }

  let genres = genresList.filter(item => movie.genre_ids.includes(item.id))

  return (
    <li className='card-item'>
      <img className='card-item__image'
           src={movie.poster_path ?
             `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
             'https://artworks.thetvdb.com/banners/movies/292873/posters/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg'}
           alt='poster' />
      <div className='card-item__wrapper'>
        <h2 className='card-item__title'>{movie.title}</h2>
        <span className='card-item__date'>
          {movie.release_date ?
            format(`${movie.release_date}`, 'MMMM dd, yyyy' ) :
            'Release date is unknown...'}
        </span>
        <ul className='card-item__genre-list'>
          {
            genres.map(item => {
              return (
                <li className='card-item__genre-item' key={item.id}>
                  <span>{item.name}</span>
                </li>
              )
            })
          }
        </ul>
        <p className='card-item__description'>
          {
            movie.overview ?
              getTrimText(movie.overview, TRIM_LENGTH) :
              'No description...'
          }
        </p>
      </div>
    </li>
  );
};

export default CardItem;

// {
//   "adult": false,
//   "backdrop_path": "/tu5IcNPo99rJkIgNwKZqPYQ2MiY.jpg",
//   "genre_ids": [
//   27,
//   14,
//   10749
// ],
//   "id": 403587,
//   "original_language": "en",
//   "original_title": "Return",
//   "overview": "After reading an article about hypnotic regression, a woman whose maternal grandfather died when she was only three years old contacts the hypnotic subject named in the article believing that he is the reincarnation of her grandfather, and hoping that she can learn the truth about how he died.",
//   "popularity": 3.801,
//   "poster_path": "/54QOkHWUnn3gDZKfGojPiFqTHJD.jpg",
//   "release_date": "1985-10-31",
//   "title": "Return",
//   "video": false,
//   "vote_average": 6.042,
//   "vote_count": 1194
// }