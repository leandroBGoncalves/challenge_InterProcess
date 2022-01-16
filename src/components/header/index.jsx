import { FaSearch } from "react-icons/fa";
import logoImg from "../../assets/ClinicaAcme-removebg-preview.png";
import styles from "./style.module.scss";

export function HeaderPatientList({ setSearch }) {
  return (
    <header className={styles.containerAllHeader}>
      <dir className={styles.boxLogo}>
        <img src={logoImg} alt="Logo Clinica Acme" />
        <h5>Lista de pacientes</h5>
      </dir>
      <div className={styles.boxSearch}>
        <div className={styles.maskBackSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            name="searchName"
            id="searchName"
            placeholder="Pesquise pelo nome do paciente"
          />
          <FaSearch />
        </div>
      </div>
    </header>
  );
}
