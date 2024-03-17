import { useEffect } from "react";
import { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const modelContacto = {
    idContacto: 0,
    nombre: "",
    correo: "",
    telefono: "",
};

export default function ModalContacto({
    mostrarModal,
    setMostrarModal,
    guardarContacto,
    editar,
    setEditar,
    editarContacto
}) {
    const [contacto, setContacto] = useState(modelContacto);

    const enviarDatos = () => {
        if (contacto.idContacto === 0) {
            guardarContacto(contacto)
        } else {
            editarContacto(contacto)
        }
    }

    const actualizarDatos = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setContacto({ ...contacto, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modelContacto)
        }
    },[editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>{contacto.idContacto == 0 ? "Nuevo Contacto": "Editar Contacto"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            onChange={(e) => actualizarDatos(e)}
                            name="nombre"
                            value={contacto.nombre}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input
                            onChange={(e) => actualizarDatos(e)}
                            name="correo"
                            value={contacto.correo}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input
                            onChange={(e) => actualizarDatos(e)}
                            name="telefono"
                            value={contacto.telefono}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>
                    Guardar
                </Button>
                <Button
                    color="danger"
                    size="sm"
                    onClick={cerrarModal}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}