
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;

}
export default function Input(inputProps: InputProps) {
    const { label, error, ...props } = inputProps;
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-500">{label}</label>}
            <input
                {...props}
                className="border-2  p-3 border-gray-300 rounded-lg focus-visible:border-gray-400 outline-0"
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}