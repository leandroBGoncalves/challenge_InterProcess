import styles from './style.module.scss';

export function RowListMap({dados}) {

    return (
        <div className={styles.ContainerAllRow}>
            <div className={styles.lineData}>
                <span className={styles.namePatient}>{dados.name}</span>
                <div className={styles.contentData}>
                    <p>Data de Nascimento</p>
                    <time>{dados.DN}</time>
                </div>
                <div className={styles.contentData}>
                    <p>Idade</p>
                    <span>32</span>
                </div>
                <div className={styles.statusPatient}><div className={!false ? "" : styles.notActive}></div><p className={!false ? '' : styles.notActive}>Ativo</p></div>
            </div>
            <div className={styles.lineData}>
                <div className={styles.contentData}>
                    <p>Sexo</p>
                    <span>Masculino</span>
                </div>
                <div className={styles.contentData}>
                    <p>CPF</p>
                    <span>03124687125</span>
                </div>
                <div className={styles.contentData}>
                    <p>Endereço</p>
                    <span>Rua foz do iguaçu, 410 - North Parck - Campo Grande MS</span>
                </div>
            </div>
        </div>
    )
}