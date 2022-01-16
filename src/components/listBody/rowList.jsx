import { useEffect, useState } from "react";
import moment from "moment";

import styles from "./style.module.scss";

export function RowListMap({ dados }) {
  const [status, setStatus] = useState(true);
  const [sexo, setSexo] = useState("");

  function controlSatatus() {
    if (dados.status === true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }

  function controlSexo() {
    if (dados.sexo === "M") {
      setSexo("Masculino");
    } else {
      setSexo("Feminino");
    }
  }

  useEffect(() => {
    controlSatatus();
    controlSexo();
  });

  return (
    <div className={styles.ContainerAllRow}>
      <div className={styles.lineData}>
        <span className={styles.namePatient}>{dados.name}</span>
        <div className={styles.contentData}>
          <p>Data de Nascimento</p>
          <time>{moment(dados.date).format("DD/MM/yyyy")}</time>
        </div>
        <div className={styles.statusPatient}>
          <div className={!status && styles.notActive}></div>
          <p className={!status && styles.notActive}>
            {!status ? "Inativo" : "Ativo"}
          </p>
        </div>
      </div>
      <div className={styles.lineData}>
        <div className={styles.contentData}>
          <p>Sexo</p>
          <span>{sexo}</span>
        </div>
        <div className={styles.contentData}>
          <p>CPF</p>
          <span>{dados.cpf}</span>
        </div>
        <div className={styles.contentData}>
          <p>Endereço</p>
          <span>{dados.addressName}</span>
        </div>
        <div className={styles.contentData}>
          <p>Numero</p>
          <span>{dados.addressNumber}</span>
        </div>
      </div>
    </div>
  );
}
