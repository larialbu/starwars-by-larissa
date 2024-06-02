import { useEffect, useState } from "react";
import styles from "@/styles/CharacterCard.module.css";

interface Character {
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface Props {
  character: Character;
}

export default function CharacterCard( { character }: Props ) {
  const [homeworld, setHomeworld] = useState<string>(""); 
  const [films, setFilms] = useState<string[]>([]); 
  const [species, setSpecies] = useState<string[]>([]); 
  const [vehicles, setVehicles] = useState<string[]>([]); 
  const [starships, setStarships] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    async function fetchDetails() {
      const fetchName = async (url: string) => { 
        const response = await fetch(url);
        const data = await response.json();
        return data.name || data.title;
      };

      if (character.homeworld) {
        const homeworldName = await fetchName(character.homeworld);
        setHomeworld(homeworldName);
      }

      if (character.films) {
        const filmsList: string[] = await Promise.all(character.films.map(fetchName)); 
        setFilms(filmsList);
      }

      if (character.species) {
        const speciesList: string[] = await Promise.all(character.species.map(fetchName)); 
        setSpecies(speciesList);
      }

      if (character.vehicles) {
        const vehiclesList: string[] = await Promise.all(character.vehicles.map(fetchName)); 
        setVehicles(vehiclesList);
      }

      if (character.starships) {
        const starshipsList: string[] = await Promise.all(character.starships.map(fetchName)); // Definindo o tipo da lista de naves espaciais como array de strings
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
