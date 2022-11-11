import React, { useState, useContext } from 'react'
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"

import './Icecream.css'

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;

const Icecream = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);

  
  // ICECREAMS STATES
  
  const [breadType, setbreadType] = useState('funnel');
  const [scoopNumber, setscoopNumber] = useState(3);
  const [scoopTaste, setscoopTaste] = useState([]);
  const [scoopPrice, setscoopPrice] = useState([]);
  const [icecreamNumber, seticecreamNumber] = useState();
  const [c_user, setc_user] = useState('');
  const [finalprice, setfinalprice] = useState('');


  const [modal1, setmodal1] = useState(false)
  const [modal2, setmodal2] = useState(false)
  const [modal3, setmodal3] = useState(false)
  
  const [select_typebread ,setselect_typebread] = useState(true)
  const [select_numberscoop, setselect_numberscoop] = useState(true)

  const [scoop_img, setscoop_img] = useState([]);
  // const [scoop , setscoop] =useState([
  //   {
  //     taste: 'chocolate',
  //     price: 5000,
  //     url : '/chocolate.png'
  //   },
  //   {
  //     taste: 'mango',
  //     price: 7000,
  //     url : '/mango.png'
  //   },
  //   {
  //     taste: 'Strawberry',
  //     price: 6000,
  //     url : '/Strawberry.png'
  //   },
  //   {
  //     taste: 'Pistachio',
  //     price: 6000,
  //     url : '/Pistachio.png'
  //   },
  //   {
  //     taste: 'vanilla',
  //     price: 4000,
  //     url : '/vanilla.png'
  //   }
  // ])

  const delete_img = (index) => {
    const ar = [...scoop_img]
    ar.splice(index, 1)
    setscoop_img(ar)

    const x = [...scoopTaste]
    x.splice(index, 1)
    setscoopTaste(x)

    const y = [...scoopPrice]
    y.splice(index, 1)
    setscoopPrice(y)
  }
  
  const add_img = (item) => {
    
    const ar = [...scoop_img]
    const obj = item.url

    if ((scoop_img.length > 2 && select_numberscoop) || (scoop_img.length > 1 && !select_numberscoop)) {
      return alert('انتخاب های شما به اتمام رسیده است')
    } 
    
    ar.push(obj)
    setscoop_img(ar)


    const x = [...scoopTaste]
    const newtaste = item.taste
    x.push(newtaste)
    setscoopTaste(x)

    const y = [...scoopPrice]
    const newprice = item.price
    y.push(newprice)
    setscoopPrice(y)

  }
  // console.log(finalprice)
  // console.log(scoopTaste)
  console.log(scoopPrice)

  const scoop_taste = db.data.scoop.map(item => {
    return (
      <button onClick={() => add_img(item)}>

        {item.taste} ({item.price})

      </button>
    )
  })


  const putbread_type = (state) => {

    setselect_typebread(state);
    if (state) {
      setbreadType('funnel')
    }
    else {
      setbreadType('bowl')
    }

  }

  const putNumber_scoop = (state) => {

    
    setselect_numberscoop(state)
    if (state) {
      setscoopNumber(3)
    }
    else {
      setscoopNumber(2)

      const ar = [...scoop_img]
      if(ar.length > 2)
      ar.splice(ar.length-1, 1)
      setscoop_img(ar)

      const x = [...scoopTaste]
      if(x.length > 2)
      x.splice(x.length-1, 1)
      setscoopTaste(x)

      const y = [...scoopPrice]
      if(y.length > 2)
      y.splice(y.length-1, 1)
      setscoopPrice(y)
    }

  }

  



  const onsubmit = () => {

    if (!breadType || !scoopNumber || !icecreamNumber ) return alert ('قبل از سفارش لطفا تمام قسمتها را تکمیل کنید')

    if(icecreamNumber < 1) return alert('تعداد بستنی سفارش شما نباید کمتر از یک باشد')

    if (scoopNumber == 3 && !(scoop_img.length > 2) || scoopNumber == 2 && !(scoop_img.length > 1) ) return alert ('لطفا به تعداد اسکوپ انتخابی طعم انتخاب کنید')

    
    // console.log(finalprice)

    const obj = {
      product_type: "icecream",
      id: UID() ,
      bread: breadType,
      scoop_number: scoopNumber,
      scoop_Taste: scoopTaste,
      scoop_Price: scoopPrice,
      icecream_Number: icecreamNumber,
      c_user : db.data.current_user.username,
      final_price: (scoopPrice.reduce((acc, cur) => acc += cur)) * icecreamNumber,
      ispay : false

    }

    db.add_Icecream(obj)

    setfinalprice(obj.final_price)
    

    // setbreadType('');
    // setscoopNumber('');
    // setscoopTaste('');
    // setscoopPrice('');
    // seticecreamNumber('');
    // setscoop_img('');
    // setfinalprice('');
    alert('سفارش شما با موفقیت ثبت شد')

    
  }
  // console.log(db.current_user.username  )



  const pay = () => {

    if(!finalprice) return alert('ابتدا سفارش دهید')

    setbreadType('');
    setscoopNumber('');
    setscoopTaste('');
    setscoopPrice('');
    seticecreamNumber('');
    setscoop_img('');
    setfinalprice('');

    navigate('/userdashbord/payment');

  }

  return (

    <div className='p-icecream'>

      <div className='user-info'>

        <div className='a'>

          <button onClick={() => setmodal1(!modal1)}>Type of bread</button>
          <button onClick={() => setmodal2(!modal2)}>Number of scoops</button>
          <button onClick={() => setmodal3(!modal3)}>Scoop taste</button>

          <div>
            <label>Number</label>
            <input type="number" min="1" value={icecreamNumber}
              onChange={e => seticecreamNumber(e.target.value)}
            />
          </div>

          <button id='order' onClick={onsubmit}>Order</button>

          <div id='price'>
            <span>Final price</span>
            <span>{finalprice}</span>
            
          </div>
          
        </div>

        <button id='payment' onClick={pay}>move to cart</button>

        {modal1 ?
          <div className='modal1'>
            <button onClick={() => putbread_type(true)}>funnel</button>
            <button onClick={() => putbread_type(false)} >bowl</button>
          </div>
          : ''}
        
        {modal2 ?
          <div className='modal2'>
            <button onClick={() => putNumber_scoop(false)}>2 scopes</button>
            <button onClick={() => putNumber_scoop(true)}>3 scoops</button>
          </div>
          : ''}
        
        {/* {modal3 ?
          <>
            
            {select_numberscoop?
              <div className='modal3'>
                <button onClick={() => setmodal4(!modal4)}>scoop 1</button>
                <button onClick={() => setmodal4(!modal4)}>scoop 2</button>
                <button onClick={() => setmodal4(!modal4)}>scoop 3</button>
              </div>
            :
              <div className='modal3'>
                <button onClick={() => setmodal4(!modal4)}>scoop 1</button>
                <button onClick={() => setmodal4(!modal4)}>scoop 2</button>
              </div>
            }

          </> 
            
        :''} */}
        
        {modal3 ?
          
          <div className='modal3'>
            {scoop_taste}
          </div>

        : ''}

      </div>

      <div className='output'>

        <div className='scoop'>

          {select_numberscoop ?
            
            <>
              <div className='three_scoop'>
                <img src={scoop_img[0] || "/question.png"} className='img1' /><button onClick={() => delete_img(0)}>&#11097;</button>
                <img src={scoop_img[1] || "/question.png"} className='img2' />
                <img src={scoop_img[2] || "/question.png"} className='img3' />
              </div>
            </>

            :

            <>
              <div className='two_scoop'>
                <img src={scoop_img[0] || "/question.png"} className='img1' /><button onClick={() => delete_img(0)}>&#11097;</button>
                <img src={scoop_img[1] || "/question.png"  } className='img2'/>
              </div>
            </>

          }
          
        </div>

        <div className='bread'>

          {select_typebread ?
            <img src='/funel.png'/>
            :
            <img src='/bowl.png'/>
          }
          
        </div>
        <button onClick={()=>navigate("/panel/Icecream")}>Icecream  </button>

      </div>

    </div>

  )
}
export default Icecream;
