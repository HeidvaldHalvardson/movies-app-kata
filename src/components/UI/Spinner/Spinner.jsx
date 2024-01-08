import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const Spinner = ({ fontSize }) => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: fontSize }} spin />} />
}

export default Spinner
