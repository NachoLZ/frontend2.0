import React from "react";
import { useState} from 'react'
import PropTypes from 'prop-types';
import './Login.css';
// components

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    
    <>
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
                      <form onSubmit={handleSubmit}>
                        <label>
                          <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email</p>
                          <input onChange={e => setUserName(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" />
                        </label>
                        <label >
                          <p className="block uppercase mt-4 text-blueGray-600 text-xs font-bold mb-2">Contraseña</p>
                          <input onChange={e => setPassword(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="password"  />
                        </label>
                        <div>
                          <button type="submit" className="ingresar text-lightBlue-500 bg-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">Ingresar</button>
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
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
