import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: null,
    height: null,
    types: [],
  });

  async function downloadPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={pokemon.image} alt="pokemon" />
      <div className="pokemon-details-name">{pokemon.name}</div>
      {pokemon.height !== null && (
        <div className="pokemon-details-name">Height: {pokemon.height}</div>
      )}
      {pokemon.weight !== null && (
        <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
      )}
      <div className="pokemon-details-types">
        {pokemon.types.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
