import { useEffect, useState } from "react";
import styles from "@/styles/StarshipCard.module.css";

interface Starship {
  films: string[];
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  length: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
}

interface Props {
  starship: Starship;
}

export default function StarshipCard({ starship }: Props) {
  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFilms() {
      const fetchTitle = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.title;
      };

      if (starship.films) {
        const filmsList: string[] = await Promise.all(starship.films.map(fetchTitle));
        setFilms(filmsList);
        setLoading(false);
      }
    }

    fetchFilms();
  }, [starship]);

  if (loading) {
    return (
      <div className={styles.starshipCard}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.starshipCard}>
      <h3>{starship.name}</h3>
      <p>Modelo: {starship.model}</p>
      <p>Fabricante: {starship.manufacturer}</p>
      <p>Classe: {starship.starship_class}</p>
      <p>Comprimento: {starship.length}</p>
      <p>Custo: {starship.cost_in_credits} créditos</p>
      <p>Velocidade Máxima: {starship.max_atmosphering_speed}</p>
      <p>Tripulação: {starship.crew}</p>
      <p>Passageiros: {starship.passengers}</p>
      <p>Capacidade de Carga: {starship.cargo_capacity}</p>
      <p>Consumíveis: {starship.consumables}</p>
      <p>Classificação Hyperdrive: {starship.hyperdrive_rating}</p>
      <p>MGLT: {starship.MGLT}</p>
      <p>Filmes: {films.join(", ")}</p>
    </div>
  );
}
