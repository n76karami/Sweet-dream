import React , {useContext, useState} from 'react'
import { dbcontext } from '../Context';
import './users.css';

const Users = () => {


  // Add state
  const [inputname, setinputname] = useState('');
  const [inputphone, setinputphone] = useState('');
  const [inputemail, setinputemail] = useState('');
  const [inputusername, setinputusername] = useState('');
  const [inputpassword, setinputpassword] = useState('');
  
  // Edit state
  const [e_inputname, sete_inputname] = useState('');
  const [e_inputphone, sete_inputphone] = useState('');
  const [e_inputemail, sete_inputemail] = useState('');
  const [e_inputusername, sete_inputusername] = useState('');
  const [e_inputpassword, sete_inputpassword] = useState('');

  const [edit_modal, setedit_modal] = useState(false);


  const [id , setid] = useState('')

  const db = useContext(dbcontext);

  // console.log(db)

  const modal = (item) => {

    setedit_modal(true);

    sete_inputname(item.name);
    sete_inputphone(item.phone);
    sete_inputemail(item.email);
    sete_inputusername(item.username);
    sete_inputpassword(item.password);

    setid(item.id)
  }

  const submit = (id) => {

    if (!e_inputname || !e_inputphone || !e_inputemail || !e_inputusername || !e_inputpassword) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }

    const doesusernameexist = db.data.users.some(user => user.username == e_inputusername && user.id != id)
    if(doesusernameexist) return alert('کاربر تکراری!!!!!')


    const obj = {

      id: id,
      name: e_inputname,
      phone: e_inputphone,
      email: e_inputemail,
      username: e_inputusername,
      password: e_inputpassword
      
    }

    
    

    db.edit_User(obj)

    setedit_modal(false);

    console.log(obj)
    console.log(id)
  }

  

  const newTR = db.data.users.map((item, index) => {
    
    return (
      <tr>
        <td><button className='delete' onClick={()=>db.delete_user(index)}>&#10060;</button></td>
        <td><button className='edit' onClick={() => modal(item) }>&#9998;</button></td>
        <td>{item.state ? "active":'inactive'}</td>
        <td>{item.isAdmin ?  "admin":'user'}</td>
        <td>{item.password}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.name}</td>
      </tr>
    )
  })

  

  return (
    <>
      <div id='p-add'>

        <div id='in'>

          <input type="text" value={inputpassword}
            onChange={e => setinputpassword(e.target.value)}
            placeholder='password' />

          <input type="text" value={inputusername}
            onChange={e => setinputusername(e.target.value)}
            placeholder='Username' />
          
          <input type="text" value={inputemail}
            onChange={e => setinputemail(e.target.value)}
            placeholder='Email' />
          
          <input type="text" value={inputphone}
            onChange={e => setinputphone(e.target.value)}
            placeholder='Phone' />
          
          <input type="text" value={inputname}
            onChange={e => setinputname(e.target.value)}
            placeholder='Name' />
          
        </div> 
        
        <button onClick={() => {
          db.add_user(inputname, inputphone, inputemail, inputusername, inputpassword);
          setinputname('');
          setinputphone('');
          setinputemail('');
          setinputusername('');
          setinputpassword('');
        }}>Add User</button>

      </div>

      <table className='panel-table'>
        <tr>
          <th>Delete</th>
          <th>Edit</th>
          <th>State</th>
          <th>Role</th>
          <th>password</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Name</th>
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

              <span>Name : </span>

              <input type="text" value={e_inputname}
                onChange={e => sete_inputname(e.target.value)}
                placeholder='Name' />
              
            </div>
            
            <div>

              <span>Phone : </span>

              <input type="text" value={e_inputphone}
                onChange={e => sete_inputphone(e.target.value)}
                placeholder='Phone' />
              
            </div>
            
            <div>

              <span>Email : </span>

              <input type="text" value={e_inputemail}
                onChange={e => sete_inputemail(e.target.value)}
                placeholder='Email' />
              
            </div>
            
            <div>

              <span>Username : </span>

              <input type="text" value={e_inputusername}
                onChange={e => sete_inputusername(e.target.value)}
                placeholder='Username' />
              
            </div>
            
            <div>

              <span>Password : </span>

              <input type="text" value={e_inputpassword}
                onChange={e => sete_inputpassword(e.target.value)}
                placeholder='password' />
              
            </div>
            
            <div>

              <button className='edit-btn' onClick={() => submit(id)}>Edit User</button>

            </div>
            

          </div>
        </>
        :
        ''
      }

    </> 
  )
}
export default Users;
