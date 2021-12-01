import React, { useState, useCallback, useEffect } from 'react';
import $ from "jquery";
import Form from 'react-bootstrap/Form';
import Sugerir from './Sugerir';

// components





function Precio({state, onStateChange}) {
  const [showMe, setShow] = useState(0)


  const triggerSugerir = () => {
    setShow(1);
  }
  
  return (
    <>
      
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Ponle precio o déjanos sugerirte uno :)</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Continuar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
          {showMe === 0 &&(
            <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
               
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio
                  </label>
                  <Form.Control name="nombre"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" placeholder="$20000" />
                  <div className="relative w-full mt-4">
                  <Sugerir sugerir={() =>{triggerSugerir();
                      }}/>  
                </div>
                </div>
                
              </div>
              
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <div className="text-center border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">La sugerencia de precio es una herramienta que propone un precio competitivo para facilitar la venta rápida del producto. El resultado puede tardar unos segundos en aparecer.</div>
                </div>
              </div>
            </div>
            </div>
            )} {
              showMe === 1 &&
              <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
               
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio
                  </label>
                  <Form.Control name="nombre" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" placeholder="$20000" />
                  <div className="relative w-full mt-4">
                  <div className="text-sm">¡Encontramos tu producto!</div>
                  <div className="text-sm">El precio que te sugerimos es de </div>
                </div>
                </div>
                
              </div>
              
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <div className="text-center border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">La sugerencia de precio es una herramienta que propone un precio competitivo para facilitar la venta rápida del producto. El resultado puede tardar unos segundos en aparecer.</div>
                </div>
              </div>
            </div>
            </div>
            

          }
          </form>
        </div>
      </div>
    
      
      
    </>
  );
}

export default Precio;