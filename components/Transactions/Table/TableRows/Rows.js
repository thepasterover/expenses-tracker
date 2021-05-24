import React from 'react'

import Row from './Row'

const Rows = ({transactions, formattedCategories, page, rowsPerPage, classRoot}) => {
    return (
      <>
        {(transactions.length >= 0 || formattedCategories >= 0) ?
        transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
        const category = formattedCategories.find(c => row.category.toLowerCase() === c._id.toLowerCase())
        const {color, icon} = category
        return (
          <Row
          key={index}
          classRoot={classRoot}
          row={row}
          color={color}
          icon={icon}
          />
        )}) : null
        }
      </>
    )
}

export default Rows
