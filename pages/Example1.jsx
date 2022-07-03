import React, {useEffect, useState} from "react";


const Example1 = ({match})=>{
    const [tag, setTag]=useState();
const [partida]=useState(match);



    return (
        <>{match.forEach(d => {
            
            return(
        
               
            <li key={d.info.gameId}>
              
              LastGame {d.info.gameMode}
           
              {" "}
              Duracion{" "}
              {Math.floor((d.info.gameDuration / 60) % 60) +
                "m " +
                (d.info.gameDuration % 60) +
                "s"}
                
           
            </li>
        
          )
      }  )}</>
      );
}

export default Example1;