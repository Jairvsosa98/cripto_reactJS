import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #949fff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top:30px;

    &:hover {
        background-color: #727ddf;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige Tu Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige Tu Criptomoneda', criptos)

    useEffect(() => {
        const cosultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto

            })
            // console.log(arrayCriptos)
            setCriptos(arrayCriptos)
        }
        cosultarAPI();
    }, [])


    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            // console.log('EERORR') 
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (

        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
