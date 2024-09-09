import Image from "next/image";
import styles from "./page.module.css";
import Pagina from "./components/Pagina";

export default function Home() {
  return (
    <Pagina titulo="Bem Vindo">

      <h1 className="text-center" >Este é o meu projeto</h1>

    </Pagina>

  );
}
