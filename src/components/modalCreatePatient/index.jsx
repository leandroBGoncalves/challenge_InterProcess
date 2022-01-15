import Dialog from '@mui/material/Dialog';

export function CreateNewPatient({ openModal, closeModal }) {
    return (
        <Dialog 
        open={openModal}
        onClose={closeModal}
        >
            Cheguei Aqui
        </Dialog>
    )
}