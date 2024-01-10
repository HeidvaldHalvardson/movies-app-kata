import React from 'react'

import './Header.scss'

import SearchInput from '../SearchInput/SearchInput'

const Header = ({ searchMovies }) => {
  return (
    <header className="main-header">
      <SearchInput searchMovies={searchMovies} />
    </header>
  )
}

export default Header
