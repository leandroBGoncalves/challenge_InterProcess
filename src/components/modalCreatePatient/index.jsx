import { useCallback, useEffect, useState } from 'react';
import { FaTimes, FaRev } from 'react-icons/fa';
import { useForm } from "react-hook-form";

import Dialog from '@mui/material/Dialog';
import styles from './style.module.scss';


export function CreateNewPatient({ openModal, closeModal }) {
    const { handleSubmit, register } = useForm();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [dn, setDn] = useState('');
    const [sexo, setSexo] = useState('');
    const [address, setAddress] = useState('');
    const [innerData, setInnerData] = useState(false);
    const [newPatient, setNewPatient] = useState([]);


    function handleSubmitPatient(data) {
       setNewPatient([...newPatient, data]);
       setInnerData(true); 
    }

    useEffect(() => {
        if (innerData) {
             setData()
        }
    })

    function setData() {
        let parsePatient = JSON.stringify(newPatient)
        window.localStorage.setItem('patient', parsePatient)
    }

    const getLocal = () => {
        let localStorage = window.localStorage.getItem('patient')
        let parseLocal = JSON.parse(localStorage)
        setNewPatient(parseLocal)
    }


    useEffect(() => {
        getLocal()
    }, [])


    return (
        <Dialog 
        open={openModal}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        >
            <h3 className={styles.headerModal}>
                Cadastro de pacientes
                <FaTimes onClick={closeModal}/>
            </h3>
            <form onSubmit={handleSubmit(handleSubmitPatient)} className={styles.modalForm}>
                <div className={`${styles.containerInputs} ${styles.boxName}`}>
                    <p>Nome completo:</p>
                    <input {...register("name")} type="text" required/>
                </div>
                <div className={styles.containerInputsDouble}>
                    <div className={styles.boxStandartInput}>
                        <p>CPF:</p>
                        <input {...register("cpf")}  type="text" maxLength="11" minLength="11" required/>
                    </div>
                    <div className={styles.boxStandartInput}>
                        <p>Data de Nascimento:</p>
                        <input {...register("date")} type="date" required/>
                    </div>
                </div>
                <div className={`${styles.containerInputs} ${styles.selectInput}`}>
                    <p>Sexo:</p>
                    <select {...register("sexo")} name="sexo" id="sexo">
                        <option value=" ">Selecione uma opção</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div className={`${styles.containerInputs} ${styles.addressInput}`}>
                    <p>Cep:</p>
                    <div>
                        <input type="text" />
                        <button><FaRev /> Buscar</button>
                    </div>
                </div>
                <div className={styles.boxAllBtn}>
                    <button type="button" onClick={closeModal} className={styles.cancel}>Cancelar</button>
                    <button type="submit" onSubmit={handleSubmit(handleSubmitPatient)} className={styles.save}>Salvar</button>
                </div>
            </form>
        </Dialog>
    )
}