import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import "./App.css"
const Accordion = ({items}) => {

    const [active,setActive] = useState(null);

    const handleToggle = (index)=>{
        setActive(active === index ? null : index)
    }

    if(!items || items.length === 0){
        return <p>No items available.</p>
    }
  return (
    <div className='accordion'>
      {items.map((item,index)=>(
        <div className='accordion-item'>
            <button
            className='accordion-title'
            onClick={()=>{handleToggle(index)}}
            aria-expanded = {active === index}
            >
           {item.title}
             {active === index ? 
             (<FaChevronUp style={{float:"right"}} />):
             (<FaChevronDown style={{float:"right"}} />)
            }
            </button>
            {active === index && (
                <div
                className='accordion-content'
                >{item.content}</div>
            )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
