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
  const [matchId, setMatchId] = useState({});
  const [match, setMatch] = useState([]);
  var matches = new Array();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
var routing = "NA";
switch (routing) {
  case "NA":
    routing="https://na1.api.riotgames.com"
    break;
case "LAN":
  routing="la1.api.riotgames.com"
  break;

  

  default:
    break;
}
  function searchForPlayer(event) {
    //hacer la llamada a la API
    var ApiCallString =
      routing+"/lol/summoner/v4/summoners/by-name/" +
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
        setPuuid(response.data.puuid);
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
    var MatchID =
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
      puuid +
      "/ids?start=0&count=20&api_key=" +
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

  function getHistory(event) {
    matchId.length > 0
      ? matchId.forEach((elemento) => {
          axios
            .get(
              "https://americas.api.riotgames.com/lol/match/v5/matches/" +
                elemento +
                "?api_key=" +
                API_KEY
            )
            .then((response) => {
              matches.push(response.data);
              setMatch(matches);
            })

            //creo vas a tener que guardarlo en algun arreglo
            .catch((error) => console.log(error));
        })
      : setMatch({
          error: "No hay información",
        });
  }

  return (
    
    <div className="md:flex md:flex-col h-screen flex-col  items-center flex justify-center bg-blue-100 ">
      
      <h1 className="font-medium text-center  md:mx-auto  leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Buscador de jugadores
      </h1>
      <div className=" py-6  md:mx-auto  flex flex-row">
        <div className=" ">
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
         </div>
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="  md:mx-auto inline-block px-6 py-2.5 bg-blue-600 rounded-r-lg text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => searchForPlayer(e)}
        >
          Buscar
        </button>
      
        <div className="p-4 "></div>

        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className=" md:mx-auto inline-block px-6 py-2.5  bg-blue-600 rounded text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => getRank(e)}
        >
          Actualizar
        </button>
        <div className="p-4"> </div>
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className=" md:mx-auto inline-block px-6 py-2.5  bg-blue-600 rounded text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => getHistory(e)}
        >
          Actualizar historial
        </button>
      </div>
      <div className="flex flex-row">
        <div className=" rounded-lg shadow-lg bg-white max-w-sm ">
          {JSON.stringify(playerData) != "{}" ? (
            <>
              <div className=" relative border-b-4 border-violet-500 ">
              <img
                alt="akivatuimagendeperfil"
                className="  md:mx-auto rounded-t-lg"
                src={
                  "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" +
                  playerData.profileIconId +
                  ".png"
                }
              />
              <div className="flex space-x-2 justify-center">
              <span className="absolute text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white   bottom-0 rounded-full  "> {playerData.summonerLevel} </span>
              </div>
              </div>
              <div className="p-6 ">
                <p className=" text-center font-Anek font-semibold  text-gray-900 text-xl  mb-2">
                  {playerData.name}
                </p>
               
              </div>
            </>
          ) : (
            <>
              <div className=" relative border-b-4 border-violet-500 ">
                <img
                  alt="akivatuimagendeperfil"
                  className="  md:mx-auto rounded-t-lg"
                  src={
                    "https://opgg-static.akamaized.net/images/profile_icons/profileIcon29.jpg"
                  }
                />
                 <div className="flex space-x-2 justify-center">
              <span className="absolute text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white   bottom-0 rounded-full  "> 0 </span>
              </div>
               </div>
           
              <div className="p-6 ">
                <p className=" font-Anek  text-gray-900 text-xl font-medium mb-2">
                  Nombre
                </p>
                
              </div>
            </>
          )}
        </div>

        <div className=" px-3.5  ">
          {JSON.stringify(div) != "{}" ? (
            <>
              <div className=" my-8 rounded-lg shadow-lg bg-slate-50 w-full flex flex-row ">
                <div className="p-6 ">
                  <p>Tier {div[0].tier}</p>
                  <img
                    className="w-20 h-20"
                    src={"Emblem_" + div[0].tier + ".png"}
                  ></img>
                  <p>Rank {div[0].rank}</p>
                  <p>
                    wins {div[0].wins} losses {div[0].losses}
                  </p>
                </div>
                <div className="p-6 ">
                  <p>Tier {div[1].tier}</p>
                  <img
                    className="w-20 h-20"
                    src={"Emblem_" + div[1].tier + ".png"}
                  ></img>
                  <p>Rank {div[1].rank}</p>
                  <p>
                    wins {div[1].wins} losses {div[1].losses}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="my-8 rounded-lg shadow-lg bg-slate-50 w-full flex flex-row ">
                <div className="p-6 ">
                  <p>Tier </p>
                  <img
                    className="w-20 h-20"
                    src={"https://eloboost24.eu/images/divisions/0.webp"}
                  ></img>
                  <p>Rank</p>
                  <p>wins 0 losses 0</p>
                </div>
                <div className="p-6 ">
                  <p>Tier </p>
                  <img
                    className="w-20 h-20"
                    src={"https://eloboost24.eu/images/divisions/0.webp"}
                  ></img>
                  <p>Rank </p>
                  <p>wins 0 losses 0</p>
                </div>
              </div>
            </>
          )}

          {JSON.stringify(match) != "[]" ? (
            <>
              <div
                className="bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3"
                id="static-example"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-mdb-autohide="false"
              >
                <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
                  <p className="font-bold text-white flex items-center">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="check-circle"
                      className="w-4 h-4 mr-2 fill-current"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                      ></path>
                    </svg>
                    LastGame {match[0].info.gameMode}
                  </p>
                  <div className="flex items-center">
                    <p className="text-white opacity-90 text-xs"></p>
                    <button
                      type="button"
                      className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                      data-mdb-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-b-lg break-words text-white">
                  <p>
                    Duracion{" "}
                    {Math.floor((match[0].info.gameDuration / 60) % 60) +
                      "m " +
                      (match[0].info.gameDuration % 60) +
                      "s"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3"
                id="static-example"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-mdb-autohide="false"
              >
                <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
                  <p className="font-bold text-white flex items-center">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="check-circle"
                      className="w-4 h-4 mr-2 fill-current"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                      ></path>
                    </svg>
                    LastGame
                  </p>
                  <div className="flex items-center">
                    <p className="text-white opacity-90 text-xs"></p>
                    <button
                      type="button"
                      className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                      data-mdb-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-b-lg break-words text-white"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
