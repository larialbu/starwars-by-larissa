import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CharacterCard from "@/components/CharacterCard";
import StarshipCard from "@/components/StarshipCard";
import PlanetCard from "@/components/PlanetCard"; 
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu
  const router = useRouter();

  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setCharacters(data.results);
    }

    async function fetchStarships() {
      const response = await fetch("https://swapi.dev/api/starships/");
      const data = await response.json();
      setStarships(data.results);
    }

    async function fetchPlanets() {
      const response = await fetch("https://swapi.dev/api/planets/");
      const data = await response.json();
      setPlanets(data.results);
    }

    fetchCharacters();
    fetchStarships();
    fetchPlanets(); 
  }, []);

  const handleViewMoreCharacters = () => {
    router.push("/character");
  };

  const handleViewMoreStarships = () => {
    router.push("/starship");
  };

  const handleViewMorePlanets = () => { 
    router.push("/planet");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <title>Star Wars por Larissa</title>
        <meta name="description" content="Bem-vindo ao universo Star Wars!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ""}`}>
        <div className={styles.navBrand}>
          <Image src="/logo.png" alt="Logo Star Wars" width={120} height={80} priority />
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#about">Sobre</a>
          </li>
          <li>
            <a href="#characters">Personagens</a>
          </li>
          <li>
            <a href="#starships">Naves</a>
          </li>
          <li>
            <a href="#planets">Planetas</a> 
          </li>
        </ul>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={styles.hamburger}></span>
        </button>
      </nav>

      <main className={styles.main}>
        <section id="about" className={styles.about}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h1>Bem-vindo ao Universo Star Wars</h1>
              <p>
                Há muito tempo, numa galáxia muito, muito distante... Star Wars
                capturou os corações e mentes de gerações com suas histórias épicas,
                personagens memoráveis e aventuras cativantes.
              </p>
            </div>
            <div className={styles.aboutImage}>
              <img src="/dart-vader.png" alt="Fundo Star Wars" />
              <div className={styles.shadow}></div>
            </div>
          </div>
        </section>

        <section id="characters" className={styles.characters}>
          <h2>Personagens</h2>
          <div className={styles.characterGrid}>
            {characters.slice(0, 6).map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </div>
          <div className={styles.loadMoreContainer}>
            {/* <button className={styles.loadMore} onClick={handleViewMoreCharacters}>
              Ver Mais
            </button> */}
          </div>
        </section>

        <section id="starships" className={styles.starships}>
          <h2>Naves</h2>
          <div className={styles.starshipGrid}>
            {starships.slice(0, 6).map((starship, index) => (
              <StarshipCard key={index} starship={starship} />
            ))}
          </div>
          <div className={styles.loadMoreContainer}>
            {/* <button className={styles.loadMore} onClick={handleViewMoreStarships}>
              Ver Mais
            </button> */}
          </div>
        </section>

        <section id="planets" className={styles.planets}> 
          <h2>Planetas</h2>
          <div className={styles.planetGrid}>
            {planets.slice(0, 6).map((planet, index) => (
              <PlanetCard key={index} planet={planet} />
            ))}
          </div>
          <div className={styles.loadMoreContainer}>
            {/* <button className={styles.loadMore} onClick={handleViewMorePlanets}>
              Ver Mais
            </button> */}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 Star Wars por Larissa</p>
          <ul className={styles.footerLinks}>
            <li><a href="https://github.com/larialbu">Meu GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/larissa-albuquerque-39133a239/">Linkedin</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
