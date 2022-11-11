import React, { useState , useContext }  from 'react'

import { Outlet, useNavigate } from 'react-router-dom';

import { dbcontext } from '../Context';

import './web.css'

const Web = () => {


  const navigate = useNavigate();
  const db = useContext(dbcontext);

  return (
    <>
      <nav className='navbar'>

        <button onClick={() => navigate('/')}>Home</button>
        <img src='sd.jpg' />
        <button onClick={() => navigate('login')}>login</button>
        {db.data.current_user && db.data.current_user.state ?
          <button onClick={() => navigate('/userdashbord/menu')}>Menu</button>
          :
          ''
        }
        
        
      </nav>
      

      <Outlet/>

    </>
  )
}
export default Web;
