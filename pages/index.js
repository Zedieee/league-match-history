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
  const API_KEY = "RGAPI-08b98d6f-d8af-47b8-bb42-f46d6c01fb20";

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
        console.log(response);
        setPlayerData(response.data);
        setId(response.data.id);
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
        console.log(response);
        setDiv(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(div);

  return (
    <div className="h-screen flex-col  md:mx-auto items-center flex justify-center bg-blue-100 ">
      <h1 className="font-medium text-center  leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Buscador de jugadores
      </h1>
      <div className=" py-6  flex flex-row">
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
          className="inline-block px-6 py-2.5 bg-blue-600 rounded-r-lg text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => searchForPlayer(e)}
        >
          Buscar
        </button>
      </div>
      <div className=" rounded-lg shadow-lg bg-white max-w-sm">
        {JSON.stringify(playerData) != "{}" ? (
          <>
            <img
              alt="akivatuimagendeperfil"
              className="rounded-t-lg"
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" +
                playerData.profileIconId +
                ".png"
              }
            />
            <div className="p-6">
              <p className="text-gray-900 text-xl font-medium mb-2">
                {playerData.name}
              </p>
              <p className="text-gray-700 text-base mb-4">
                Nivel {playerData.summonerLevel}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="p-4">
        <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5  bg-blue-600 rounded text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={(e) => getRank(e)}
        >
          Actualizar
        </button>
      </div>
      <div>
        {JSON.stringify(div) != "{}" ? (
          <>
            <div>
              <p>Tier {div[0].tier}</p>
              <p>Rank {div[0].rank}</p>
              <p>
                wins {div[0].wins} losses {div[0].losses}
              </p>
            </div>
          </>
        ) : (
          <>
            <p>Rank</p>
          </>
        )}
      </div>
    </div>
  );
}
