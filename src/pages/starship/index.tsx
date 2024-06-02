import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import StarshipCard from "@/components/StarshipCard";
import styles from "@/styles/Characters.module.css";

interface Starship {
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
  films: string[];
}

export default function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]); // Definindo o tipo do estado como array de Starship
  const [nextPage, setNextPage] = useState<string>("https://swapi.dev/api/starships/");

  const fetchStarships = async () => {
    const response = await fetch(nextPage);
    const data = await response.json();
    setStarships((prevStarships: Starship[]) => [...prevStarships, ...data.results]); // Utilizando a interface Starship para tipar o estado
    setNextPage(data.next);
  };

  useEffect(() => {
    fetchStarships();
  }, []);

  return (
    <>
      <Head>
        <title>Todas as Naves - Star Wars</title>
        <meta name="description" content="Lista de todas as naves do universo Star Wars." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <Image src="/logo.png" alt="Logo Star Wars" width={120} height={80} priority />
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="/">Início</a>
          </li>
          <li>
            <a href="/character">Personagens</a>
          </li>
          <li>
            <a href="/starship">Naves</a>
          </li>
          <li>
            <a href="/planet">Planetas</a>
          </li>
        </ul>
      </nav>

      <main className={styles.main}>
        <section id="starships" className={styles.starships}>
          <h2>Naves</h2>
          <div className={styles.starshipGrid}>
            {starships.map((starship, index) => (
              <StarshipCard key={index} starship={starship} />
            ))}
          </div>
          {nextPage && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMore} onClick={fetchStarships}>
                Carregar Mais
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
