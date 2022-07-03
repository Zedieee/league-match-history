import React, { useState, Component, useEffect} from "react";
import axios from "axios";
import Select from "react-select";
import Example1 from "./Example1";
export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [div, setDiv] = useState({});
  const [id, setId] = useState("");
  const [puuid, setPuuid] = useState({});
  const [matchId, setMatchId] = useState({});
  const [match, setMatch] = useState([]); 
  var matches = new Array();
  var [tamaño, setTamaño] = useState("");
  var routing = "";
  var regionalRoute = "";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [region, setRegion] = useState("");

  switch (region) {
    case "NA":
      routing = "https://na1.api.riotgames.com";
      regionalRoute = "https://americas.api.riotgames.com";
      break;
    case "LAN":
      routing = "https://la1.api.riotgames.com";
      regionalRoute = "https://americas.api.riotgames.com";
      break;
    case "BR":
      routing = "https://br1.api.riotgames.com";
      regionalRoute = "https://americas.api.riotgames.com";
      break;
    case "LAS":
      routing = "https://la2.api.riotgames.com";
      regionalRoute = "https://americas.api.riotgames.com";
      break;
    case "KR":
      routing = "https://kr.api.riotgames.com";
      regionalRoute = "https://asia.api.riotgames.com";
      break;
    case "OCE":
      routing = "https://oc1.api.riotgames.com";
      regionalRoute = "https://sea.api.riotgames.com";
      break;
    case "TR":
      routing = "https://tr1.api.riotgames.com";
      regionalRoute = "https://asia.api.riotgames.com";
      break;
    case "RU":
      routing = "https://ru.api.riotgames.com";
      regionalRoute = "https://asia.api.riotgames.com";
      break;
    case "JP":
      routing = "https://jp1.api.riotgames.com";
      regionalRoute = "https://asia.api.riotgames.com";
      break;
    case "EUNE":
      routing = "https:/eun1.api.riotgames.com";
      regionalRoute = "https://europe.api.riotgames.com";
      break;
    case "EUW":
      routing = "https://euw1.api.riotgames.com";
      regionalRoute = "https://europe.api.riotgames.com";
      break;
    default:
      break;
  }

  function searchForPlayer(event) {
    //hacer la llamada a la API
    var ApiCallString =
      routing +
      "/lol/summoner/v4/summoners/by-name/" +
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
      routing +
      "/lol/league/v4/entries/by-summoner/" +
      id +
      "?api_key=" +
      API_KEY;
    var MatchID =
      regionalRoute +
      "/lol/match/v5/matches/by-puuid/" +
      puuid +
      "/ids?start=0&count=20&api_key=" +
      API_KEY;

    axios
      .get(Rank)
      .then(function (response) {
        setDiv(response.data);
        setTamaño(div.length);
      })
      .catch(function (error) {
        console.log(error);
      });

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
              regionalRoute +
                "/lol/match/v5/matches/" +
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
        <select
          name="region"
          className=" dropdown-toggle
          mx-2
          px-6
          py-2.5
          bg-blue-400
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-500 hover:shadow-lg
          focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-600 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
          onChange={(e) => setRegion(e.target.value)}
        >
          <option>Region</option>
          <option value="NA">NA</option>
          <option value="LAN">LAN</option>
          <option value="LAS">LAS</option>
          <option value="BR">BR</option>
          <option value="KR">KR</option>
          <option value="TR">TR</option>
          <option value="EUNE">EUNE</option>
          <option value="EUW">EUW</option>
          <option value="JP">JP</option>
          <option value="OCE">OCE</option>
          <option value="RU">RU</option>
        </select>
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
                  className="  md:mx-auto rounded-t-lg w-full "
                  src={
                    "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" +
                    playerData.profileIconId +
                    ".png"
                  }
                />
                <div className="flex space-x-2 justify-center">
                  <span className="absolute text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white   bottom-0 rounded-full  ">
                    {" "}
                    {playerData.summonerLevel}{" "}
                  </span>
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
                  <span className="absolute text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white   bottom-0 rounded-full  ">
                    {" "}
                    0{" "}
                  </span>
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
          {JSON.stringify(div) != "{}" && div.length > 1 ? (
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
        </div>
        <div>
        <ul> <Example1 match={match}/></ul>
        </div>
    
       
      </div>
     
    </div>
  );
}
