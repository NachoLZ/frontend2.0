import React, { useState, useEffect } from 'react';
import Component from "react-component-component";
import Publicacion from "./Publicacion";
import PublicacionT from "./PublicacionT";
import $ from "jquery";
import { NavItem } from 'react-bootstrap';
import { set } from 'date-fns';
// components

export default function Publicaciones({ state }) {
  const [jsonData, setData] = useState("")
  const [jsonData2, setData2] = useState("")
  const [state2, setState2] = useState("")

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full mx-auto md:w-full xl:w-8/12 xxl:w-10/12 px-4 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-300 border-0">
          <div className="rounded-t bg-blueGray-50 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className=" text-blueGray-700 text-xl font-bold">Publicaciones Activas</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              
          <Component
                  initialState={{ dataLoadingStatus: 'loading', respData: [] }}
                  didMount={async function (component) {

                    const response = await fetch('http://127.0.0.1:5000/archived', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(state)
                    })
                    const json = await response.json()
                    console.log(json);
                      setData(json);
                      
                    const respData = []

                        Object.entries(json).forEach(([key, value]) => {
                        respData.push([`${key}`, `${value}`])
                        });

                    component.setState({
                      dataLoadingStatus: 'ready',
                      respData: respData,
                    })
                  }}
                >
                  {component => {
                  return component.state.dataLoadingStatus === 'ready' ? (
                    jsonData.map((jsonItem) => {
                        return <Publicacion state = {jsonItem}/>
                      })
                    
                    ) : (
                      <div>No hay publicaciones activas.</div>
                    )
                  }}
              </Component>


          </div>
        </div>
        </div>
      </div>
      
      <div className="flex flex-wrap ">
        <div className="w-full mx-auto md:w-full xl:w-8/12 xxl:w-6/12 px-4 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-blueGray-300 border-0">
          <div className="rounded-t bg-blueGray-50 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className=" text-blueGray-700 text-xl font-bold">Publicaciones Terminadas</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              
          <Component
                  initialState={{ dataLoadingStatus: 'loading', respData: [] }}
                  didMount={async function (component) {

                    const response = await fetch('http://127.0.0.1:5000/terminadas', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(state)
                    })
                    const json2 = await response.json()
                    console.log(json2);
                      setData2(json2);
                      
                    const respData = []

                        Object.entries(json2).forEach(([key, value]) => {
                        respData.push([`${key}`, `${value}`])
                        });

                    component.setState({
                      dataLoadingStatus: 'ready',
                      respData: respData,
                    })
                  }}
                >
                  {component => {
                  return component.state.dataLoadingStatus === 'ready' ? (
                    jsonData2.map((jsonItem2) => {
                        return <PublicacionT state = {jsonItem2} />
                      })
                    
                    ) : (
                      <h2>No hay publicaciones terminadas.</h2>
                    )
                  }}
              </Component>


          </div>
        </div>
        </div>
      </div>
    </>
  );
}