import React, { useState, useEffect } from 'react'
import { createContext } from 'react';

export const dbcontext = createContext();

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 8)}`;

const Context = ({ children }) => {
  

  // const [Number, setNumber] = useState(1);

  // admin
  // const [currentadmin , setcurrentadmin] = useState('')
  // USERS STATES
  // const [inputname, setinputname] = useState('');
  // const [inputphone, setinputphone] = useState('');
  // const [inputemail, setinputemail] = useState('');
  // const [inputusername, setinputusername] = useState('');
  // const [inputpassword, setinputpassword] = useState('');

  // const [currentuser, setcurrentuser] = useState('');
  // CATEGORIES STATES
  // const [Cat_id, setCat_id] = useState(1);
  // const [inputcatName, setinputcatName] = useState('');
  // const [inputicon, setinputicon] = useState('');
  

  const [db, setdb] = useState(null)

  useEffect(() => {
    if (db) {
      // setlocalstorage
      localStorage.setItem("database", JSON.stringify(db))
    }
  }, [db])

  //add user to array
  const addUser = (inputname,inputphone,inputemail,inputusername,inputpassword) => {

    if (!inputname || !inputphone || !inputemail || !inputusername || !inputpassword) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }
  
    const ar = { ...db }
    
    const doesusernameexist = ar.users.some(item => {
      return item.username == inputusername 
      })
      
    if (doesusernameexist) return alert('کاربر تکراری!!!!!')

    const obj = {
      // number: Number + 1,
      id: UID(),
      name: inputname,
      phone: inputphone,
      email: inputemail,
      username: inputusername,
      password: inputpassword,
      isAdmin: false,
      state: false
    }
   

    ar.users.push(obj)
    setdb(ar)
    // setinputname('')
    // setinputphone('')
    // setinputemail('')
    // setinputusername('')
    // setinputpassword('')
    // setNumber(Number + 1)
    alert('ثبت نام شما با موفقیت انجام شد')
  }

  //delete user from array
  const deleteUser = (index) => {
    const ar = { ...db }
    ar.users.splice(index, 1);
    setdb(ar);
  }

  // edit user
  const editUser = (obj) => {
    
    const ar = { ...db }

    const newUser = ar.users.find(item => item.id == obj.id)

    newUser.name = obj.name;
    newUser.phone = obj.phone;
    newUser.email = obj.email;
    newUser.username = obj.username;
    newUser.password = obj.password;

    console.log(newUser)

    // ar.users.forEach(item => {
    //   if (item.id == obj.id) {
    //     item.name = obj.name
    //   }
    //   console.log(item.name)
    //   console.log(item.id)
    // })

    setdb(ar)

  }
  

  //sign in

  // console.log(currentuser)

  // add categories
  const addCat = (inputcatName, inputicon, Cat_id) => {

    if (!inputcatName || !inputicon) return alert('لطفا  ابتدا تمام قسمتها را کنید');
       
    const ar = { ...db }
    
    const checkcat = ar.categories.some(item => {
      return (item.name == inputcatName || item.icon == inputicon)
    })

    if(checkcat) return alert('نام دسته یا آدرس آیکون تکراری است')

    const obj = {
      // number: Number + 2,
      name: inputcatName,
      catId: Cat_id + 2,
      icon : inputicon
    }

    ar.categories.push(obj);
    setdb(ar);
    // setinputcatName('');
    // setinputicon('')
    // setNumber(Number + 1);
    // setCat_id(Cat_id + 1);

  }

  //delete categories
  const deleteCat = (index) => {
    
    const ar = { ...db }
    ar.categories.splice(index, 1);
    setdb(ar)

  }

  // Edit cat
  const editCat = (obj) => {
    
    const ar = { ...db }

    const newCat = ar.categories.find(item => item.catId == obj.catId)

    newCat.name = obj.name;
    newCat.icon = obj.icon;

    setdb(ar)

  }

  // add scoop
  const addScoop = (scoopTaste, scoopPrice, scoop_img) => {
    // const ar = { ...db }
    
    // ar.scoop.push(obj)

    // setdb(ar)

    if (!scoopTaste || !scoopPrice || !scoop_img) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }
  
    const ar = { ...db }
    
    const doesusernameexist = ar.scoop.some(item => {
      return (item.taste == scoopTaste || item.url == scoop_img)  
      })
      
    if (doesusernameexist) return alert('اسکوپ تکراری!!!!!')

    const obj = {
      // number: Number + 1,
      id: UID(),
      taste: scoopTaste,
      price: parseInt(scoopPrice),
      url: scoop_img,
      
    }

    ar.scoop.push(obj)
    setdb(ar)
    
  }

  // delete scoop
  const deleteScoop = (index) => {

    const ar = { ...db }
    ar.scoop.splice(index, 1);
    setdb(ar)

  }

  // Edit scoop
  const editScoop = (obj) => {
    
    const ar = { ...db }

    const newscoop = ar.scoop.find(item => item.id == obj.id)

    newscoop.taste = obj.taste;
    newscoop.price = obj.price;
    newscoop.url = obj.url;

    // console.log(newscoop)

    setdb(ar)
  
  }

  // add juiceFlavor
  const addJuiceFlavor = (juice_flavor, juice_price, juice_img) => {
    
    // const ar = { ...db }
    
    // ar.juiceFlavor.push(obj)

    // setdb(ar)

    if (!juice_flavor || !juice_price || !juice_img ) {
      return alert('لطفا تمام قسمتها  را پر کنید'); 
    }

    const ar = { ...db }
    
    const doesusernameexist = ar.juiceFlavor.some(item => {
      return (item.flavor == juice_flavor || item.url == juice_img)  
      })
      
    if (doesusernameexist) return alert('طعم آبمیوه تکراری!!!!!')

    const obj = {

      id :UID(),
      flavor: juice_flavor,
      price: parseInt(juice_price),
      url: juice_img
      
    }

    ar.juiceFlavor.push(obj)
    setdb(ar)

  }

  // delete juiceFlavor
  const deleteJuiceFlavor = (index) => {
    
    const ar = { ...db }
    ar.juiceFlavor.splice(index, 1);
    setdb(ar)

  }

  // Edit juiceFlavor
  const editJuiceFlavor = (obj) => {
    
    const ar = { ...db }
    
    const newJuiceFlavor = ar.juiceFlavor.find(item => item.id == obj.id)

    newJuiceFlavor.flavor = obj.flavor;
    newJuiceFlavor.price = obj.price;
    newJuiceFlavor.url = obj.url;

    setdb(ar);

  }

  
  // add new icecream
  const addIcecream = (obj) => {
    
    const ar = { ...db }
    
    ar.Icecreams.push(obj)

    setdb(ar)
    

    // console.log(db)
  }

  //delete icecream
  const deleteIcecream = (id) => {
    
    const ar = { ...db }
    const index = ar.Icecreams.findIndex(item => item.id == id)
    ar.Icecreams.splice(index, 1);
    setdb(ar)

  }

  //add juice
  const addjuice = (obj) => {
    
    const ar = { ...db }

    ar.juices.push(obj)

    setdb(ar);

  }

  // delete juice
  const deleteJuice = (id) => {
    
    const ar = { ...db }
    const index = ar.juices.findIndex(item => item.id == id)
    ar.juices.splice(index, 1);
    setdb(ar)

  }

  //add factor
  const addfactor = (obj) => {
    
    const ar = { ...db }
    
    ar.factors.push(obj)

    setdb(ar)

  }

  //delete factor
  const deletefactor = (id) => {

    const ar = { ...db }
    const index = ar.factors.findIndex(item => item.id == id)
    ar.factors.splice(index, 1);
    setdb(ar)

  }


  return (
    <dbcontext.Provider value={{
      data: db,
      updatedata : setdb ,
      // updateNumber: setNumber,
      add_user: addUser,
      delete_user: deleteUser,
      edit_User: editUser,
      // input_name: inputname,
      // input_phone: inputphone,
      // input_email: inputemail,
      // input_username: inputusername,
      // input_password: inputpassword,
      // current_admin : currentadmin,
      // current_user: currentuser,
      // update_currentadmin : setcurrentadmin,
      // update_currentuser: setcurrentuser,
      // updateinput_name: setinputname,
      // updateinput_phone: setinputphone,
      // updateinput_email: setinputemail,
      // updateinput_username: setinputusername,
      // updateinput_password: setinputpassword,
      // sign_in: sigin,
      // input_catName: inputcatName,
      // input_icon: inputicon,
      // updateinput_icon : setinputicon,
      // updateinput_catName : setinputcatName ,
      add_Cat: addCat,
      delete_Cat: deleteCat,
      edit_Cat : editCat,
      // update_Cat_id: setCat_id,
      add_Scoop: addScoop,
      delete_Scoop: deleteScoop,
      edit_Scoop : editScoop ,
      add_JuiceFlavor: addJuiceFlavor,
      delete_JuiceFlavor: deleteJuiceFlavor,
      edit_JuiceFlavor : editJuiceFlavor,
      add_Icecream: addIcecream,
      delete_Icecream: deleteIcecream,
      add_juice: addjuice,
      delete_Juice : deleteJuice,
      add_factor: addfactor,
      delete_factor : deletefactor
    }}>
      {children}
    </dbcontext.Provider>
  )

}
export default Context;
