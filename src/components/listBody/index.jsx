import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { CreateNewPatient } from '../modalCreatePatient';
import { RowListMap } from './rowList';
import styles from './style.module.scss';

export function DashBoardList() {
    const [dados, setDados] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    function handleCloseModal() {
        setOpenModal(false)
    }
    function teste() {
        window.localStorage.setItem('teste', testeLocalJ)
    }

    const testeLocal = [
        {
            id: 1,
            name: 'leandro',
            DN: '09/09/1989',
            sexo: 'M'
        },
        {
            id: 2,
            name: 'leandro',
            DN: '09/09/1989',
            sexo: 'M'
        },
        {
            id: 3,
            name: 'leandro',
            DN: '09/09/1989',
            sexo: 'M'
        },
    ]

    const testeLocalJ = JSON.stringify(testeLocal)
    const getLocal = () => {
        let localStorage = window.localStorage.getItem('teste')
        let parseLocal = JSON.parse(localStorage)
        setDados(parseLocal)
    }
    console.log(dados.name)

    useEffect(() => {
        getLocal()
    }, [])

    return (
        <main className={styles.MainDashBoard}>
            <div className={styles.HeaderDashBoard}>
                <button onClick={() => setOpenModal(true)}><FaPlus /> Novo paciente</button>
            </div>
            {dados.map((dado) => (<RowListMap kay={dado.id} dados={dado} />))}
            <CreateNewPatient openModal={openModal} closeModal={handleCloseModal} />
        </main>
    )
}