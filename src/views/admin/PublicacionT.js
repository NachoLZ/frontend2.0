import React, { useState, useEffect } from 'react';
import Component from "react-component-component";
import $ from "jquery";
import CurrencyInput from './CurrencyInput';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_chileLow from "@amcharts/amcharts4-geodata/chileLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; 
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Chart } from "react-google-charts";
import "./Publicacion.css";

export default function PublicacionT({state}) {
  const fetch = require('node-fetch');
  const [showMe, setShow] = useState(0)
  const [showMarket, setMarket] = useState(0)
  const [resp, setResp] = useState("")
  const [resp2, setResp2] = useState("")
  const [noticias, setNoticias] = useState("")
  const [interesRegion, setInteresRegion] = useState("")
  const [txt, setTxt] = useState("")
  const [stateNew, onStateChange] = useState(state)

  function handleChange(event) {
    const value = event.target.value;
    onStateChange({ ...state,
        [event.target.name]: value
     });
  }

  function handleActive() {
    onStateChange({ ...state,
        activa: 0
     });
  }

  useEffect(() => {
    $.ajaxSetup({
      contentType: "application/json; charset=utf-8"
    });

    fetch('http://localhost:8000/topicos/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(text))
      .then(text => setTxt(JSON.parse(text).map((d) => <a className="linkripley" href={d.linkProd}>{d.nameProd}<br /></a>)))

    fetch('http://localhost:8000/noticias/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(JSON.parse(text)))
      .then(text => setNoticias(text))

    fetch('http://localhost:8000/interesRegion/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(text))
      .then(text => setInteresRegion(text))


  }, [])


  async function doWork() {
    // ajax the JSON to the server
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/receiver", JSON.stringify(state), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp(response)
      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(response);
    });
    // stop link reloading the page
  }

  async function triggerGuardar() {
    // ajax the JSON to the server
    alert("Precio guardado!")
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/pricechange", JSON.stringify(stateNew), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp2(response.json())
      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(response.json());
    });
    // stop link reloading the page
  }

  async function triggerActiva() {
    // ajax the JSON to the server
    alert("Publicación terminada!")
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/activechange", JSON.stringify(stateNew), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp2(response.json())
      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(response.json());
    });
    // stop link reloading the page
  }


  const triggerSugerir = () => {
    setShow(1);
  }

  const triggerMarket = () => {
    setMarket(1);
  }

  const hideMarket = () => {
    setMarket(0);
  }

  const saveStateToLocalStorage = () => { 
    localStorage.setItem('state', JSON.stringify(state));
  }



  return (
    <div className="px-4 py-4">
        <div className="flex-auto pt-0 shadow-xl rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
                    <h6 className=" text-blueGray-700 text-l font-bold">{state.nombre}</h6>
              </div>
          </div>
                              
          <form>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              
          </h6>
          <div className="flex flex-wrap">
              
              <div className="relative w-6/12 mb-3 px-4">
                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Categoría
                  </label>     
                  <div className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{state.categoria}</div>
              </div>
              
              <div className="relative w-6/12 mb-3 px-4">
                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Marca
                  </label>
                  <div className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{state.marca}</div>
              </div>
              

              <div className="relative w-6/12 px-4">
                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Modelo
                  </label>
                  <div className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{state.modelo}</div>

              </div>
            <div className="relative w-6/12 mb-1 px-4">
              
                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Precio
                  </label>
              <div className="flex">
              <CurrencyInput name="precio" value={stateNew.precio} onChange={handleChange} className="border-0 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" />

              
              </div>
              
            </div>
            

              
              
              <div className="mt-2 lg:w-12/12 px-4 mb-4 relative w-full mb-3">

                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Descripción
                  </label>
                  <div className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{state.descripcion}</div>

            </div>
          </div>
         
        </form>
        
      </div>
      
    </div>

   
  );
}