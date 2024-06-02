import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import StarshipCard from "@/components/StarshipCard";
import styles from "@/styles/Characters.module.css";

export default function Starships() {
  const [starships, setStarships] = useState([]);
  const [nextPage, setNextPage] = useState("https://swapi.dev/api/starships/");

  const fetchStarships = async () => {
    const response = await fetch(nextPage);
    const data = await response.json();
    setStarships((prevStarships) => [...prevStarships, ...data.results]);
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
