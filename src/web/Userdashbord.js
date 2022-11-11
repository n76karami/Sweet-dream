import React, { useState ,useContext} from 'react'
import { Outlet , useNavigate } from 'react-router-dom';
import { dbcontext } from '../Context';

const Userdashbord = () => {

  const db = useContext(dbcontext);

  const [modal, setmodal] = useState(false);

  const navigate = useNavigate();

  const modalToggle = () => {
    setmodal(!modal);
  }

  const sign_out = () => {
    // db.data.current_user.state = false;

    const clone = JSON.parse(JSON.stringify(db.data))

    const user = clone.users.find(item => item.username == clone.current_user.username)

    user.state = false;

    clone.current_user = user;

    db.updatedata(clone)


    navigate("/")
  }

  // console.log(db.data.current_user.state)

  return (
    <>
      <nav className='navbar'>
        <button>
          {!db.data.current_user.isAdmin && db.data.current_user.state ?
            <img src='/account.png' onClick={modalToggle} />
            :
            <>
              {db.data.current_user.isAdmin && db.data.current_user.state ?
                <img src='/profile.png' onClick={modalToggle} />
                :
                <img src='/account.png' onClick={modalToggle} />  
              }
            </>
            
          }
         
        </button>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/userdashbord/menu')}>Menu</button>
        <button onClick={() => navigate('/userdashbord/payment')}>Cart</button>
      </nav>

      {modal ?
        <div className='modal'>
          
          {!db.data.current_user.isAdmin && db.data.current_user.state ?
            <>
              <button>{db.data.current_user.username}</button>
              <button onClick={() => navigate('/userdashbord/History')} >purchase history</button>
              <button onClick={sign_out}>sign out</button>
              
            </>
            
            :
            <>
              {db.data.current_user.isAdmin && db.data.current_user.state ?
                <>
                  
                  <button>{db.data.current_user.username}</button>
                  <button onClick={() => navigate('/panel')}>panel</button>
                  <button onClick={sign_out}>sign out</button>

                </>
              :
              <button onClick={() => navigate('/login')}>sign up / sign in</button>
            }
            </>
            
           }
          
        </div>
       : ''}

      <div>
        <Outlet/>
      </div>
  </>
  )
}
export default Userdashbord;
