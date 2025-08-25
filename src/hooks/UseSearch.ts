import React, { useEffect, useState } from 'react'
import { Data, type DataType } from '../data/Data'

export const UseSearch = () => {
    const TYPESFORMACION: any[] = [
        { key: 1, value: "Todos" },
        { key: 2, value: "Mixta" },
        { key: 3, value: 'virtual' },
        { key: 4, value: "Presencial" }
    ]

    const [searchBuscar, setsearchBuscar] = useState<string>("")
    const [saveFormacion, setsaveFormacion] = useState<DataType[]>(Data)
    const [selectedType, setselectedType] = useState<string>("Todos")
    const [loading, setloading] = useState(false)
    const [isModal, setisModal] = useState(false)
    const [selectedProgram, setselectedProgram] = useState<DataType | null>(null)

    const [successMessage, setsuccessMessage] = useState<string>("")
    const [errorMessage, seterrorMessage] = useState<string>("")
    const [isRegistering, setisRegistering] = useState(false)
    const [isSearching, setisSearching] = useState(false)

    useEffect(() => {
        setloading(true)
        const timer = setTimeout(() => {
            setloading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleSearch =  (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setsearchBuscar(value)

        setisSearching(true)

        setTimeout(() => {
            try {
                let filtered = Data

                if (value.trim() !== '') {
                    filtered = Data.filter((items) =>
                        items.nombre.toLowerCase().includes(value.toLowerCase())
                    )
                }

                if (selectedType !== "Todos") {
                    filtered = filtered.filter((items) =>
                        items.modalidad.toLowerCase().includes(selectedType.toLowerCase())
                    )
                }

                setsaveFormacion(filtered)
                setisSearching(false)

                if (filtered.length === 0 && value.trim() !== '') {
                    seterrorMessage(`No se encontraron programas que coincidan con "${value}"`)
                    setTimeout(() => seterrorMessage(""), 3000)
                }

            } catch (error) {
                seterrorMessage("Error al buscar programas")
                setisSearching(false)
                setTimeout(() => seterrorMessage(""), 3000)
            }
        }, 500)
    }

    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setselectedType(value)

        setloading(true)
        setTimeout(() => {
            try {
                let filtered = Data

                if (value !== "Todos") {
                    filtered = Data.filter((items) =>
                        items.modalidad.toLowerCase().includes(value.toLowerCase())
                    )
                }

                if (searchBuscar.trim() !== '') {
                    filtered = filtered.filter((items) =>
                        items.nombre.toLowerCase().includes(searchBuscar.toLowerCase())
                    )
                }

                setsaveFormacion(filtered)
                setloading(false)

                if (filtered.length === 0) {
                    seterrorMessage(`No hay programas disponibles para la modalidad "${value}"`)
                    setTimeout(() => seterrorMessage(""), 3000)
                }

            } catch (error) {
                seterrorMessage("Error al filtrar programas")
                setloading(false)
                setTimeout(() => seterrorMessage(""), 3000)
            }
        }, 300)
    }

    const handleModal = (program: DataType) => {
        setselectedProgram(program)
        setisModal(true)
    }

    const handleRegister = async () => {
        setisRegistering(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            setisModal(false)
            setisRegistering(false)
            setsuccessMessage(`¡Te has registrado exitosamente en "${selectedProgram?.nombre}"!`)

            setTimeout(() => setsuccessMessage(""), 5000)

        } catch (error) {
            setisRegistering(false)
            seterrorMessage("No se pudo completar el registro. Intenta nuevamente.")
            setTimeout(() => seterrorMessage(""), 4000)
        }
    }
    return {
        successMessage,
        errorMessage,
        seterrorMessage,
        setsuccessMessage,
        searchBuscar,
        handleSearch,
        isSearching,
        selectedType,
        handleType,
        loading,
        TYPESFORMACION,
        saveFormacion,
        handleModal,
        isModal,
        selectedProgram,
        isRegistering,
        setisModal,
        handleRegister
    }
}
