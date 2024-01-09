import React from 'react'
import { Alert } from 'antd'

import './Error.scss'

const Error = ({ message, type }) => {
  return <Alert className="error" message={message} type={type} />
}

export default Error
