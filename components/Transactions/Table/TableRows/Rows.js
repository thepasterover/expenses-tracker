import React from 'react'

import Row from './Row'

const Rows = ({transactions, categories, page, rowsPerPage, classRoot, setTransactions, token}) => {
    return (
      <>
        { (transactions.length > 0 && categories.length > 0)
        && transactions
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
          token={token}
          />
        )})
        }
      </>
    )
}

export default Rows
