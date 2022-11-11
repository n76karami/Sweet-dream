import React, { useContext } from 'react';
import { dbcontext } from '../Context';

const Juice_panel = () => {

  const db = useContext(dbcontext);

  const newtr = db.data.juices.map((item, index) => {
    return (
      <tr>

        <td><button  onClick={() => db.delete_Juice(item.id) }>&#10060;</button></td>
        <td>{item.id}</td>
        <td>{item.final_price}</td>
        <td>{item.c_user}</td>
        <td>{item.juiceNumber}</td>
        <td>{item.juicePrice}</td>
        <td>{item.juiceFlavor}</td>
        
      </tr>
    )
  })

  return (
    <>
      <table className='panel-table'>
        <tr>

          <th>Delete</th>
          <th>Id</th>
          <th>final price</th>
          <th>user</th>
          <th>Number</th>
          <th>unit price</th>
          <th>flavor</th>
          
        </tr>
        {newtr}
      </table>
    </>
  )
}

export default Juice_panel;