import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { dbcontext } from '../Context';

import './Menu.css'

const Menu = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);
  // console.log(db)


  const newcat = db.data.categories.map(item => { 
    
    return (
      
      <div className='new-cat'>

        <button onClick={ () => navigate(`/userdashbord/${item.name}`) }>
          
          <img src={item.icon} />
        
          <h1>{item.name}</h1>
          
        </button>

      </div>
    )
  })

  
  return (
    <div className='p-menu'>

      <div className='title'>

        <img src='/restaurant-menu.png' />

        {/* <h1>منوی ما</h1> */}

      </div>

      {newcat}

      <button onClick={() => navigate('/panel/users')}>users</button>

    </div>
  )
}
export default Menu;
