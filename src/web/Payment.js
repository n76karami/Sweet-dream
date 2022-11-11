import React, { useContext, useState } from 'react';
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"
import './payment.css';

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;

const Payment = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);

  // const [sum_total , setsum_total] = useState('')

  const user_icecream_order = db.data.Icecreams.filter(item => item.c_user == db.data.current_user.username && !item.ispay )


  const neworder1 = user_icecream_order.map(item => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_Icecream(item.id)}>&#10060;</button></td>
        <td>{item.final_price}</td>
        <td>{item.icecream_Number}</td>
        <td>{item.scoop_Price}</td>
        <td>{item.scoop_Taste}</td>
        <td>{item.product_type}</td>
      </tr>
    )
  })

  const user_juice_order = db.data.juices.filter(item => item.c_user == db.data.current_user.username && !item.ispay)

  const neworder2 = user_juice_order.map(item => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_Juice(item.id)}>&#10060;</button></td>
        <td>{item.final_price}</td>
        <td>{item.juiceNumber}</td>
        <td>{item.juicePrice}</td>
        <td>{item.juiceFlavor}</td>
        <td>{item.product_type}</td>
      </tr>
    )
  })

  const prices = []
  let sum_prices = null;

  user_icecream_order.forEach(item => {
    prices.push(item.final_price)
    sum_prices = prices.reduce((acc, cur) => acc += cur)
  });

  user_juice_order.forEach(item => {
    prices.push(item.final_price)
    sum_prices = prices.reduce((acc, cur) => acc += cur)
  })

  
  
  
  const onpay = () => {

    const obj = {
      id: UID(),
      icecreamOrder: user_icecream_order,
      juiceOrder :user_juice_order,
      total_price: sum_prices,
      user: db.data.current_user.username
    }
    
    const Duplicate_factor = db.data.factors.some(item => {
      return item.id == obj.id
    })
    // console.log(obj.id)


    if (Duplicate_factor) return alert('فاکتور تکراری')

    db.add_factor(obj)

    alert('پرداخت با موفقیت انجام شد')

    db.data.Icecreams.forEach(item => {
      if (item.c_user == db.data.current_user.username) {
        item.ispay = true;
      }
    })

    db.data.juices.forEach(item => {
      if (item.c_user == db.data.current_user.username) {
        item.ispay = true;
      }
    })

  }

  console.log(prices)
  console.log(user_icecream_order)
  console.log(user_juice_order)


  return (
    <div className='p-payment'>

      <h1>{db.data.current_user.username}'s shopping cart</h1>

      <div>
      <table id='table'>
        <tr>
          <th>Delete</th>
          <th>final price</th>
          <th>Number</th>
          <th>Unit price</th>
          <th>flavor</th>
          <th>Product Type</th>
        </tr>
          
        {neworder1}
          
        {neworder2}
        
        {sum_prices ?  
          
          <>
            <tr>
              <td>{sum_prices}</td>
              <td>Total price</td>
            </tr>
          </>
        :
        ''
        }
          
          
      </table>
      </div>
      {sum_prices ?
        <button id='onpay' onClick={onpay}>payment</button>
        :
        ''
      }
      
      <button id='factors' onClick={()=>navigate("/panel/factors")}> factors </button>
    
    </div>
  )
}
export default Payment;
