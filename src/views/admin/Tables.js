import React from "react";
import tick from '../../assets/img/tick2.png';
import Component from "react-component-component";

// components



export default function Tables({ state, onStateChange }) {
  
  
  return (
    <>
      <div className="relative mx-auto flex flex-col min-w-0 break-words bg-white w-6/12 mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <img src={tick} className="relative mx-auto py-5 " alt="tickph" />
          </div>
          <div className="flex flex-wrap items-center">
            <label className="relative mx-auto text-xl py-5">¡Producto publicado!</label>
            <Component
              initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
              didMount={async function (component) {
        
                const response = await fetch('http://127.0.0.1:5000/history', {
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
                    chartData.push([`${key}`, `${value}`])
                    });
        
                component.setState({
                  dataLoadingStatus: 'ready',
                  chartData: chartData,
                })
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
