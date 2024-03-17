import { useEffect, useState } from 'react';
import './App.css';
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap';
import TablaContactos from './Components/TablasContacto';
import ModalContacto from './Components/ModalContacto';


function App() {
    const [contacto, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);


    useEffect(() => {
        mostrarContactos();
    }, [])

    async function mostrarContactos() {
        const response = await fetch('/api/contacto/lista', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    async function guardarContacto(contacto) {
        const response = await fetch('/api/contacto/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
        });
        if (response.ok) {
            setMostrarModal(!contacto);
            mostrarContactos();
        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch("/api/contacto/editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json: charset=utf-8'

            },
            body: JSON.stringify(contacto)
        });
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    const eliminarContacto = async (id) => {
        var respuesta = window.confirm("Desea eliminar el contacto");
        if (!respuesta) {
            return
        }
        const response = await fetch("/api/contacto/eliminar/" + id, {
            method: 'DELETE'
        });
        if (response.ok) {
            mostrarContactos();
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                                Nuevo contacto
                            </Button>
                            <hr>
                        </hr>
                            <TablaContactos
                                contactos={contacto}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>                    
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
    )
}

export default App;