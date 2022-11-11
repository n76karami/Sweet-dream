import React, {useState, useContext } from 'react';
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;


const Scoop = () => {

  const navigate = useNavigate();


  // Add state
  const [scoopTaste, setscoopTaste] = useState('');
  const [scoopPrice, setscoopPrice] = useState();
  const [scoop_img, setscoop_img] = useState('');

  // Edit state
  const [e_scoopTaste, sete_scoopTaste] = useState('');
  const [e_scoopPrice, sete_scoopPrice] = useState();
  const [e_scoop_img, sete_scoop_img] = useState('');

  const [edit_modal, setedit_modal] = useState(false);
  const [id, setid] = useState('');

  

  const db = useContext(dbcontext);

  const modal = (item) => {

    setedit_modal(true);

    sete_scoopTaste(item.taste);
    sete_scoopPrice(item.price);
    sete_scoop_img(item.url);

    setid(item.id)
    
  }

  const submit = (id) => {
    
    if (!e_scoopTaste || !e_scoopPrice || !e_scoop_img) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }

    const x = db.data.scoop.some(item => (item.taste == e_scoopTaste || item.url == e_scoop_img) && item.id != id)
    if(x) return alert('اسکوپ تکراری!!!')

    const obj = {

      id: id,
      taste: e_scoopTaste,
      price: parseInt(e_scoopPrice),
      url: e_scoop_img
      
    }

    db.edit_Scoop(obj);

    setedit_modal(false);


  }

  // const submit = () => {
    
  //   if (!scoopTaste || !scoopPrice || !scoop_img ) {
  //     return alert('لطفا تمام قسمتها  را پر کنید'); 
  //   }

  //   const x = db.data.scoop.some(item => item.taste == scoopTaste || item.url == scoop_img)
  //   if(x) return alert('کاربر تکراری!!!!!')

  //   const obj = {
  //     id: UID(),
  //     taste: scoopTaste,
  //     price: parseInt(scoopPrice),
  //     url :scoop_img
  //   }

  //   db.add_Scoop(obj);

  //   setscoopTaste('');
  //   setscoopPrice('');
  //   setscoop_img('');

  //   console.log(obj)
  // }

  const newtr = db.data.scoop.map((item, index) => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_Scoop(index)}>&#10060;</button></td>
        <td><button className='edit' onClick={() => modal(item) }>&#9998;</button></td>
        <td>{item.url}</td>
        <td>{item.price}</td>
        <td>{item.taste}</td>   
      </tr>
    )
  })

  return (
    <>
      
      <div id='p-add'>

        <div id='in'>

          <input type="text" value={scoopTaste}
            onChange={e => setscoopTaste(e.target.value)}
            placeholder='Taste' />

          <input type="number" min="1" value={scoopPrice}
            onChange={e => setscoopPrice(e.target.value)}
            placeholder='price'/>
          
          <input type="text" value={scoop_img}
            onChange={e => setscoop_img(e.target.value)}
            placeholder='url' />
          
        </div> 
        
        <button onClick={() => {

          db.add_Scoop(scoopTaste, scoopPrice, scoop_img);
          setscoopTaste('');
          setscoopPrice('');
          setscoop_img('');

        }}>Add scoop</button>

        {/* <button className="fake" onClick={()=>navigate("/userdashbord/icecream")}>icecream</button>  */}
      
      </div>

      
      <div>
      <table className='panel-table'>
        <tr>

          <th>Delete</th>
          <th>Edit</th>
          <th>url</th>
          <th>Price</th>
          <th>Taste</th>
          
        </tr>
        {newtr}
        </table>
        {edit_modal ?
        <>
          <div className='edit-modal'>

            <div>

              <button className='close-btn' onClick={() => setedit_modal(false)}>{'\u274C'}</button>
              
            </div>
           
            <div>

              <span>scoopTaste : </span>

              <input type="text" value={e_scoopTaste}
                onChange={e => sete_scoopTaste(e.target.value)}
                placeholder='scoopTaste' />
              
            </div>
            
            <div>

              <span>scoopPrice : </span>

              <input type="number" value={e_scoopPrice}
                onChange={e => sete_scoopPrice(e.target.value)}
                placeholder='scoopPrice' />
              
            </div>
              
            <div>

              <span>scoopimg : </span>

              <input type="text" value={e_scoop_img}
                onChange={e => sete_scoop_img(e.target.value)}
                placeholder='scoop_img' />
              
            </div>
                  
            <div>

              <button className='edit-btn' onClick={() => submit(id)}>Edit User</button>

            </div>
            

          </div>
        </>
        :
        ''
      }
      </div>
      

      
      
      
    </>
  )
}

export default Scoop;