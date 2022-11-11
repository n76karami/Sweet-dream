import React, { useEffect , useContext } from 'react'
import { Link, Outlet , useNavigate } from 'react-router-dom';
import { dbcontext } from '../Context';
import './panel.css';

const Panel = () => {

  // const db = useContext(dbcontext);
  // const navigate = useNavigate();

  // console.log(db)

  // useEffect(() => {

  //   // if (!db.current_user.isAdmin) return navigate("/login")
  //   {!db.current_user.isAdmin ?  navigate("/login") : ''}
    
  // }, [])
  
  
  return (
    
    <>
    
      {/* <h1> This is panel layout</h1> */}
      

      <div className='p_panel'>
          
        <div className='side_bar'>
          <div id='admin'> <img className='img' src='/profile.png'/>admin panel</div>
          <Link className='link' to="users">users</Link>
          <Link className='link' to="categories">categories</Link>
          <Link className='link' to="scoop">scoop</Link>
          <Link className='link' to="juiceFlavor">Juice flavors</Link>
          <Link className='link' to="Icecream">Icecream orders</Link>
          <Link className='link' to="Juice">juice orders</Link>
          <Link className='link' to="factors">factors</Link>  
        </div>

        <div className='context'>
          <Outlet />
        </div>  
        
      </div>
      

    </>

  )
}
export default Panel;
