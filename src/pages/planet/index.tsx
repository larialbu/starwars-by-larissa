import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import PlanetCard from "@/components/PlanetCard"; 
import styles from "@/styles/Planets.module.css";

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
}

export default function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [nextPage, setNextPage] = useState<string>("https://swapi.dev/api/planets/");

  const fetchPlanets = async () => {
    const response = await fetch(nextPage);
    const data = await response.json();
    setPlanets((prevPlanets: Planet[]) => [...prevPlanets, ...data.results]);
    setNextPage(data.next);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <>
      <Head>
        <title>Todos os Planetas - Star Wars</title>
        <meta name="description" content="Lista de todos os planetas do universo Star Wars." />
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
        <section id="planets" className={styles.planets}>
          <h2>Planetas</h2>
          <div className={styles.planetGrid}>
            {planets.map((planet, index) => (
              <PlanetCard key={index} planet={planet} />
            ))}
          </div>
          {nextPage && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMore} onClick={fetchPlanets}>
                Carregar Mais
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
