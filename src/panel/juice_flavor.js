import React, {useState, useContext } from 'react';
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"


const Juice_flavor = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);

  // Add state
  const [juice_flavor, setjuice_flavor] = useState('');
  const [juice_price, setjuice_price] = useState();
  const [juice_img, setjuice_img] = useState('');

  // Edit state
  const [e_juice_flavor, sete_juice_flavor] = useState('');
  const [e_juice_price, sete_juice_price] = useState();
  const [e_juice_img, sete_juice_img] = useState('');

  const [edit_modal, setedit_modal] = useState(false);
  const [id, setid] = useState('');

  const modal = (item) => {

    setedit_modal(true);

    sete_juice_flavor(item.flavor);
    sete_juice_price(item.price);
    sete_juice_img(item.url);

    setid(item.id)

  }

  const submit = (id) => {
    
    if (!e_juice_flavor || !e_juice_price || !e_juice_img) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }

    const x= db.data.juiceFlavor.some(item =>(item.flavor == e_juice_flavor || item.url == e_juice_img) && item.id != id)
    if (x) return alert('طعم آبمیوه تکراری!!!!!')
    
    const obj = {

      id :id,
      flavor: e_juice_flavor,
      price: parseInt(e_juice_price),
      url: e_juice_img

    }

    db.edit_JuiceFlavor(obj);

    setedit_modal(false);

  }

  // const submit = () => {
    
  //   if (!juice_flavor || !juice_price || !juice_img ) {
  //     return alert('لطفا تمام قسمتها  را پر کنید'); 
  //   }

  //   const obj = {
  //     flavor: juice_flavor,
  //     price: parseInt(juice_price),
  //     url :juice_img
  //   }

  //   db.add_JuiceFlavor(obj);

  //   setjuice_flavor('');
  //   setjuice_price('');
  //   setjuice_img('');

  //   console.log(obj)
  // }


  const newtr = db.data.juiceFlavor.map((item, index) => {
    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_JuiceFlavor(index)}>&#10060;</button></td>
        <td><button className='edit' onClick={() => modal(item) }>&#9998;</button></td>
        <td>{item.url}</td>
        <td>{item.price}</td>
        <td>{item.flavor}</td>   
      </tr>
    )
  })

  return (
    <>
      
      
      <div id='p-add'>

        <div id='in'>

          <input type="text" value={juice_flavor}
            onChange={e => setjuice_flavor(e.target.value)}
            placeholder='Taste' />

          <input type="number" min="1" value={juice_price}
            onChange={e => setjuice_price(e.target.value)}
            placeholder='price'/>
          
          <input type="text" value={juice_img}
            onChange={e => setjuice_img(e.target.value)}
            placeholder='url' />
          
        </div> 
        
        <button onClick={() => {
          
          db.add_JuiceFlavor(juice_flavor, juice_price, juice_img);
          setjuice_flavor('');
          setjuice_price('');
          setjuice_img('');

        }}>Add juice flavor</button>
          
          {/* <button onClick={()=>navigate("/userdashbord/juice")}>juice</button> */}
      
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

                <span>juice flavor : </span>

                <input type="text" value={e_juice_flavor}
                  onChange={e => sete_juice_flavor(e.target.value)}
                  placeholder='juice flavor' />
              
              </div>
            
              <div>

                <span>juice price : </span>

                <input type="number" value={e_juice_price}
                  onChange={e => sete_juice_price(e.target.value)}
                  placeholder='juice price' />
              
              </div>
              
              <div>

                <span>juice img : </span>

                <input type="text" value={e_juice_img}
                  onChange={e => sete_juice_img(e.target.value)}
                  placeholder='juice img' />
              
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

export default Juice_flavor