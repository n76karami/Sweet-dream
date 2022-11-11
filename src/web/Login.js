import React, { useState, useContext } from 'react'
import { dbcontext } from '../Context';
import { useNavigate } from "react-router-dom"
import './login.css'

const Login = () => {

  const navigate = useNavigate();

  const db = useContext(dbcontext);
  
  const [inputname, setinputname] = useState('');
  const [inputphone, setinputphone] = useState('');
  const [inputemail, setinputemail] = useState('');
  const [inputusername, setinputusername] = useState('');
  const [inputpassword, setinputpassword] = useState('');

  const [select_div, setselect_div] = useState(true);

  const sigin = (username, password) => {
    
    if(!username || !password ) return alert('لطفا تمام قسمتها  را پر کنید');

    const clone = JSON.parse(JSON.stringify(db.data))
    
    const user = clone.users.find(item => item.username == username)

    if (user && user.password == password) {
      user.state = true;
      clone.current_user = user;
      // console.log(clone.current_user)
      setinputusername('')
      setinputpassword('')
      
      alert('ورود شما با موفقیت انجام شد')

      db.updatedata(clone)
      
      return navigate("/userdashbord/menu")
    }
    alert('نام کاربری یا رمز عبور اشتباه است!!!')
    
    
  }

  // console.log(db)
  console.log(db.data)
  return (
    <>
      <div className='p_login'>

        <nav>
          <button onClick={() => setselect_div(true) }> sign up</button>
          <button onClick={() => setselect_div(false) }>sign in</button>
        </nav>

        <div className='p_select'>

          {select_div ?
          
            <div className='Register'>
              
              <div>
                <label>  Name : </label>
                <input type="text" value={inputname}
                  onChange={e => setinputname(e.target.value)}
                   />
              </div>

              <div>
                <label>  Phone :</label>
                <input type="text" value={inputphone}
                  onChange={e => setinputphone(e.target.value)}
                   />
              </div>

              <div>
                <label>  Email :</label>
                <input type="text" value={inputemail}
                  onChange={e => setinputemail(e.target.value)}
                   />
              </div>

              <div>
                <label>  Username :</label>
                <input type="text" value={inputusername}
                  onChange={e => setinputusername(e.target.value)}
                   />
              </div>

              <div>
                <label>  Password :</label>
                <input type="password" value={inputpassword}
                  onChange={e => setinputpassword(e.target.value)}
                   />
              </div>

              <button id='reg_btn' onClick={() => {
                db.add_user(inputname, inputphone, inputemail, inputusername, inputpassword);
                setinputname('');
                setinputphone('');
                setinputemail('');
                setinputusername('');
                setinputpassword('');
              }}> sign up  </button>
              <button onClick={()=>navigate("/panel/users")}>users</button> 

            </div> 

            :

            <div className='login'>
              <div>
                <label> Username :</label>
                <input type="text" value={inputusername}
                  onChange={e => setinputusername(e.target.value)}
                   />
              </div>

              <div>
                <label> Password :</label>
                <input type="text" value={inputpassword}
                  onChange={e => setinputpassword(e.target.value)}
                   />
              </div>

              <button id='login_btn' onClick={() => sigin(inputusername, inputpassword)}> sign in </button>
              
              <button onClick={()=>navigate("/panel/users")}>users</button> 
            </div>
          }
          
        </div>
      
      </div>
      
    </>
  )
}
export default Login;
