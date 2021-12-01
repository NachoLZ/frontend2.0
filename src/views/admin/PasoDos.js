import React, { useState, useEffect } from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_chileLow from "@amcharts/amcharts4-geodata/chileLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; 
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Chart } from "react-google-charts";
import Component from "react-component-component";
import CurrencyInput from './CurrencyInput';
import './PasoDos.css';
import { format } from "date-fns";
import creaPDF from './PDF.js';
import { Dates } from './importantDates';

export default function PasoDos({state, onStateChange}) {
  const [showMe, setShow] = useState(0)
  const [showMarket, setMarket] = useState(0)
  const [resp, setResp] = useState("")
  const [noticias, setNoticias] = useState("")
  const [interesRegion, setInteresRegion] = useState("")
  const [interesTiempo, setInteresTiempo] = useState("")
  const [txt, setTxt] = useState("")
  const [imagenGraficoMeses,setImagenGraficoMeses] = useState("")
  const [imagenGraficoPais,setImagenGraficoPais] = useState("")
  const [imagenEstimacionMeses,setImagenEstimacionMeses] = useState("")
  const [imagenDistribucionMarcas,setImagenDistribucionMarcas] = useState("")
  const [imagenHistograma,setImagenHistograma] = useState("")
  const [imagenVentasDoceMeses,setImagenVentasDoceMeses] = useState("")
  const [imagenVentasSeisMeses,setImagenVentasSeisMeses] = useState("")
  const [imagenVentasSARIMAX,setImagenVentasSARIMAX] = useState("")
  const [dataHistograma,setDataHistograma] = useState("nada")
  const [dataDoceMeses,setDoceMeses] = useState("nada")
  const [dataSeisMeses,setSeisMeses] = useState("nada")
  const [dataSARIMAX,setSARIMAX] = useState("nada")
  const [productos,setProductos] = useState("")
  const [showBoton, setBoton] = useState(0)
  const [fechasProximas, setFechasProximas] = useState([])

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

  const fetch = require('node-fetch');

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

  const saveStateToLocalStorage = () => { 
    localStorage.setItem('state', JSON.stringify(state));
  }

  async function doWork() {
    // ajax the JSON to the server
    var date = new Date()
    var dateVariable = format(date, 'd-MM-yyyy')
    console.log('LOG PRUEBA');
    $.post("http://127.0.0.1:5000/receiver", JSON.stringify(state), function () {
    }).then(function (response) { // At this point, Flask has printed our JSON
      setResp(response)
      const newList = state.sugerencias.concat(response.split(";")[0])
      console.log(newList)
      
      const newList2 = state.fechas_sug.concat(dateVariable)
      console.log(newList2)

      onStateChange({ ...state,
        sugerencias: newList,
        fechas_sug: newList2
      });
      saveStateToLocalStorage()
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


  const triggerSugerir = () => {
    setShow(1);
  }

  const triggerMarket = () => {
    setMarket(1);
  }

  const triggerBoton  = () => {
    setBoton(1);
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          
      <div className="relative mx-auto xl:w-8/12 xxl:w-6/12 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <Link to="/admin/settings" onClick={() =>{
                    saveStateToLocalStorage();}}
                >
              <button
                className="bg-white text-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" 
              >
                
                <i class="fas fa-chevron-left"></i> Volver 
              </button>
            </Link>
            <h6 className="text-blueGray-700 text-xl font-bold">Ponle precio o déjanos sugerirte uno :)</h6>
            <Link to="/admin/maps" onClick={() =>{
                    saveStateToLocalStorage();}}
                >
              <button
                className="bg-white text-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" 
              >
                Continuar <i class="fas fa-chevron-right"></i>
              </button>
            </Link>
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
                  <CurrencyInput name="precio" value={state.precio} onChange={handleChange} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" placeholder="Ej: $20.000" />
                  <div className="relative w-full mt-4">
                  <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" onClick={() =>{
                  doWork();
                  triggerSugerir();
                  }}
              >
                Sugerir
              
              </button>
                </div>
                </div>
                
              </div>
              
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                
                  <div className="text-center border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"><i class="fas fa-info-circle iconosugerencia"/>La sugerencia de precio es una herramienta que propone un precio competitivo para facilitar la venta rápida del producto. El resultado puede tardar unos segundos en aparecer.</div>
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
                  <CurrencyInput name="precio" value={state.precio} onChange={handleChange} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" placeholder="Ej: $20.000" />
                  <div className="relative w-full mt-4">
                  <div className="text-md">El precio que te sugerimos es de ${resp.split(";")[0]}</div><br />
                  <div className="text-sm">La predicción fue generada en base a {resp.split(";")[1]} artículos de la categoría.</div>
                </div>
                </div>
                
              </div>
              
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                <div className="text-center border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"><i class="fas fa-info-circle iconosugerencia" />La sugerencia de precio es una herramienta que propone un precio competitivo para facilitar la venta rápida del producto. El resultado puede tardar unos segundos en aparecer.</div>
                <div className="mt-4">
                <div className="text-sm">Fechas importantes para potenciar tus ventas!</div>
                {fechasProximas[0] && <div className="text-sm"> {fechasProximas[0][0]} - {fechasProximas[0][1]} </div>}
                {fechasProximas[1] && <div className="text-sm"> {fechasProximas[1][0]} - {fechasProximas[1][1]} </div>}
                {fechasProximas[2] && <div className="text-sm"> {fechasProximas[2][0]} - {fechasProximas[2][1]} </div>}
                </div></div>
              </div>
            </div>
            </div>
            

          }
          </form>
        </div>
      </div>
        </div>
      </div>

      {showMarket === 0 &&
        <div>
        <div className="relative px-4 mx-auto flex flex-col min-w-0 break-words xxl:w-6/12 xl:w-8/12 xxl:w-6/12 mb-6  rounded">
        <button
                className="w-full bg-white text-blueGray-600 active:bg-lightBlue-600 font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button" onClick={() =>{
                  doWork()
                  triggerMarket();}}
                  
              >
                Estudio de Mercado <br /> 
                <i class="fas fa-chevron-down"></i>
                
              
              </button>
      </div>
        </div>

      } {showMarket === 1 &&
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
                      <div>Extrayendo la información</div>
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
                      <div>Las siguientes etiquetas son las más utilizadas para publicitar productos similares al suyo:<br /><div className="mt-2 py-2 font-semibold text-base text-blueGray-700">{component.state.chartData}</div></div>
                      
                    ) : (
                      <div>Extrayendo la información</div>
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
                  Gráfico
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Interés por el producto en los últimos 12 meses</h2>
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
                      { type: 'date', label: 'Día' },
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
                        <i class="fas fa-info-circle iconografico "/>El interés representa la cantidad de búsquedas sobre el producto. El 100 marca el punto de mayor interés con el resto de los puntos escalados a ese máximo.</div>
                      <Chart
                        width={'863px'}
                        height={'400px'}
                        chartType="LineChart"
                        chartLanguage="es"
                        loader={<div>Cargando gráfico</div>}
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
                      <div className="text-white">No se logró encontrar información suficiente</div>
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
                  Gráfico
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Estimación de fluctuación de precio en 4 meses</h2>
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
                      { type: 'date', label: 'Día' },
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
                        <i class="fas fa-info-circle iconografico "/>Se muestra en el gráfico una estimación de la fluctuación del precio de su producto en un tiempo de 4 meses a partir de la fecha actual.</div>
                      <Chart
                        width={'863px'}
                        height={'400px'}
                        chartType="LineChart"
                        chartLanguage="es"
                        loader={<div>Cargando gráfico</div>}
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
                      <div className="text-white">No se logró encontrar información suficiente</div>
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
                Interés por región
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
                    Las regiones más oscuras representan un mayor interés por el producto. <br /> Se puede navegar por el mapa manteniendo click y arrastrando el cursor.<br/> Para acercarse o alejarse, hacer scroll en la zona donde esté ubicado el cursor.</div>
                      </div>
                 

                  
                  {component => {
                    return component.state.dataLoadingStatus === 'ready' ? (
                      <div></div>
                    ) : (
                      <div>Generando gráfico de interés por región</div>
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
                          Gráfico
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                          Distribución por marcas
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
                        loader={<div>Cargando gráfico</div>}
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
                      Gráfico de la distribución de marcas de productos similares.</div>
                      </div>
                      </div>
                    ) : (
                      <div>Extrayendo la información</div>
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
                          Gráfico
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
                                title: 'Distribución de precios de publicaciones, por cantidad',
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
                      Histograma de la distribución de precios del producto en el mercado.</div>
                      </div>
                      </div>
                    ) : (
                      <div className="text-black">No se logró encontrar información suficiente</div>
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
                  Gráfico
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Estimación de ventas por promedio mensual para 12 meses</h2>
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
                        <i class="fas fa-info-circle iconografico "/>Estimación de ventas por mes vía un promedio ponderado de los datos históricos. La información más reciente tiene más peso. Útil para articulos que tienen demanda con tendencia cíclica.</div>
                      <Chart
                        width={'863'}
                        height={'400'}
                        chartType="LineChart"
                        loader={<div>Cargando gráfico</div>}
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
                              'Estimación de ventas en los últimos 12 meses',
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
                            top: '5%', // set this to adjust the legend width
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
                      <div>Extrayendo la información</div>
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
                  Gráfico
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Estimación de ventas con regresión lineal para 6 meses</h2>
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
                        <i class="fas fa-info-circle iconografico "/> Estimación de ventas vía regresión lineal sobre datos históricos. Útil para ver una tendencia creciente o decreciente en la demanda, no para valores específicos por mes.</div>
                      <Chart
                        width={'800'}
                        height={'400'}
                        chartType="LineChart"
                        loader={<div>Cargando gráfico</div>}
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
                              'Estimación de ventas para 6 meses',
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
                      />
                      </div>
                    ) : (
                      <div>Extrayendo la información</div>
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
                  Gráfico
                  </h6>
                  <h2 className="text-white text-xl font-semibold">Estimación de ventas con SARIMAX para 6 meses</h2>
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
                        <i class="fas fa-info-circle iconografico "/> Gráfico de la estimación de ventas con un modelo SARIMAX, capaz de ajustarse a artículos afectados por tendencias y temporadas.</div>
                      <Chart
                        chartType="LineChart"
                        loader={<div>Cargando gráfico</div>}
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
                              'Estimación de ventas para 6 meses',
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
                      <div>Extrayendo la información</div>
                    )
                  }}
                </Component>
                </div>
            </div>
          </div>
              
                
              </div>
          {showBoton === 0 &&  <button className="mb-2 w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-m py-2 shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={() => triggerBoton()}>Enviar estudio de mercado a su correo</button>}
          {showBoton === 1 &&
          <div>
          <div className="mb-2 text-center mx-auto w-full relative bg-white text-blueGray-600 rounded-lg active:bg-lightBlue-600 font-bold uppercase text-m py-2 shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
          Email enviado
          </div>
              {creaPDF(imagenGraficoMeses,imagenGraficoPais,imagenDistribucionMarcas,state.nombre,noticias,productos,resp,state.email,interesRegion,interesTiempo,imagenHistograma,imagenEstimacionMeses,dataHistograma,imagenVentasDoceMeses,imagenVentasSeisMeses,imagenVentasSARIMAX,dataDoceMeses,dataSeisMeses,dataSARIMAX)}
            </div>}
      </div>
      }
    </>
  );
}
