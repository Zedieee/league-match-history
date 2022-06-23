import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [div, setDiv] = useState({});
  const [id, setId] = useState("");
  const [puuid, setPuuid] = useState({});
  const[matchId, setMatchId] = useState({});
  const [match, setMatch] = useState({});
  const API_KEY = "RGAPI-5d114965-ab63-466f-b4f3-e039ac14af3e";



  function searchForPlayer(event) {
    //hacer la llamada a la API
    var ApiCallString =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;

    //manejar la llamada
    axios
      .get(ApiCallString)
      .then(function (response) {
        //Entro
  
        setPlayerData(response.data);
        setId(response.data.id);
        setPuuid(response.data.puuid)
      })
      .catch(function (error) {
        //Valio
        console.log(error);
      });
      
  }

  function getRank(event) {
    var Rank =
      "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      id +
      "?api_key=" +
      API_KEY;

    axios
      .get(Rank)
      .then(function (response) {
       
        setDiv(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      var MatchID ="https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"+
      puuid +
      "/ids?start=0&count=2&api_key="+
      API_KEY;
  
      axios
      .get(MatchID)
      .then(function (response) {

        setMatchId(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

      
  }
 function getHistory(event){
  var n= 0;
  for(var i=0;i<matchId.length;i++){
    n+= i;
    var Match =["https://americas.api.riotgames.com/lol/match/v5/matches/"+
    matchId[n]+
  "?api_key="+
  API_KEY]; 
  console.log(Match);
  axios
  .get(Match)
  .then(function (response) {
    console.log(response.data);
    setMatch(response.data);

  })
  .catch(function (error) {
    console.log(error);
  });
  }
 
 }
  
 


  return (
    <div className="md:flex md:flex-col h-screen flex-col  items-center flex justify-center bg-blue-100 ">
      <h1 className="font-medium text-center  md:mx-auto  leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Buscador de jugadores
      </h1>
      <div className=" py-6  md:mx-auto  flex flex-row">
        <input
          type="text"
          className="
        form-control 
        block
        
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded-l-lg
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleText0"
          placeholder="Buscar jugador"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="  md:mx-auto inline-block px-6 py-2.5 bg-blue-600 rounded-r-lg text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => searchForPlayer(e)}
        >
          Buscar
        </button>
        <div className="p-4 ">
        
      </div>
    
      <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className=" md:mx-auto inline-block px-6 py-2.5  bg-blue-600 rounded text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => getRank(e) }
        >
          Actualizar 
        </button>
        <div className="p-4">  </div>
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className=" md:mx-auto inline-block px-6 py-2.5  bg-blue-600 rounded text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => getHistory(e) }
        >
          Actualizar historial
        </button>
      
      </div>
      <div className="flex flex-row">
      <div className=" rounded-lg shadow-lg bg-white max-w-sm ">
        {JSON.stringify(playerData) != "{}" ? (
          <>
            <img
              alt="akivatuimagendeperfil"
              className="  md:mx-auto rounded-t-lg"
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" +
                playerData.profileIconId +
                ".png"
              }
            />
            <div className="p-6">
              <p className="   text-gray-900 text-xl font-medium mb-2">
                {playerData.name}
              </p>
              <p className= " text-gray-700 text-base mb-4">
                Nivel {playerData.summonerLevel}
              </p>
            </div>
          </>
        ) : (
          <>
           <img
              alt="akivatuimagendeperfil"
              className="  md:mx-auto rounded-t-lg"
              src={
                "https://opgg-static.akamaized.net/images/profile_icons/profileIcon29.jpg"
              }
            />
            <div className="p-6">
              <p className="   text-gray-900 text-xl font-medium mb-2">
               Nombre
              </p>
              <p className= " text-gray-700 text-base mb-4">
                Nivel 
              </p>
            </div>
          </>
        )}
      </div>
     
      <div className=" px-3.5 self-center ">
        {JSON.stringify(div) != "{}" ? (
          <>
            <div className=" rounded-lg shadow-lg bg-slate-50 w-full flex flex-row " >
              <div className="p-6 ">
              <p>Tier {div[0].tier}</p>
              <img className="w-20 h-20" src={"Emblem_"+div[0].tier+".png"}></img>
              <p>Rank {div[0].rank}</p>
              <p>
                wins {div[0].wins} losses {div[0].losses}
              </p>
              </div>
              <div className="p-6 ">
              <p>Tier {div[1].tier}</p>
              <img className="w-20 h-20" src={"Emblem_"+div[1].tier+".png"}></img>
              <p>Rank {div[1].rank}</p>
              <p>
                wins {div[1].wins} losses {div[1].losses}
              </p>
            </div>

            </div>
          </>
        ) : (
          <>
           <div className=" rounded-lg shadow-lg bg-slate-50 w-full flex flex-row " >
              <div className="p-6 ">
              <p>Tier </p>
              <img className="w-20 h-20" src={"https://eloboost24.eu/images/divisions/0.webp"}></img>
              <p>Rank</p>
              <p>
                wins 0 losses 0
              </p>
              </div>
              <div className="p-6 ">
              <p>Tier </p>
              <img className="w-20 h-20" src={"https://eloboost24.eu/images/divisions/0.webp"}></img>
              <p>Rank </p>
              <p>
                wins 0 losses 0
              </p>
            </div>
            </div>
          </>
        )}
      </div>
      <div className=" px-3.5 ">
        {JSON.stringify(match) != "{}" ? (
          <>
            <div className=" rounded-lg shadow-lg bg-slate-50 w-full flex flex-row   " >
              <div className="p-6 ">
             <p>
            Modo {match.info.gameMode}
        
             </p>
             <p>
              Duracion {Math.floor((match.info.gameDuration / 60) % 60)+"m "+ match.info.gameDuration % 60 + "s"}
             </p>
            </div>

            </div>
          </>
        ) : (
          <>
           <div className=" rounded-lg shadow-lg bg-slate-50 w-full flex flex-row " >
              <div className="p-6 ">
              
            </div>
            </div>
          </>
        )}
      </div>
      </div>
      
    </div>
  );
}
