import React , {useContext , useState} from 'react'
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"
import './categories.css';

const Categories = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);

  // Add state
  const [inputcatName, setinputcatName] = useState('');
  const [inputicon, setinputicon] = useState('');
  const [Cat_id, setCat_id] = useState(1);

  // Edit state
  const [e_inputcatName, sete_inputcatName] = useState('');
  const [e_inputicon, sete_inputicon] = useState('');
  const [edit_modal, setedit_modal] = useState(false);
  const [id, setid] = useState('');

  const modal = (item) => {

    setedit_modal(true);

    sete_inputcatName(item.name);
    sete_inputicon(item.icon);
    
    setid(item.catId);

  }

  const submit = (id) => {

    if (!e_inputcatName || !e_inputicon) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }

    const doescatNameexist = db.data.categories.some(item => item.name == e_inputcatName && item.id != id)
    if(doescatNameexist) return alert('کاربر تکراری!!!!!')


    const obj = {

      name: e_inputcatName,
      icon : e_inputicon ,
      catId: id,
      
    }

    
    

    db.edit_Cat(obj)

    setedit_modal(false);

    console.log(obj)
    console.log(id)
  }


  const newTR = db.data.categories.map((item, index) => {

    return (
      <tr>
        <td><button className='delete' onClick={() => db.delete_Cat(index)}>&#10060;</button></td>
        <td><button className='edit' onClick={() => modal(item) }>&#9998;</button></td>
        <td>{item.icon}</td>
        <td>{item.catId}</td>
        <td>{item.name}</td>
      </tr>
    )
  })

  return (
    <>
      <div id='p-cat'>

        <div className='input-cat'>

          <input type="text" value={inputicon}
            onChange={e => setinputicon(e.target.value)}
            placeholder='icon address' />
          
          <input type="text" value={inputcatName}
            onChange={e => setinputcatName(e.target.value)}
            placeholder='categorie' />

        </div>

        <button id='add-cat' onClick={() => {

          db.add_Cat(inputcatName, inputicon, Cat_id);
          setinputcatName('');
          setinputicon('');
          setCat_id(Cat_id + 1);

        }}>Add new categorie</button>

        <table className='panel-table'>

          <tr>
            <th>Delete</th>
            <th>Edit</th>
            <th>icon</th>
            <th>categorie Id</th>
            <th>categories</th>
          </tr>
          {newTR}

        </table>

        {edit_modal ?
        <>
          <div className='edit-modal'>

            <div>

              <button className='close-btn' onClick={() => setedit_modal(false)}>{'\u274C'}</button>
              
            </div>
           
            <div>

              <span>CatName : </span>

              <input type="text" value={e_inputcatName}
                onChange={e => sete_inputcatName(e.target.value)}
                placeholder='Name' />
              
            </div>
            
            <div>

              <span>icon : </span>

              <input type="text" value={e_inputicon}
                onChange={e => sete_inputicon(e.target.value)}
                placeholder='Phone' />
              
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
      <button onClick={()=>navigate("/userdashbord/menu")}>menu</button> 
    </>
  )
}
export default Categories;
