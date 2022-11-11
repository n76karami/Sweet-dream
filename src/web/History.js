import React, { useContext, useState } from 'react';
import { dbcontext } from '../Context';

import './History.css'

const History = () => {

  const db = useContext(dbcontext);

  const User_purchase_history =  db.data.factors.filter(item => item.user == db.data.current_user.username )

  const newfactor = User_purchase_history.map(item => {
    return (
      <div className='p-table-History'>
        <table className='table-History'>

          <tr>
            <th>final price</th>
            <th>Number</th>
            <th>Unit price</th>
            <th>flavor</th>
            <th>Product Type</th>
          </tr>

          {item.icecreamOrder.map(item => {
            return (
              <tr>
                <td>{item.final_price}</td>
                <td>{item.icecream_Number}</td>
                <td>{item.scoop_Price}</td>
                <td>{item.scoop_Taste}</td>
                <td>{item.product_type}</td>
              </tr>
            )
          })}

          {item.juiceOrder.map(item => {
            return (
              <tr>
                <td>{item.final_price}</td>
                <td>{item.juiceNumber}</td>
                <td>{item.juicePrice}</td>
                <td>{item.juiceFlavor}</td>
                <td>{item.product_type}</td>
              </tr>
            )
          })}

          <tr>
            <td>{item.total_price}</td>
            <td>Total price</td>
          </tr>

          <tr>
            <td>{item.id}</td>
            <td>Factor Id</td>
          </tr>

        </table>
      </div>
    )
  })

  return (
    <div className='p-History'>

      <h1>purchase History</h1>

      {newfactor}

    </div>
  )
}

export default History