import React from 'react'

import './Main.scss'

import CardList from '../CardList/CardList'

const Main = ({ query }) => {
  return (
    <main className="main-search">
      <CardList query={query} />
    </main>
  )
}

export default Main
