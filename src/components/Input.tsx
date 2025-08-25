import React from 'react'

type PropsInput = {
    placeholder: string,
    values: string,
    onchange: React.ChangeEventHandler<HTMLInputElement>
}

export const Input = ({placeholder, values, onchange} : PropsInput) => {
    return (
        <input
            className="border rounded-md px-4 py-2"
            placeholder={placeholder}
            value={values}
            onChange={onchange}

        />
    )
}
