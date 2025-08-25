

export const Button = ({ text, onclickModal }: { text: string, onclickModal: () => void }) => {
    return (
        <button className="p-2 bg-green-500 border rounded-3xl border-green-200" onClick={onclickModal}>{text}</button>
    )
}
