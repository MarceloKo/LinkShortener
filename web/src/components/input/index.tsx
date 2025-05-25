
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    id: string;
}
export default function Input(inputProps: InputProps) {
    const { label, id, prefix, error, ...props } = inputProps;
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-500" htmlFor={id}>{label}</label>}
            <div className={`p-3 flex items-center border-2 rounded-lg ${error ? 'border-red-500' : 'border-gray-300'} focus-within:border-gray-400`}>
                {prefix && (
                    <label htmlFor={id} className="text-gray-500">
                        {prefix}
                    </label>
                )}
                <input
                    id={id}
                    {...props}
                    className="flex-1 outline-none bg-transparent"
                />
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}