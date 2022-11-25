import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { Row, Col, Button } from 'react-bootstrap'
import ListadoCiclos from "./components/ListadoCiclos";
import ListadoEvaluaciones from "./components/ListaEvaluaciones";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

const ListadoEvaluacionesPage = () => {
    const [listadoCiclos , setListadoCiclos] = useState([])
    const [listadoEvaluaciones, setListadoEvaluaciones] = useState([])
    

    const { cursoId } = useParams() // hook para obtener el parametro que viene en el path
    const { evaluacionId } = useParams()

    const httpObtenerCiclos = async () => {
        const resp = await fetch("http://localhost:4444/ciclos")
        const data = await resp.json()
        setListadoCiclos(data)
    }

    const httpObtenerEvaluaciones = async (cursoId) => {
        const resp = await fetch(`http://localhost:4444/evaluacion?curso=${cursoId}`)
        const data = await resp.json()
        setListadoEvaluaciones(data)
    }
    const onCicloSelected = (cicloId) =>{
        console.log(cicloId)
        httpObtenerEvaluaciones(cicloId)
    }
    const onEvaluacionSelected = (evaluacionId) => {
        console.log(evaluacionId)
        httpObtenerEvaluaciones(evaluacionId)
    }
    // Hook
    useEffect(() => {
        httpObtenerCiclos()
        httpObtenerEvaluaciones(cursoId)
    }, [])

    return <Layout
        makeHeader={ () => <Header titulo="Listado de Evaluaciones" /> }
        makeBody={ 
            () => <Row>
                <Col md={3}>
                    <ListadoCiclos ciclos={ listadoCiclos }
                    onCicloSelected = { onCicloSelected }
                    />
                </Col>
                <Col md={9}>
                    <Button variant="success"
                        className="mb-2">
                        Subir
                    </Button>
                    <ListadoEvaluaciones 
                        evaluaciones={ listadoEvaluaciones }
                        onEvaluacionSelected

                       />
                </Col>
            </Row> 
        }
        makeFooter={ () => <Footer />}
    />
}
export default ListadoEvaluacionesPage