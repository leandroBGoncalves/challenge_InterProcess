import { useEffect, useState } from "react";
import { FaTimes, FaRev } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import styles from "./style.module.scss";

export function CreateNewPatient({ openModal, closeModal, getDados }) {
  const { handleSubmit, register } = useForm();
  const [checked, setChecked] = useState(true);
  const [cep, setCep] = useState();
  const [address, setAddress] = useState();
  const [innerData, setInnerData] = useState(false);
  const [newPatient, setNewPatient] = useState([]);
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  async function getAdressWhitCep() {
    await axios
      .get(`https://cep.awesomeapi.com.br/json/${cep}`)
      .then((response) => {
        const data = response.data;
        setAddress(data);
      })
      .catch((error) => {
        setErrorAddress(true);
      });
  }

  function handleSubmitPatient(data) {
    const checkCpf = newPatient.find((check) => check.cpf === data.cpf);
    if (newPatient) {
      if (checkCpf === undefined) {
        setNewPatient([...newPatient, data]);
        setInnerData(true);
      } else {
        setErrorCpf(true);
      }
    } else {
      if (checkCpf === undefined) {
        setNewPatient([data]);
        setInnerData(true);
      } else {
        setErrorCpf(true);
      }
    }
  }

  function setData() {
    let parsePatient = JSON.stringify(newPatient);
    window.localStorage.setItem("patient", parsePatient);
    getDados();
    closeModal();
  }

  const getLocal = () => {
    let localStorage = window.localStorage.getItem("patient");
    let parseLocal = JSON.parse(localStorage);
    setNewPatient(parseLocal);
  };

  useEffect(() => {
    if (innerData) {
      setData();
      setInnerData(false);
    }
  });

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <Dialog open={openModal} onClose={closeModal} fullWidth maxWidth="sm">
      <h3 className={styles.headerModal}>
        Cadastro de pacientes
        <FaTimes onClick={closeModal} />
      </h3>
      <form
        onSubmit={handleSubmit(handleSubmitPatient)}
        className={styles.modalForm}
      >
        <p className={styles.initialInstruction}>
          Os campos marcados com * são Obrigatórios
        </p>
        <div className={`${styles.containerInputs} ${styles.boxName}`}>
          <p>Nome completo:*</p>
          <input {...register("name")} type="text" required />
        </div>
        <div className={styles.containerInputsDouble}>
          <div className={styles.boxStandartInput}>
            {!errorCpf && (
              <>
                <p>CPF:*</p>
                <input
                  {...register("cpf")}
                  type="text"
                  maxLength="11"
                  minLength="11"
                  required
                />
              </>
            )}
            {errorCpf && (
              <Alert
                variant="filled"
                severity="error"
                action={
                  <Button
                    onClick={() => setErrorCpf(false)}
                    color="inherit"
                    size="small"
                  >
                    Fechar
                  </Button>
                }
              >
                Este CPF ja esta cadastrado!
              </Alert>
            )}
          </div>
          <div className={styles.boxStandartInput}>
            <p>Data de Nascimento:*</p>
            <input {...register("date")} type="date" required />
          </div>
        </div>
        <div className={`${styles.containerInputs} ${styles.selectInput}`}>
          <div>
            <p>Sexo:*</p>
            <select {...register("sexo")} name="sexo" id="sexo">
              <option value=" ">Selecione uma opção</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
          <div className={styles.status}>
            <p className={!checked ? styles.disabled : ""}>Inativo</p>
            <Switch
              color="success"
              {...register("status")}
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className={checked ? styles.active : ""}>ativo</p>
          </div>
        </div>
        <div className={`${styles.containerInputs} ${styles.addressInput}`}>
          {!errorAddress && (
            <>
              <p>Cep:</p>
              <div>
                <input type="number" onChange={(e) => setCep(e.target.value)} />
                <button type="button" onClick={getAdressWhitCep}>
                  <FaRev /> Buscar
                </button>
              </div>
            </>
          )}
          {errorAddress && (
            <Alert
              variant="filled"
              severity="error"
              action={
                <Button
                  onClick={() => setErrorAddress(false)}
                  color="inherit"
                  size="small"
                >
                  Fechar
                </Button>
              }
            >
              CEP não encontrado!
            </Alert>
          )}
          {address && (
            <>
              <div className={styles.boxAddressReturn}>
                <span>Confirme o endereço e insira a numeração</span>
                <div>
                  <input
                    {...register("addressName")}
                    className={styles.addressReturn}
                    type="text"
                    value={
                      address.address +
                      `,` +
                      " " +
                      address.district +
                      " " +
                      "-" +
                      " " +
                      address.city +
                      " " +
                      "-" +
                      " " +
                      address.state
                    }
                  />
                  <input
                    {...register("addressNumber")}
                    className={styles.addressNumber}
                    type="number"
                    placeholder="Número"
                    min="1"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.boxAllBtn}>
          <button type="button" onClick={closeModal} className={styles.cancel}>
            Cancelar
          </button>
          <button
            type="submit"
            onSubmit={handleSubmit(handleSubmitPatient)}
            className={styles.save}
          >
            Salvar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
