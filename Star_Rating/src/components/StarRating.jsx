import { useState } from 'react'

const StarRating = ({starCount}) => {

    const [starValue,setStarValue] = useState();
    const [hovervalue,setHoverValue] = useState(0);
  return (
    <div className='container'>
       {new Array(starCount).fill(0).map((value,index)=>{
        return (<span
        className = {
            index < hovervalue
            || (hovervalue == 0 &&  index < starValue )? 'gold':""
        }

        onClick={()=> setStarValue(index+1)}
        onMouseEnter={()=> setHoverValue(index+1)}
        onMouseLeave={()=> setHoverValue(0)}
        >
         ★
        </span>
        )
       } )}

    </div>
  )
}

export default StarRating
