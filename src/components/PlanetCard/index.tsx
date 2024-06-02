import { useEffect, useState } from "react";
import styles from "@/styles/PlanetCard.module.css";

interface Planet {
  films: string[];
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
}

interface Props {
  planet: Planet;
}

export default function PlanetCard({ planet }: Props) {
  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFilms() {
      const fetchTitle = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.title;
      };

      if (planet.films) {
        const filmsList: string[] = await Promise.all(planet.films.map(fetchTitle));
        setFilms(filmsList);
        setLoading(false);
      }
    }

    fetchFilms();
  }, [planet]);

  return (
    <div className={styles.planetCard}>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <>
          <h3>{planet.name}</h3>
          <p>Período de Rotação: {planet.rotation_period}</p>
          <p>Período Orbital: {planet.orbital_period}</p>
          <p>Diâmetro: {planet.diameter}</p>
          <p>Clima: {planet.climate}</p>
          <p>Gravidade: {planet.gravity}</p>
          <p>Terreno: {planet.terrain}</p>
          <p>Água na Superfície: {planet.surface_water}%</p>
          <p>População: {planet.population}</p>
          <p>Filmes: {films.join(", ")}</p>
        </>
      )}
    </div>
  );
}
