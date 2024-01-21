export default class API {
  _apiToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDAwMjU3MWY4ZWQzOTkzMWJkN2ZmNzA2NjQ2YmNhNCIsInN1YiI6IjY1ODk5OWZmMDcyMTY2NjdlNGE1ZTFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fow_XT2lKTxtiCeT-55ML2Yio61BWS_mEW0LwDo4_gs'

  _apiKey = '64002571f8ed39931bd7ff706646bca4'

  _mainUrl = 'https://api.themoviedb.org/3/'

  _headers = {
    accept: 'application/json',
    Authorization: `${this._apiToken}`,
  }

  getResponse = async (url) => {
    const response = await fetch(`${this._mainUrl}${url}`, {
      method: 'GET',
      headers: this._headers,
    })

    if (response.ok) {
      return await response.json()
    }

    throw new Error(`Could not fetch data to ${this._mainUrl}${url}`)
  }

  postRating = async (guestId, movieId, value) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value": ${value}}`,
    }

    const response = await fetch(
      `${this._mainUrl}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`,
      options
    )

    if (response.ok) {
      return await response.json()
    }

    throw new Error('Could not post data rating')
  }

  deleteRating = async (guestId, movieId) => {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    }

    const response = await fetch(
      `${this._mainUrl}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`,
      options
    )

    if (response.ok) {
      return await response.json()
    }

    throw new Error('Could not post data rating')
  }

  getMoviesOnQuery(query, page = 1, adult = false, language = 'en-US') {
    return this.getResponse(
      `search/movie?query=${query}&include_adult=${adult}&language=${language}&page=${page}`
    ).then((res) => {
      return {
        results: res.results,
        totalItems: res.total_results,
      }
    })
  }

  getGenresList(language = 'en') {
    return this.getResponse(`genre/movie/list?language=${language}`).then((res) => res.genres)
  }

  createGuestSession() {
    return this.getResponse('authentication/guest_session/new').then((res) => res.guest_session_id)
  }

  getMoviesWithRating = async (guestId, page = 1, language = 'en-US') => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }

    const response = await fetch(
      `${this._mainUrl}guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&language=${language}&page=${page}&sort_by=created_at.asc`,
      options
    )

    if (response.ok) {
      return await response.json().then((res) => {
        return {
          results: res.results,
          totalItems: res.total_results,
        }
      })
    }

    throw new Error(`Could not fetch data to ${this._mainUrl}`)
  }
}
