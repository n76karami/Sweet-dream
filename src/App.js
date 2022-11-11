import React, { useState, useContext } from 'react';
import { dbcontext } from './Context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context";
import Panel from "./panel/Panel";
import Users from "./panel/Users";
import Web from "./web/Web";
import Login from "./web/Login";
import Categories from "./panel/Categories";
import Menu from "./web/Menu";
import Icecream_panel from "./panel/Icecream_panel";
import Icecream from "./web/Icecream";
import Userdashbord from "./web/Userdashbord";
import Payment from "./web/Payment";
import Factors from "./panel/Factors";
import History from "./web/History";
import Juice from "./web/Juice";
import Juice_panel from "./panel/Juice_panel";
import Scoop from "./panel/scoop";
import Juice_flavor from "./panel/juice_flavor";
import { useEffect } from "react";

// const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;

const defaultDBValue = {
  
  current_user: null,
  users: [
    {
      // number: Number,
      id: 1,
      name: 'admin',
      phone: '09355507051',
      email: 'naser.karami76@gmail.com',
      username: 'admin',
      password: '1234',
      isAdmin: true,//role
      state: false,
    }
  ],
  categories: [
    {  name: 'icecream', catId: 1  , icon : '/ice-cream.png'},
    {  name: 'juice', catId: 2 , icon : '/watermelon-smoothie.png' }
  ],
  scoop: [
    {
      id: 1,
      taste: 'chocolate',
      price: 5000,
      url : '/chocolate.png'
    },
    {
      id: 2,
      taste: 'mango',
      price: 7000,
      url : '/mango.png'
    },
    {
      id: 3,
      taste: 'Strawberry',
      price: 6000,
      url : '/Strawberry.png'
    },
    {
      id: 4,
      taste: 'Pistachio',
      price: 6000,
      url : '/Pistachio.png'
    },
    {
      id: 5,
      taste: 'vanilla',
      price: 4000,
      url : '/vanilla.png'
    }
  ],
  juiceFlavor: [
    {
      id: 1,
      flavor: 'watermelon',
      price: 30000,
      url : '/watermelon.png'
    },
    {
      id: 2,
      flavor: 'cherry',
      price: 20000,
      url : '/cherry.png'
    },
    {
      id: 3,
      flavor: 'pineapple',
      price: 40000,
      url : '/pineapple.png'
    },
    {
      id: 4,
      flavor: 'peach ',
      price: 15000,
      url : '/peach.png'
    },
    {
      id: 5,
      flavor: 'orange',
      price: 10000,
      url : '/orange.png'
    }
  ] ,
  Icecreams: [],
  juices: [],
  factors : []
}

const App = () => {

  const [loading, setLoading] = useState(true)
  const db = useContext(dbcontext);
  

  useEffect(() => {
    const x = localStorage.getItem("database")
    const y = x ? JSON.parse(x) : defaultDBValue
    db.updatedata(y)

    
    setLoading(false)
    
  },[])

  if (loading) return <h1>isloading</h1>

  return (
    
    
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Web/>}>
            <Route exact path="" element={<h1>This is Home page</h1>} />
            <Route exact path="login" element={<Login />} />
          </Route>
          
          <Route exact path="userdashbord" element={<Userdashbord/>}>
            <Route exact path="menu" element={<Menu/>} />
            <Route exact path="icecream" element={<Icecream/>} />
            <Route exact path="juice" element={<Juice/>} />
            <Route exact path="payment" element={<Payment/>} />
            <Route exact path="History" element={<History/>} />
          </Route> 
        
          <Route exact path="/panel" element={<Panel/>} >
            <Route exact path="users" element={<Users/>} />
            <Route exact path="categories" element={<Categories />} />
            <Route exact path="scoop" element={<Scoop />} />
            <Route exact path="juiceFlavor" element={<Juice_flavor />} />
            <Route exact path="Icecream" element={<Icecream_panel/>} />
            <Route exact path="Juice" element={<Juice_panel/>} />
            <Route exact path="factors" element={<Factors />} />
          </Route>

          <Route exact path="/*" element={<h1>error 404</h1>} />
          
        </Routes>
      </BrowserRouter>
    

  );
}

export default App;
