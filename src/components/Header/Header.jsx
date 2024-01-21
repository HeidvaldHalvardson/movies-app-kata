import React from 'react'
import { Tabs } from 'antd'

import './Header.scss'

const Header = ({ onChangeTabs }) => {
  const items = [
    {
      key: 'Search',
      label: 'Search',
    },
    {
      key: 'Rated',
      label: 'Rated',
    },
  ]
  return (
    <header className="main-header">
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarStyle={{ fontFamily: 'Inter, sans-serif', margin: '0 auto 20px' }}
        tabBarGutter={16}
        onChange={onChangeTabs}
      />
    </header>
  )
}

export default Header
