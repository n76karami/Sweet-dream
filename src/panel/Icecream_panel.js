import React, { useContext ,useState } from 'react'
import { dbcontext } from '../Context';


const Icecream_panel = () => {

  const db = useContext(dbcontext);


  const newtr = db.data.Icecreams.map((item, index) => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_Icecream(item.id)}>&#10060;</button></td>
        {/* <td><button className='edit' onClick={() => modal(item) }>&#9998;</button></td> */}
        <td>{item.id}</td>
        <td>{item.final_price}</td>
        <td>{item.c_user}</td>
        <td>{item.icecream_Number}</td>
        <td>{item.scoop_Price}</td>
        <td>{item.scoop_Taste}</td>
        <td>{item.scoop_number}</td>
        <td>{item.bread}</td>
        
      </tr>
    )
  })

  return (
    <>
      <table className='panel-table'>
        <tr>
          <th>Delete</th>
          {/* <th>Edit</th> */}
          <th>Id</th>
          <th>finalprice</th>
          <th>user</th>
          <th>icecreamNumber</th>
          <th>scoopPrice</th>
          <th>scoopTaste</th>
          <th>scoopNumber </th>
          <th> breadType </th>
          
        </tr>
        {newtr}
      </table>
    </>
  )
}
export default Icecream_panel;
