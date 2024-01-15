import React from 'react'
import { ConfigProvider, Pagination } from 'antd'

const PaginationUI = ({ totalItems, onChange, pageSize = 20, current }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            colorPrimary: '#ffffff',
          },
        },
      }}
    >
      <Pagination
        total={totalItems}
        hideOnSinglePage={true}
        pageSize={pageSize}
        onChange={(page) => onChange(page)}
        current={current}
        showSizeChanger={false}
      />
    </ConfigProvider>
  )
}

export default PaginationUI
