import React, { useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import './Admin.css';
import Form from 'react-bootstrap/Form';
// components

import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import PasoDos from "views/admin/PasoDos.js";
import PasoTres from "views/admin/PasoTres";
import PasoUno from "views/admin/PasoUno";
import Tables from "views/admin/Tables.js";
import Publicaciones from "views/admin/Publicaciones";

export default function Admin() {

  const [state, setState] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    modelo: "",
    descripcion: "",
    dia: "",
    mes: "",
    precio: "",
    fecha: "",
    activa: 1,
    email: "",
    sugerencias: [],
    fechas_sug: []
  })

  const [dummy, setDummy] = useState({
    email: "",
  })

  const [showLogin, setLogin] = useState(0)

  function handleChange(event) {
    const value = event.target.value;
    setState({ ...state,
        [event.target.name]: value
     });
  }

  function handleDummy(event) {
    const value = event.target.value;
    setDummy({ ...dummy,
        [event.target.name]: value
     });
  }

  function triggerRegister() {
    alert("Usuario registrado!");
  }
  


  const saveStateToLocalStorage = () => { 
        localStorage.setItem('state', JSON.stringify(state)); 
  }


  
  const triggerLogin = () => {
    setState({ ...state,
      email: dummy.email
   });
  }

  const triggerLogout = () => {
    setLogin(0);
    setState({
      ...state,
      email: ""
   });
   saveStateToLocalStorage();
  }


  return (
    
    <>
      
      {state.email === "" && (
      
      <div className="bgsquare relative vh-100 h-100 bg-blueGray-100">
          <HeaderStats />
          
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap ">
        <div className="mx-auto md:w-6/12 xl:w-4/12 xxl:w-4/12 px-4 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className=" text-blueGray-700 text-xl font-bold">Iniciar Sesión</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full mx-auto lg:w-full px-4">
                <div className="relative w-full mb-3">
                    <div className="login-wrapper">
                      <form>
                        <label>
                          <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email</p>
                          <Form.Control name="email" value={dummy.email} onChange={handleDummy} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" />
                        </label>
                        <label >
                          <p className="block uppercase mt-4 text-blueGray-600 text-xs font-bold mb-2">Contraseña</p>
                          <input  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="password"  />
                        </label>
                          <div className="mt-2">
                              <button  onClick={() =>{triggerRegister();}} className="ml-1 text-lightBlue-500 bg-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">Registrar</button>
                                <button onClick={() => {
                                  triggerLogin();
                                  saveStateToLocalStorage();}} className="ingresar text-lightBlue-500 bg-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">Ingresar</button>
                                
                        </div>
                      </form>
                    </div>
                </div>
              </div>                
            </div>
          </div>
        </div>
        </div>
      </div>


        </div>
      </div>

      
      )} {
        state.email !== "" && 
      
          <div>
      
      <Sidebar onClick={() => {
                                  triggerLogout();
                                  }}/>
      
      <div className="bgsquare relative md:ml-64 vh-100 h-100 bg-blueGray-100">
      
        {/*<AdminNavbar />*/}
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/settings" exact onChange={saveStateToLocalStorage()} render={(props) => <PasoUno state={state} onStateChange={setState} />} />
            <Route path="/admin/dashboard" exact onChange={saveStateToLocalStorage()} render={(props) => <PasoDos state={state} onStateChange={setState} />} />
            <Route path="/admin/maps" exact onChange={saveStateToLocalStorage()} render={(props) => <PasoTres state={state} onStateChange={setState} />} />
            <Route path="/admin/tables" exact onChange={saveStateToLocalStorage()} render={(props) => <Tables state={state} onStateChange={setState} />} />
            <Route path="/admin/history" exact render={(props) => <Publicaciones state={state} />}/>
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="footer relative py-12 bg-blueGray-100">
        <FooterAdmin />
            </div>
      </div>}      
    </>
  );
}
