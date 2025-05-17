import React, { useState } from 'react'
import './App.css'
const chip = () => {
    const [chips,setChips] = useState([]);
    const [inputValue,setInputValue] = useState("");

    const handleKeyDown =(e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if(trimmedValue !== ""){
                const newChip = {id :Date.now(),label : trimmedValue};
                setChips([...chips,newChip]);
                setInputValue("")
            }
        }
    }

    const handleRemove = (idToBeDeleted)=>{
        setChips(chips.filter((chip)=> chip.id !== idToBeDeleted))
    }
  return (
    <div className='container'>
      <input
       type="text"
       placeholder='Enter the chip'
       value={inputValue}
       onChange={(e)=>setInputValue(e.target.value)}
       onKeyDown={handleKeyDown}
       />

       <div className='chipsWrapper'>
        {chips.map((chip)=>(
            <div key={chip.id} className='chip'>
                
              <span> {chip.label}</span> 
            <div onClick={()=> handleRemove(chip.id)} 
                    className='closeBtn'
                    >X</div>
                
            </div>
        ))}
       </div>
    </div>
  )
}

export default chip
