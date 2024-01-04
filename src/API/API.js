export default class API {
  _headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDAwMjU3MWY4ZWQzOTkzMWJkN2ZmNzA2NjQ2YmNhNCIsInN1YiI6IjY1ODk5OWZmMDcyMTY2NjdlNGE1ZTFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fow_XT2lKTxtiCeT-55ML2Yio61BWS_mEW0LwDo4_gs'
  }

  _mainUrl = 'https://api.themoviedb.org/3/'

  async getResponse(url) {
    const response = await fetch(`${this._mainUrl}${url}`, {
      method: 'GET',
      headers: this._headers
    })

    if (response.ok) {
      return await response.json()
    }

    throw new Error(`Could not fetch data to ${this._mainUrl}${url}`)
  }

  getMoviesOnQuery(query, adult = false, language = 'en-US',page = 1) {
    return this.getResponse(`search/movie?query=${query}&include_adult=${adult}&language=${language}&page=${page}`)
      .then((res) => res.results)
  }

  getGenresList(language = 'en') {
    return this.getResponse(`genre/movie/list?language=${language}`)
      .then((res) => res.genres)
  }
}