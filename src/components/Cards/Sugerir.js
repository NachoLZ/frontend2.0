import React from 'react'
import Button from 'react-bootstrap/Button';

const Sugerir = (props) => {
  return <Button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={props.sugerir}>Sugerir</Button>
}

export default Sugerir