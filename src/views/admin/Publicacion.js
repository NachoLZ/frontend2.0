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
import { format } from "date-fns";
import { Dates } from './importantDates';

export default function Publicacion({state}) {
  const fetch = require('node-fetch');
  const [showMe, setShow] = useState(0)
  const [showMarket, setMarket] = useState(0)
  const [resp, setResp] = useState("")
  const [resp2, setResp2] = useState("")
  const [noticias, setNoticias] = useState("")
  const [txt, setTxt] = useState("")
  const [stateNew, onStateChange] = useState(state)
  const [interesRegion, setInteresRegion] = useState("")
  const [interesTiempo, setInteresTiempo] = useState("")
  const [showAll, setAll] = useState(1)
  const [conf, setConf] = useState(0)
  const [showGraph, setGraph] = useState(0)
  const [imagenGraficoMeses,setImagenGraficoMeses] = useState("")
  const [imagenGraficoPais,setImagenGraficoPais] = useState("")
  const [imagenEstimacionMeses,setImagenEstimacionMeses] = useState("")
  const [imagenDistribucionMarcas,setImagenDistribucionMarcas] = useState("")
  const [imagenHistograma,setImagenHistograma] = useState("")
  const [imagenVentasDoceMeses,setImagenVentasDoceMeses] = useState("")
  const [imagenVentasSeisMeses,setImagenVentasSeisMeses] = useState("")
  const [imagenVentasSARIMAX,setImagenVentasSARIMAX] = useState("")
  const [dataHistograma, setDataHistograma] = useState("nada")
  const [dataDoceMeses,setDoceMeses] = useState("nada")
  const [dataSeisMeses,setSeisMeses] = useState("nada")
  const [dataSARIMAX,setSARIMAX] = useState("nada")
  const [productos,setProductos] = useState("")
  const [chartData, setCD] = useState(null)
  const [fechasProximas, setFechasProximas] = useState([])
  let arr = [['fecha', 'precio']];

  const customFetcher = async (url) => {
    const response = await fetch(`https://link-preview-proxy2.herokuapp.com/v2?url=${url}`);
    const json = await response.json();
    return json.metadata;
  };


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

  function makeArr() {
    var i = 0;
    var res = "";
    var num = 0;
    arr.push
    stateNew.fechas_sug.map((item) => {
      res = stateNew.sugerencias[i].replace(/\D/g, "");
      num = parseInt(res, 10) + 1;
      arr.push([item, num]);
      i = i + 1;
      
    })
    console.log(arr);

    setCD(arr);


  }

  useEffect(() => {
    $.ajaxSetup({
      contentType: "application/json; charset=utf-8"
    });

    fetch('https://node-js-price2be.herokuapp.com/topicos/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(text))
      .then(text => setTxt(JSON.parse(text).map((d) => <a className="linkripley" href={d.linkProd}>{d.nameProd}<br /></a>)))

    fetch('https://node-js-price2be.herokuapp.com/noticias/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(JSON.parse(text)))
      .then(text => setNoticias(text))

    fetch('https://node-js-price2be.herokuapp.com/interesRegion/' + state.nombre)
      .then(res => res.text())
      //.then(text => console.log(text))
      .then(text => setInteresRegion(text))


  }, [])


  async function sugArray() {
    // ajax the JSON to the server
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/sugerencias", JSON.stringify(stateNew), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp2(response.json())
      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(response.json());
    });



  }

  async function doWork() {
    // ajax the JSON to the server
    
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/receiver", JSON.stringify(state), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp(response)

      const date = new Date();
      const dateVariable = format(date, 'd-MM-yyyy');

      const newList = state.sugerencias.concat(response.split(";")[0])
      console.log(newList)
      
      const newList2 = state.fechas_sug.concat(dateVariable)
      console.log(dateVariable)
      console.log(newList2)
        
      stateNew.sugerencias = newList;
      stateNew.fechas_sug = newList2;
        
      saveStateToLocalStorage()
      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(resp);
      console.log("hola")

      sugArray();

      console.log('POST response: ');
      // Should be 'OK' if everything was successful
      console.log(response);
      let anio = parseInt(state.mes) === 12 ? "2021" : "2022";
      let fechaAhora=anio+"/"+state.mes+"/"+state.dia;

      const importantDates = Dates(new Date(fechaAhora));
      setFechasProximas(importantDates);
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
    alert("Publicaci??n terminada!")
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

  const showEverything = () => {
    setAll(0);
    
  }

  const showConf = () => {
    setConf(1);
  }

  const hideConf = () => {
    setConf(0);
  }

  
  const triggerGraph = () => {
    setGraph(1);
  }

  const hideGraph = () => {
    setGraph(0);
  }

  return (
    <>
      {showAll === 1 && (
    <div className="px-4 py-4">
        <div className="flex-auto pt-0 shadow-xl rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-3">
          <div className="text-center flex justify-between">
                    <h6 className=" text-blueGray-700 text-l font-bold">{state.nombre}</h6>
            <div className="fecha"><h6 className="text-blueGray-700 ">{state.fecha}</h6></div>
            <button onClick={() =>{
                  handleActive();
                  saveStateToLocalStorage();
                  triggerActiva();
                  showEverything();

                  

                }}
                  className="bg-white text-red-500 active:bg-orange-500 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button">
                  Terminar publicaci??n
                </button>
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
                  Categor??a
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
                <div className="w-10/12">
              <CurrencyInput name="precio" value={stateNew.precio} onChange={handleChange} className="border-0 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" />
              </div>
                {conf === 0 &&
                  <div className="relative guardar ml-2 py-2">      
                    <button
                    className="bg-white text-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button" onClick={() => {
                        showConf();
                    }}
                  >
                    Actualizar
                  
                  </button>
                    </div>  
                    
                    } {
                      conf === 1 &&
                      <div className="flex ml-2 text-blueGray-600 text-xs font-bold">
                        <h className="seguro relative">
                        ??Est?? seguro?
                        </h>
                      <button
                      className="bg-white mr-2 text-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="button" onClick={() => {
                          hideConf();
                          triggerGuardar();
                          saveStateToLocalStorage();
                      }}
                    >
                      Si
                    
                    </button>
                      <button
                      className="bg-white text-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="button" onClick={() => {
                          hideConf();
                      }}
                    >
                      No
                    
                    </button>
                    </div>
                      
                }
              
              </div>
              
            </div>
            

              
              
              <div className="mt-2 lg:w-12/12 px-4 relative w-full mb-3">

                  <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  >
                  Descripci??n
                  </label>
                  <div className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{state.descripcion}</div>

            </div>
            <div className="mx-auto pt-0 pb-0">
          
          {showMe === 0 &&(
            <div className="flex flex-wrap">
                  <div className="relative w-4/12 mt-1">
                  <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 mr-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" onClick={() =>{
                  doWork();
                  saveStateToLocalStorage();
                  console.log(state);
                  console.log(stateNew);
                  triggerSugerir();}}
              >
                Sugerir precio actualizado
              
              </button>
                </div>   
              <div className="w-8/12">
                <div className="text-center border-0 px-2 ml-1 mt-1 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"><i class="fas fa-info-circle iconosugerencia"/>El resultado puede tardar unos segundos en aparecer.</div>
              </div>
            </div>
            
            )} {
              showMe === 1 &&
              

            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="relative w-full">
                  <div className="relative w-full mt-2">
                  <div className="text-md ">El precio que te sugerimos es de ${resp.split(";")[0]}</div>
                  <div className="text-sm">La predicci??n fue generada en base a {resp.split(";")[1]} art??culos de la categor??a.</div>
                </div>
                        </div>
                        <br />
                        <div className="text-sm">Fechas importantes para potenciar tus ventas!</div>
                {fechasProximas[0] && <div className="text-sm"> {fechasProximas[0][0]} - {fechasProximas[0][1]} </div>}
                {fechasProximas[1] && <div className="text-sm"> {fechasProximas[1][0]} - {fechasProximas[1][1]} </div>}
                {fechasProximas[2] && <div className="text-sm"> {fechasProximas[2][0]} - {fechasProximas[2][1]} </div>}
                
              </div>           
            </div>
            
            

                  }
                 
                
          
        </div>
              </div>
              
              {showGraph === 0 && 
          <div className=" w-6/12 relative botonsug mx-auto mt-2 min-w-0 py-4 px-4 break-words">
            <button
              className="w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-xs py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={() => {
            
                triggerGraph();
                makeArr();
              }}
            >
              Gr??fico de predicciones
            </button>
          </div>
              }{
                showGraph === 1 &&
                <div className=" w-full relative botonsug mx-auto mt-2 min-w-0 py-4 px-4 break-words">
                <div className="w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 text-xs py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                
                    
                <Chart 
                  width={'800px'}
                  height={'400px'}
                  chartType="ScatterChart"
                  loader={<div>Loading Chart</div>}
                  data={chartData}
                  options={{
                    //title: 'Age vs. Weight comparison',
                    chart: {
                      title:
                        'Predicciones de precio realizadas en el tiempo',
                    },
                    legend: { position: 'none' },
                    lineWidth: 1,
                    hAxis: { 
                      title: 'Fecha', 
                      minValue: 0, 
                      maxValue: 15, 
                    },
                    
                    vAxis: { 
                      title: 'Precio', 
                      minValue: 0, 
                      maxValue: 15,
                      format: '$###,###,###', 
                    },
                    legend: 'none',
                    chartArea: {
                      height: "65%",
                      width: "100%",
                      left: "25%",
                      
                    },
                  }}
                  rootProps={{ 'data-testid': '1' }}
                  />
                </div>
                <div className=" w-6/12 relative botonsug mx-auto mt-2 min-w-0 py-4 px-4 break-words">
            <button
              className="w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-xs py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={() => {
            
                hideGraph();
              }}
            >
              Esconder Gr??fico
            </button>
          </div>
                </div>
                  
                
                
        } 
          {showMarket === 0 &&
        
        <div className="w-6/12 botonmerc relative mx-auto flex min-w-0 py-4 px-4 break-words">
        <button
                className="w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-xs py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" onClick={() =>{
                  
                  triggerMarket();}}
              >
                Estudio de Mercado
                </button>
                
        </div>
        

              }

        
      
      
        {showMarket === 1 &&
          <div>

          <div className="flex flex-wrap mt-4">
          <div className="mt-4 mx-auto px-4">
          <div className=" relative bg-blueGray-100 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t bg-white mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Noticias relacionadas
                  </h3>
                </div>
              </div>
            </div>
            <div className="mx-auto ">
              <div className="block py-4 mb-2 flex flex-wrap overflow-x-auto">
                      {noticias !== "NO" &&
                        <div className="px-4">
                          <LinkPreview fetcher={customFetcher} url={(JSON.parse(noticias))[0].link} width='260px' height='512px'descriptionLength='100' />
                        </div>
                      }
                      {noticias !== "NO" && JSON.parse(noticias)[1] !== null &&
                        <div className="px-4">
                          <LinkPreview fetcher={customFetcher} url={(JSON.parse(noticias))[1].link} width='260px' height='512px' descriptionLength='100' />
                        </div>
                      }
                      {noticias !== "NO" && JSON.parse(noticias)[2] !== null &&
                        <div className="px-4">
                          <LinkPreview fetcher={customFetcher} url={(JSON.parse(noticias))[2].link} width='260px' height='512px' descriptionLength='100' />
                        </div>
                      }
                      {noticias === "NO" &&
                        <h2 className="px-4"> No se han encontrado noticias relacionadas a tu producto </h2>
                      }
  
  
              </div>
            </div>
          </div>
          </div>
          </div>
  
  
        <div className="flex flex-wrap flex-row">
          <div className="px-2 w-6/12">
          <div className="relative bg-blueGray-100 bg-white mb-6 shadow-lg rounded">
            <div className="rounded-t bg-white mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Productos relacionados
                  </h3>
                </div>
              </div>
            </div>
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/cantidad', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      setProductos(json)
                      const chartData = []
  
                          Object.entries(json).forEach(([key, value]) => {
                          chartData.push([`${key}`, `${value}`])
                          });
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                    {component => {
                      
                    return component.state.dataLoadingStatus === 'ready' ? (
                      <div className="px-4 py-4">
                        
                        {component.state.chartData.length > 0 ? 
                          <h2>
                            Cantidad de productos relacionados: <a className="font-semibold"> {component.state.chartData[0][1]} </a>
                          </h2>
                          :
                          <div />
                        }
                          <div className="relative flex flex-col">
                            
                            
                          {component.state.chartData.length >= 2 ?
                            <div>
                              <br />
                            Enlaces a algunos de estos productos:
                            <div>{component.state.chartData[1][1].split(";")[0]}: <a className="linkres" href={component.state.chartData[1][1].split(";")[2]}> {component.state.chartData[1][1].split(";")[1]} </a></div>
                            </div>
                            :
                            <h2>No se encontraron enlaces a productos similares.</h2>
                          }
                          {component.state.chartData.length >= 3 ?
                            <div>
                            <div>{component.state.chartData[2][1].split(";")[0]}: <a className="linkres" href={component.state.chartData[2][1].split(";")[2]}> {component.state.chartData[2][1].split(";")[1]} </a></div>
                            </div>
                            :
                            <div/>
                          }
                          {component.state.chartData.length >= 4 ?
                            <div>
                            <div>{component.state.chartData[3][1].split(";")[0]}: <a className="linkres" href={component.state.chartData[3][1].split(";")[2]}> {component.state.chartData[3][1].split(";")[1]} </a></div>
                            </div>
                            :
                            <div/>
                           }
                            </div>
                        </div>
                        
                        
                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                </Component>
                
        </div></div>
  
        <div className="px-2 w-6/12 ">
          <div className=" relative bg-blueGray-100 bg-white mb-6 shadow-lg rounded">
            <div className="rounded-t bg-white mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Tags
                  </h3>
                </div>
              </div>
                </div>
                <div className="py-4 px-4">
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/tags', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      const chartData = []
  
                          Object.entries(json).forEach(([key, value]) => {
                          chartData.push( `${value}`)
                          });
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                    {component => {
                      return component.state.dataLoadingStatus === 'ready' ? (
                        <div>Las siguientes etiquetas son las m??s utilizadas para publicitar productos similares al suyo:<br /><div className="mt-2 py-2 font-semibold text-base text-blueGray-700">{component.state.chartData}</div></div>
                        
                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                  </Component>
                  </div>
  
              </div>
              </div></div>
                  
        <div className="flex flex-wrap">
          <div className="mx-auto mb-12 xl:w-10/12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Gr??fico
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Inter??s por el producto en los ??ltimos 12 meses</h2>
                    </div>
                    
                </div>
              </div>
              <div className="p-4 mt-3 mx-auto flex-auto">
                {/* Chart */}
                
                <div className="mx-auto">
                <Component
                
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch(
                        'https://node-js-price2be.herokuapp.com/interesTiempo/' + state.nombre,
                      )
                      const json = await response.json()
                      setInteresTiempo(json)
                      const chartData = [[
                        { type: 'date', label: 'D??a' },
                        'Popularidad',
                      ]]
                      if (json.length > 0) {
                        json.forEach((x, i) => {
                          chartData.push([new Date(x[0]), x[1]])
                        });
                        component.setState({
                          dataLoadingStatus: 'ready',
                          chartData: chartData,
                        })
                      } else {
                        chartData.push([]);
                        component.setState({
                          dataLoadingStatus: 'notready',
                          chartData: chartData,
                        })
                      }
                    }}
                  >
                    {component => {
                        return component.state.dataLoadingStatus === 'ready' ? (
                          <div>
                          <div className="text-center text-blueGray-100 bg-transparent rounded text-sm shadow  focus:ringtransition-all duration-150 lg:w-4/12 infograf" style={{border: '1px solid #7F8997', padding: 6}}>
                          <i class="fas fa-info-circle iconografico "/>El inter??s representa la cantidad de b??squedas sobre el producto. El 100 marca el punto de mayor inter??s con el resto de los puntos escalados a ese m??ximo.</div>
                        <Chart
                          width={'863px'}
                          height={'400px'}
                          chartType="LineChart"
                          chartLanguage="es"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenGraficoMeses(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{                         
                            legend: {
                              position: 'none',
                             },
                            backgroundColor: {
                              'fill': '#000',
                              'fillOpacity': 0.0 
                            },
                            colors: ['0EA5E9'],
                            hAxis: {
                              title: 'Tiempo',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF' },
                              gridlineColor: '#515D6E',
                            },
                            vAxis: {
                              title: 'Popularidad',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF' },
                              baselineColor: '#515D6E',
                              minorGridlines:{color:'#515D6E'},
                              gridlines: {
                                color: '#515D6E'
                              }
  
                            },
                            chartArea: {
                              top: '5%', // set this to adjust the legend width
                              left: '5%',  // set this eventually, to adjust the left margin
                              height: "80%",
                              width: "93%",
                            },
                            lineWidth: 3,
                            series: {
                              // Gives each series an axis name that matches the Y-axis below.
                              0: { axis: 'Popularidad' },
                            },
                            axes: {
                              // Adds labels to each axis; they don't have to match the axis names.
                              y: {
                                Daylight: { label: 'Popularidad' },
                              },
                            },
                          }}
                          rootProps={{ 'data-testid': '4' }}
                        />
                        </div>
  
                      ) : (
                        <div className="text-white">No se logr?? encontrar informaci??n suficiente</div>
                      )
                    }}
                    </Component>
                </div>
              </div>
            </div>
            
            </div>
            </div>
  
          {/* GONZALO  */}
          <div className="flex flex-wrap">
          <div className="mx-auto mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Gr??fico
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Estimaci??n de fluctuaci??n de precio en 4 meses</h2>
                    </div>
                    
                </div>
              </div>
              <div className="p-4 mt-3 mx-auto flex-auto">
                {/* Chart */}
                
                <div className="mx-auto">
                <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
                      
                      const chartData = [[
                        { type: 'date', label: 'D??a' },
                        'Precio',
                      ]]
                      
                      component.setState({
                        dataLoadingStatus: 'notready',
                        chartData: chartData,
                      })
                      
                      $.post("http://127.0.0.1:5000/monthly", JSON.stringify(state), function () {
                        }).then(function (response) { // At this point, Flask has printed our JSON
                          console.log("AAAAA")
                          const monthResponse = JSON.parse(response);
                          // Should be 'OK' if everything was successful
                          monthResponse.forEach((x) => {
                            chartData.push([new Date(x[0]),parseInt(x[1])])
                          })
                          component.setState({
                            dataLoadingStatus: 'ready',
                            chartData: chartData,
                          })
                        });
                    }}
                  >
                    {component => {
                        return component.state.dataLoadingStatus === 'ready' ? (
                          <div>
                          <div className="text-center text-blueGray-100 bg-transparent rounded text-sm shadow  focus:ringtransition-all duration-150 lg:w-4/12 infograf" style={{border: '1px solid #7F8997', padding: 6}}>
                          <i class="fas fa-info-circle iconografico "/>Se muestra en el gr??fico una estimaci??n de la fluctuaci??n del precio de su producto en un tiempo de 4 meses a partir de la fecha actual.</div>
                        <Chart
                          width={'863px'}
                          height={'400px'}
                          chartType="LineChart"
                          chartLanguage="es"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenEstimacionMeses(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{                         
                            legend: {
                              position: 'none',
                             },
                            backgroundColor: {
                              'fill': '#000',
                              'fillOpacity': 0.0 
                            },
                            layout: {
                              padding: {
                                  left: 100
                              }
                            },
                            colors: ['0EA5E9'],
                            hAxis: {
                              title: 'Tiempo',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF' },
                              gridlineColor: '#515D6E',
                              valueType: "DateTimeCategory",
                              format: 'MMM-YYYY'
                              
                            },
                            vAxis: {
                              title: 'Precio',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF',fontSize: '12', paddingRight: '100',marginRight: '100' },
                              baselineColor: '#515D6E',
                              minorGridlines:{color:'#515D6E'},
                              gridlines: {
                                color: '#515D6E'
                              },
                              //Consultar por que esta dudarrrdo
                              viewWindow: {
                                //max: 805000,
                                min: 0,
                              },
  
                            },
                            chartArea: {
                              top: '5%', // set this to adjust the legend width
                              left: '10%',  // set this eventually, to adjust the left margin
                              right: '5%',
                              height: "80%",
                              width: "93%",
                            },
                            lineWidth: 3,
                            series: {
                              // Gives each series an axis name that matches the Y-axis below.
                              0: { axis: 'Precio' },
                            },
                            axes: {
                              // Adds labels to each axis; they don't have to match the axis names.
                              y: {
                                Daylight: { label: 'Precio' },
                              },
                            },
                          }}
                          rootProps={{ 'data-testid': '4' }}
                        />
                        </div>
  
                      ) : (
                        <div className="text-white">No se logr?? encontrar informaci??n suficiente</div>
                      )
                    }}
                    </Component>
                </div>
              </div>
            </div>
            
            </div>
            </div>
            {/* FIN GRAFICO GONZALO */}
  
          <div className="flex flex-wrap">
            
          <div className="mx-auto px-4">
                    
          <div className=" relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                  Mapa
                </h6>
                <h2 className="text-blueGray-700 text-xl font-semibold">
                  Inter??s por regi??n
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative">
                  <div id="chartdiv" style={{width:"550px", height: "500px", margin: 0, padding: 0}}></div>
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
                      const response = await fetch(
                        'https://node-js-price2be.herokuapp.com/interesRegion/' + state.nombre,
                      )
                      const json = await response.json()
                      const chartData = []
                      json.forEach((x, i) => {
                        //console.log(x);
                        chartData.push({id:x.geoCode, value:x.value[0]})
                      });
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                      //console.log(json);
                      //console.log(chartData);
                      am4core.ready(function() {
  
                        // Themes begin
                        am4core.useTheme(am4themes_animated);
                        // Themes end
                        
                        // Create map instance
                        var chart = am4core.create("chartdiv", am4maps.MapChart);
                        
                        // Set map definition
                        chart.geodata = am4geodata_chileLow;
                        
                        // Set projection
                        chart.projection = new am4maps.projections.Mercator();
                        
                        // Create map polygon series
                        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
                        
                        //Set min/max fill color for each area
                        polygonSeries.heatRules.push({
                          property: "fill",
                          target: polygonSeries.mapPolygons.template,
                          min: chart.colors.getIndex(1).brighten(1),
                          max: chart.colors.getIndex(1).brighten(-0.3)
                        });
                        
                        // Make map load polygon data (state shapes and names) from GeoJSON
                        polygonSeries.useGeodata = true;
                        
                        // Set heatmap values for each state
                        polygonSeries.data = chartData;
                        
                        // Set up heat legend
                        let heatLegend = chart.createChild(am4maps.HeatLegend);
                        heatLegend.series = polygonSeries;
                        heatLegend.align = "left";
                        heatLegend.valign = "bottom";
                        heatLegend.width = am4core.percent(40);
                        heatLegend.marginLeft = am4core.percent(20);
                        heatLegend.minValue = 0;
                        heatLegend.maxValue = 100;
                        
                        // Set up custom heat map legend labels using axis ranges
                        var minRange = heatLegend.valueAxis.axisRanges.create();
                        minRange.value = heatLegend.minValue;
                        minRange.label.text = "0";
                        var maxRange = heatLegend.valueAxis.axisRanges.create();
                        maxRange.value = heatLegend.maxValue;
                        maxRange.label.text = "100";
                        
                        // Blank out internal heat legend value axis labels
                        heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
                          return "";
                        });
                        
                        // Configure series tooltip
                        var polygonTemplate = polygonSeries.mapPolygons.template;
                        polygonTemplate.tooltipText = "{name}: {value}";
                        polygonTemplate.nonScalingStroke = true;
                        polygonTemplate.strokeWidth = 0.5;
                        
                        // Create hover state and set alternative fill color
                        var hs = polygonTemplate.states.create("hover");
                        hs.properties.fill = am4core.color("#3c5bdc");
  
                        //exportando a PDF
                        //chart.opacity = 1
                        chart.exporting.backgroundColor = 'white'
                        chart.exporting.getImage("png").then( ( data ) => {
                          setImagenGraficoPais(data)
                        } );
                        
                        });
                    }}
                    
                    >
                      <div className="mt-5 text-center border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow  focus:ringtransition-all duration-150" style={{ width: "550px" }}>
                        <i class="fas fa-info-circle iconografico"/>
                        <div>
                      Las regiones m??s oscuras representan un mayor inter??s por el producto. <br /> Se puede navegar por el mapa manteniendo click y arrastrando el cursor.<br/> Para acercarse o alejarse, hacer scroll en la zona donde est?? ubicado el cursor.</div>
                        </div>
                   
  
                    
                    {component => {
                      return component.state.dataLoadingStatus === 'ready' ? (
                        <div></div>
                      ) : (
                        <div>Generando gr??fico de inter??s por regi??n</div>
                      )
                    }}
                    </Component> 
            </div>
          </div>
        </div>
            </div>
            
            <div className="mx-auto px-4">
                    
                    <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Gr??fico
                          </h6>
                          <h2 className="text-blueGray-700 text-xl font-semibold">
                            Distribuci??n por marcas
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-auto">
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/marcas', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      const chartData = [[
                        'Marca', 'Cantidad'
                      ]]
  
                          Object.entries(json).forEach(([key, value]) => {
                          chartData.push([`${key}`, parseInt(`${value}`)])
                          });
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                    {component => {
                      return component.state.dataLoadingStatus === 'ready' ? (
                        <div>
                          
                        <Chart
                          width={'700px'}
                          height={'500px'}
                          chartType="PieChart"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenDistribucionMarcas(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{
                            title:
                              '',
                              'chartArea': {left:80, 'width': '100%', 'height': '100%'}
                          }}
                          rootProps={{ 'data-testid': '1' }}
                          />
                          <div className="mt-5 text-center border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow  focus:ringtransition-all duration-150" style={{ width: "700px" }}>
                        <i class="fas fa-info-circle iconografico"/>
                        <div>
                        Gr??fico de la distribuci??n de marcas de productos similares.</div>
                        </div>
                        </div>
                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                  </Component>
                  </div></div></div>
  
                  <div className="mx-auto px-4">
                    
                    <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Gr??fico
                          </h6>
                          <h2 className="text-blueGray-700 text-xl font-semibold">
                            Histograma de Precios
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-auto">
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/precios', {      
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      setDataHistograma(json);
                      const chartData = [[
                        'Price'   
                      ]]
  
                          Object.entries(json).forEach(([key, value]) => {
                          chartData.push([parseInt(`${value}`)])  
                          console.log(parseInt(`${value}`))
                          });
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                    {component => {
                      return component.state.dataLoadingStatus === 'ready' ? (
                        <div>
                          
                          <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="Histogram"
                                loader={<div>Loading Chart</div>}
                                data= {
                                        component.state.chartData
                                      }
                                chartEvents={[
                                  {
                                    eventName: 'ready',
                                    callback: (ChartRef) => {
                                      // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                        setImagenHistograma(ChartRef.chartWrapper.getChart().getImageURI())
                                    }
                                  },
                                ]}                  
                                options={{
                                  title: 'Distribuci??n de precios de publicaciones, por cantidad',
                                  legend: { position: 'none' },
                                  histogram: {
                                    //bucketSize: 3,
                                    maxNumBuckets: 30,
                                    minValue: 0,
                                    maxValue: 7,
                                    hideBucketItems: true,
                                    numBucketsRule: 'sturges',
                                  },
                                  chartArea: {
                                    left: 200,
                                  },
                                  hAxis: {
                                    format: '$###,###',
                                    //title: 'Precio',
                                  },
                                  vAxis: {
                                    title: 'Cantidad',
                                  },
                                }}
                                rootProps={{ 'data-testid': '1' }}
                              />
                          <div className="mt-5 text-center border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow  focus:ringtransition-all duration-150" style={{ width: "700px" }}>
                        <i class="fas fa-info-circle iconografico"/>
                        <div>
                        Histograma de la distribuci??n de precios del producto en el mercado.</div>
                        </div>
                        </div>
                      ) : (
                        <div className="text-black">No se logr?? encontrar informaci??n suficiente</div>
                      )
                    }}
                  </Component>
                  </div></div>
            </div>
        
  
            <div className="mx-auto mb-12 xl:w-10/12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Gr??fico
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Estimaci??n de ventas por promedio mensual para 12 meses</h2>
                    </div>
                    
                </div>
              </div>
              <div className="p-4 mt-3 mx-auto flex-auto">
                {/* Chart */}
                
                        <div className="mx-auto">
                          
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/estimacion', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      setDoceMeses(json);
                      const chartData = [[
                        'Mes', 'Ventas'
                      ]]
                      for (let i = 0; i < json['meses_ful'].length; i++) {
                        chartData.push([json['meses_ful'][i],parseFloat(json['avg'][i])]);
                      }
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                   {component => {
                        return component.state.dataLoadingStatus === 'ready' ? (
                          <div>
                          <div className="text-center text-blueGray-100 bg-transparent rounded text-sm shadow  focus:ringtransition-all duration-150 lg:w-4/12 infograf" style={{border: '1px solid #7F8997', padding: 3}}>
                          <i class="fas fa-info-circle iconografico "/>Estimaci??n de ventas por mes v??a un promedio ponderado de los datos hist??ricos. La informaci??n m??s reciente tiene m??s peso. ??til para articulos que tienen demanda con tendencia c??clica.</div>
                        <Chart
                          width={'863'}
                          height={'400'}
                          chartType="LineChart"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenVentasDoceMeses(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{
                            hAxis: {
                              title: 'Time',
                            },
                            vAxis: {
                              title: 'Popularity',
                            },
                            chart: {
                              title:
                                'Estimaci??n de ventas en los ??ltimos 12 meses',
                            },
                            legend: { position: 'none' },
                            width: 863,
                            height: 400,
                            series: {
                              // Gives each series an axis name that matches the Y-axis below.
                              0: { axis: 'Mes' },
                              1: { axis: 'Ventas', curveType: 'function'}
                              
                            },
                            axes: {
                              // Adds labels to each axis; they don't have to match the axis names.
                              y: {
                                Daylight: { label: 'Ventas' },
                              },
                            },
                            backgroundColor: {
                              'fill': '#000',
                              'fillOpacity': 0.0 
                            },
                            
                            colors: ['0EA5E9'],
                            hAxis: {
                              title: 'Mes',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF',fontSize: '10.2', paddingRight: '100',marginRight: '100' },
                              gridlineColor: '#515D6E',
                            },
                            vAxis: {
                              title: 'Ventas',
                              titleTextStyle: { color: '#B3B8BF' },
                              
                              textStyle: { color: '#B3B8BF' },
                              baselineColor: '#515D6E',
                              minorGridlines:{color:'#515D6E'},
                              gridlines: {
                                color: '#515D6E'
                              }
  
                            },
                            chartArea: {
                              top: '2%', // set this to adjust the legend width
                              left: '10%',  // set this eventually, to adjust the left margin
                              right: '3%',
                              height: "80%",
                              width: "100%",
                            },
                           
                           
                          }}
                          rootProps={{ 'data-testid': '4' }}
                        />
                        </div>

                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                    </Component>
                    </div>
              </div>
            </div>
            
            </div>
            <div className="mx-auto mb-12 xl:w-10/12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Gr??fico
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Estimaci??n de ventas con regresi??n lineal para 6 meses</h2>
                    </div>
                    
                </div>
              </div>
              <div className="p-4 mt-3 mx-auto flex-auto">
                {/* Chart */}
                
                    
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/estimacion', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      setSeisMeses(json);
                      const chartData = [[
                        'Mes', 'Cantidad'
                      ]]
                      for (let i = 0; i < json['meses'].length; i++) {
                        chartData.push([json['meses'][i],parseFloat(json['linre'][i])]);
                      }
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                   {component => {
                            return component.state.dataLoadingStatus === 'ready' ? (
                              <div>
                              <div className="text-center text-blueGray-100 bg-transparent rounded text-sm shadow  focus:ringtransition-all duration-150 lg:w-4/12 infograf" style={{border: '1px solid #7F8997', padding: 2}}>
                              <i class="fas fa-info-circle iconografico "/> Estimaci??n de ventas v??a regresi??n lineal sobre datos hist??ricos. ??til para ver una tendencia creciente o decreciente en la demanda, no para valores espec??ficos por mes.</div>
                        <Chart
                          width={'800'}
                          height={'400'}
                          chartType="LineChart"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenVentasSeisMeses(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{
                            chart: {
                              title:
                                'Estimaci??n de ventas para 6 meses',
                            },
                            legend: { position: 'none' },
                            width: 800,
                            height: 400,
                            series: {
                              // Gives each series an axis name that matches the Y-axis below.
                              0: { axis: 'Mes' },
                            },
                            axes: {
                              // Adds labels to each axis; they don't have to match the axis names.
                              y: {
                                Daylight: { label: 'Ventas' },
                              },
                            },
                            backgroundColor: {
                              'fill': '#000',
                              'fillOpacity': 0.0 
                            },
                            
                            colors: ['0EA5E9'],
                            hAxis: {
                              title: 'Mes',
                              titleTextStyle: { color: '#B3B8BF' },
                              textStyle: { color: '#B3B8BF',fontSize: '12', paddingRight: '100',marginRight: '100' },
                              gridlineColor: '#515D6E',
                            },
                            vAxis: {
                              title: 'Ventas',
                              titleTextStyle: { color: '#B3B8BF' },
                              
                              textStyle: { color: '#B3B8BF' },
                              baselineColor: '#515D6E',
                              minorGridlines:{color:'#515D6E'},
                              gridlines: {
                                color: '#515D6E'
                              }
  
                            },
                            chartArea: {
                              top: '2%', // set this to adjust the legend width
                              left: '10%',  // set this eventually, to adjust the left margin
                              right: '3%',
                              height: "80%",
                              width: "100%",
                            },
                          }}
                          rootProps={{ 'data-testid': '4' }}
                        /></div>
                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                  </Component>
                  </div>
              </div>
            </div>
            <div className="mx-auto mb-12 xl:w-10/12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Gr??fico
                    </h6>
                    <h2 className="text-white text-xl font-semibold">Estimaci??n de ventas con SARIMAX para 6 meses</h2>
                    </div>
                    
                </div>
              </div>
              <div className="p-4 mt-3 mx-auto flex-auto">
                {/* Chart */}
                  <Component
                    initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
                    didMount={async function (component) {
  
                      const response = await fetch('http://127.0.0.1:5000/sarimax', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(state),
                      })
                      const json = await response.json()
                      console.log(json);
                      setSARIMAX(json);
                      const chartData = [[
                        'Mes', 'Cantidad'
                      ]]
                      for (let i = 0; i < json['meses'].length; i++) {
                        chartData.push([json['meses'][i],parseFloat(json['SAR'][i])]);
                      }
  
                      component.setState({
                        dataLoadingStatus: 'ready',
                        chartData: chartData,
                      })
                    }}
                  >
                   {component => {
                            return component.state.dataLoadingStatus === 'ready' ? (
                              <div>
                              <div className="text-center text-blueGray-100 bg-transparent rounded text-sm shadow  focus:ringtransition-all duration-150 lg:w-4/12 infograf" style={{border: '1px solid #7F8997', padding: 4}}>
                              <i class="fas fa-info-circle iconografico "/> Gr??fico de la estimaci??n de ventas con un modelo SARIMAX, capaz de ajustarse a art??culos afectados por tendencias y temporadas.</div>
                        <Chart
                          chartType="LineChart"
                          loader={<div>Cargando gr??fico</div>}
                          data={component.state.chartData}
                          chartEvents={[
                            {
                              eventName: 'ready',
                              callback: (ChartRef) => {
                                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                                  setImagenVentasSARIMAX(ChartRef.chartWrapper.getChart().getImageURI())
                              }
                            },
                          ]
                          }
                          options={{
                            chart: {
                              title:
                                'Estimaci??n de ventas para 6 meses',
                            },
                            legend: { position: 'none' },
                            width: 863,
                            height: 400,
                            series: {
                              // Gives each series an axis name that matches the Y-axis below.
                              0: { axis: 'Mes' },
                              1: { axis: 'Ventas', curveType: 'function'}
                            },
                            axes: {
                              // Adds labels to each axis; they don't have to match the axis names.
                              y: {
                                Daylight: { label: 'Ventas' },
                              },
                            },
                            backgroundColor: {
                              'fill': '#000',
                              'fillOpacity': 0.0 
                            },
                            
                            colors: ['0EA5E9'],
                            hAxis: {
                              title: 'Mes',
                              titleTextStyle: { color: '#B3B8BF', marginTop: '30' },
                              textStyle: { color: '#B3B8BF',fontSize: '12', paddingRight: '100',marginRight: '100' },
                              gridlineColor: '#515D6E',
                            },
                            vAxis: {
                              title: 'Ventas',
                              titleTextStyle: { color: '#B3B8BF' },
                              
                              textStyle: { color: '#B3B8BF' },
                              baselineColor: '#515D6E',
                              minorGridlines:{color:'#515D6E'},
                              gridlines: {
                                color: '#515D6E'
                              }
  
                            },
                            chartArea: {
                              top: '5%',
                              bottom: '20%',
                              left: '10%',  // set this eventually, to adjust the left margin
                              right: '3%',
                              height: "100%",
                              width: "100%",
                            },
                          }}
                          rootProps={{ 'data-testid': '4' }}
                        /></div>
                      ) : (
                        <div>Extrayendo la informaci??n</div>
                      )
                    }}
                  </Component>
                  </div>
                    </div>
                    <div className="relative mx-auto flex flex-col min-w-0 py-4 px-4 break-words xxl:w-6/12 xl:w-8/12 xxl:w-6/12 mb-6">
            <button
                className="w-full bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-xs py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" onClick={() =>{
                  
                  hideMarket();}}
              >
                Esconder
                
              
              </button>
        </div>
                  </div>
                  
                
                  
                </div></div>
            
      }
        </form>
        
      </div>
      
      </div>
      )} {
        showAll === 0 && <></>}


    </>
   
  );
}