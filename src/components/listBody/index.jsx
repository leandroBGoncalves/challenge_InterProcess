import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateNewPatient } from "../modalCreatePatient";
import { RowListMap } from "./rowList";
import styles from "./style.module.scss";

export function DashBoardList({ dados, getLocal }) {
  const [openModal, setOpenModal] = useState(false);
  const [ŕowsPerPage, setRowsPerPage] = useState(4);

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <main className={styles.MainDashBoard}>
      <div className={styles.HeaderDashBoard}>
        <button onClick={() => setOpenModal(true)}>
          <FaPlus /> Novo paciente
        </button>
      </div>
      {dados.slice(0, ŕowsPerPage).map((dado) => (
        <RowListMap key={dado.cpf} dados={dado} />
      ))}
      <CreateNewPatient
        openModal={openModal}
        closeModal={handleCloseModal}
        getDados={getLocal}
      />
      {dados.length > ŕowsPerPage && (
        <div className={styles.boxBtnLoadMore}>
          <button onClick={() => setRowsPerPage(ŕowsPerPage + 4)}>
            {dados.length >= ŕowsPerPage
              ? "Carregar mais..."
              : "Nada Mais para carregar"}
          </button>
        </div>
      )}
    </main>
  );
}
