import { useNavigate } from 'react-router'
import errorLogo from '../../../assets/404.svg'
export default function LinkNotFound() {
    const navigate = useNavigate()
    const handleBack = () => navigate('/')
    const url = window.location.hostname
    return (
        <div className='flex flex-col items-center text-center justify-center gap-10'>
            <img src={errorLogo} className="logo" alt="Não encontrado" />

            <h2 className='text-2xl font-bold'>Link não encontrado</h2>
            <p>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href='#' onClick={handleBack} className='text-blue-700'>{url}</a></p>
        </div>
    )
}