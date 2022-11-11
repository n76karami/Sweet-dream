import React, { useContext } from 'react';
import { dbcontext } from '../Context';

const Factors = () => {

  const db = useContext(dbcontext);

  const newtr = db.data.factors.map(item => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_factor(item.id) }>&#10060;</button></td>
        <td>{item.total_price}</td>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td style={{fontSize:'30px'}}>{item.juiceOrder.length  > 0 ? '\u2705' : '\u274C'}</td>
        <td style={{fontSize:'30px'}}>{item.icecreamOrder.length  > 0 ? '\u2705' : '\u274C'}</td>
      </tr>
    )
  })

  return (
    <>
      <table className='panel-table'>

        <tr>

          <th>Delete</th>
          <th>Total price</th>
          <th>Id</th>
          <th>User</th>
          <th>Juice</th>
          <th>Icecream</th>
         
        </tr>

        {newtr}

      </table>
    </>
  )
}

export default Factors;