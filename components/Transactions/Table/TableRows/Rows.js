import React from 'react'

import Row from './Row'

const Rows = ({transactions, categories, page, rowsPerPage, classRoot, setTransactions}) => {
    return (
      <>
        {transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
        const category = categories.find(c => row.category.toLowerCase() === c._id.toLowerCase())
        const {color, icon} = category
        return (
          <Row
          key={index}
          classRoot={classRoot}
          row={row}
          color={color}
          icon={icon}
          categories={categories}
          categoryIndex={categories.indexOf(category)}
          transactions={transactions}
          setTransactions={setTransactions}
          />
        )})
        }
      </>
    )
}

export default Rows
