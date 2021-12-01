import React from "react";
import Form from 'react-bootstrap/Form';
import { useState} from 'react'
// components

export default function CardSettings() {
  const [state, setState] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    estado: "",
    descripcion: "",
    precio:""
  })

  const saveStateToLocalStorage = () => { 
    localStorage.setItem('state', JSON.stringify(state)); 
  } 


  const getStateFromLocalStorage = () => { 
      let data = localStorage.getItem('state'); 
      if(data !== undefined) { 
          setState(JSON.parse(data)); 
      } 
  } 

  function handleChange(event) {
      const value = event.target.value;
      setState({ ...state,
          [event.target.name]: value
      });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Describe tu producto</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={() =>{
                saveStateToLocalStorage();}}
            >
              Continuar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
               
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre del producto
                  </label>
                  <Form.Control name="nombre" value={state.nombre} onChange={handleChange} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" placeholder="Ej: Televisor LED, 42 pulgadas" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Categoría
                  </label>     
                    <Form.Control value={state.categoria} onChange={handleChange} name="categoria" as="select" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="select" placeholder="Electrodomésticos">
                        <option value="Electrodomésticos">Electrodomésticos</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Televisores">Televisores</option>
                        <option value="Videojuegos">Videojuegos</option>
                    </Form.Control> 
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Marca
                  </label>
                  <Form.Control placeholder="Ej: Samsung" value={state.marca} onChange={handleChange} name="marca" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Estado
                  </label>
                  <Form.Control value={state.estado} onChange={handleChange} name="estado" as="select" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="select" placeholder="Seleccione estado">
                    <option value="Perfecto">Perfecto</option>
                    <option value="Muy bueno">Muy bueno</option>
                    <option value="Bueno">Bueno</option>
                    <option value="No tan bueno">No tan bueno</option>
                    <option value="Mínimo funcional">Mínimo funcional</option>
                  </Form.Control>

                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Descripción
                  </label>
                  <Form.Control value={state.descripcion} onChange={handleChange} name="descripcion" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" as="textarea" type="text" rows={5}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
