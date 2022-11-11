import React , { useState, useContext } from 'react';

import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom";

import './Juice.css';

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;


const Juice = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);

  const [flavorsmodal, setflavorsmodal] = useState(false);

  const [juice_flavor, setjuice_flavor] = useState('');
  const [juice_price, setjuice_price] = useState('');
  const [juice_Number, setjuice_Number] = useState();
  const [juice_img, setjuice_img] = useState('/glass.png');
  const [finalprice, setfinalprice] = useState('');
  // const [juice, setjuices] = useState([
  //   {
  //     flavor: 'watermelon',
  //     price: 30000,
  //     url : '/watermelon.png'
  //   },
  //   {
  //     flavor: 'cherry',
  //     price: 20000,
  //     url : '/cherry.png'
  //   },
  //   {
  //     flavor: 'pineapple',
  //     price: 40000,
  //     url : '/pineapple.png'
  //   },
  //   {
  //     flavor: 'peach ',
  //     price: 15000,
  //     url : '/peach.png'
  //   },
  //   {
  //     flavor: 'orange',
  //     price: 10000,
  //     url : '/orange.png'
  //   }
  // ]);

  const remove_img = () => {

    setjuice_img('/glass.png')
    
    setjuice_flavor('');

    setjuice_price('');
  }

  const put_img = (item) => {

    setjuice_img(item.url)
    
    setjuice_flavor(item.flavor);

    setjuice_price(item.price);

  }

  console.log(juice_flavor)
  console.log(juice_price)

  const flavors = db.data.juiceFlavor.map(item => {
    return (
      <button onClick={() => put_img(item)}>
        {item.flavor} ({item.price})
      </button>
    )
  });

  const onsubmit = () => {
    
    if (!juice_flavor || !juice_Number) return alert('قبل از سفارش لطفا تمام قسمتها را تکمیل کنید');

    if (juice_Number < 1) return alert('تعداد آبمیوه سفارش شما نباید کمتر از یک باشد');

    const obj = {

      product_type: "juice",
      id: UID() ,
      juiceFlavor: juice_flavor,
      juicePrice: juice_price,
      juiceNumber: juice_Number,
      c_user : db.data.current_user.username,
      final_price: juice_price * juice_Number,
      ispay : false

    }
    
    db.add_juice(obj);

    setfinalprice(obj.final_price);
    
    alert('سفارش شما با موفقیت ثبت شد');


  }

  const pay = () => {

    if(!finalprice) return alert('ابتدا سفارش دهید')

    setjuice_flavor('');
    setjuice_price('');
    setjuice_Number('');
    setjuice_img('');
    setfinalprice('');

    navigate('/userdashbord/payment');

  }

  return (
    <div className='p-juice'>

      <div className='juice-info'>
    
        
        <button className='juice-btn' onClick={() => setflavorsmodal(!flavorsmodal)}>Juice flavors</button>

        <input type="number" placeholder='  Number' min="1" value={juice_Number}
          onChange={e => setjuice_Number(e.target.value)}/>

        <button className='juice-btn order' onClick={onsubmit}>Order</button>
        
        
        <div>
          <span>Final price</span>
          <span>{finalprice}</span>
        </div>
        
        <button className='juice-payment' onClick={pay}>move to cart</button>

        {flavorsmodal ?
          
          <div className='flavorsmodal'>

            {flavors}

          </div>

          :
          ''
        }

      </div>

      <div className='juice-output'>
        
        <div className='juice'>

          <button onClick={remove_img}>&#11097;</button>
          <img className='' src={juice_img} />
          
        </div>

        <button onClick={()=>navigate("/panel/Juice")}>Juice  </button>

      </div>

    </div>
  )
}

export default Juice;