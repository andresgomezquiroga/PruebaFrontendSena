import React from 'react'
import { Button } from './Button'

type TypeFormacion = {
    id: string | number;
    nombre: string;
    modalidad: string;
    duracion: string;
};

export const Card = ({formacion, handleModal}: {formacion: TypeFormacion, handleModal: () => void}) => {
    return (
        <div key={formacion.id} className="flex flex-col">
            <div className="p-6 border rounded-3xl bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                <h2 className="text-2xl font-bold mb-2">{formacion.nombre}</h2>
                <p className="text-lg mb-1">Modalidad: {formacion.modalidad}</p>
                <p className="text-lg mb-4">Duración: {formacion.duracion}</p>
                <Button
                    text="Registrar"
                    onclickModal={handleModal}
                />
            </div>
        </div>
    )
}