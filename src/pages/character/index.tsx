import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import styles from "@/styles/Characters.module.css";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string>("https://swapi.dev/api/people/");

  const fetchCharacters = async () => {
    const response = await fetch(nextPage);
    const data = await response.json();
    setCharacters((prevCharacters: Character[]) => [...prevCharacters, ...data.results]);
    setNextPage(data.next);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <>
      <Head>
        <title>Todos os Personagens - Star Wars</title>
        <meta name="description" content="Lista de todos os personagens do universo Star Wars." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="characters" className={styles.characters}>
          <h2>Personagens</h2>
          <div className={styles.characterGrid}>
            {characters.map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </div>
          {nextPage && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMore} onClick={fetchCharacters}>
                Carregar Mais
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
