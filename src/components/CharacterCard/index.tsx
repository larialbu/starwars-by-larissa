import { useEffect, useState } from "react";
import styles from "@/styles/CharacterCard.module.css";

export default function CharacterCard({ character }) {
  const [homeworld, setHomeworld] = useState("");
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const fetchName = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.name || data.title;
      };

      if (character.homeworld) {
        const homeworldName = await fetchName(character.homeworld);
        setHomeworld(homeworldName);
      }

      if (character.films) {
        const filmsList = await Promise.all(character.films.map(fetchName));
        setFilms(filmsList);
      }

      if (character.species) {
        const speciesList = await Promise.all(character.species.map(fetchName));
        setSpecies(speciesList);
      }

      if (character.vehicles) {
        const vehiclesList = await Promise.all(character.vehicles.map(fetchName));
        setVehicles(vehiclesList);
      }

      if (character.starships) {
        const starshipsList = await Promise.all(character.starships.map(fetchName));
        setStarships(starshipsList);
      }

      setLoading(false);
    }

    fetchDetails();
  }, [character]);

  return (
    <div className={styles.characterCard}>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <>
          <h3>{character.name}</h3>
          <p>Altura: {character.height}</p>
          <p>Peso: {character.mass}</p>
          <p>Cor do cabelo: {character.hair_color}</p>
          <p>Cor da pele: {character.skin_color}</p>
          <p>Cor dos olhos: {character.eye_color}</p>
          <p>Ano de nascimento: {character.birth_year}</p>
          <p>Gênero: {character.gender}</p>
          <p>Planeta natal: {homeworld}</p>
          <p>Filmes: {films.join(", ")}</p>
          <p>Espécies: {species.join(", ")}</p>
          <p>Veículos: {vehicles.join(", ")}</p>
          <p>Naves espaciais: {starships.join(", ")}</p>
        </>
      )}
    </div>
  );
}
