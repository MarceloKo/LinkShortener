import { useNavigate } from 'react-router'
import errorLogo from '../../assets/404.svg'

export default function PageNotFound() {
    const navigate = useNavigate()
    const handleBack = () => navigate('/')

    return (
        <div className="flex justify-center items-center h-screen px-5">
            <div className="flex flex-col items-center text-center justify-center gap-10 rounded-lg bg-white w-full max-w-2xl p-20">
                <img src={errorLogo} className="logo" alt="Não encontrado" />

                <h2>Página não encontrada</h2>
                <div>

                    <p>Ops! A página que você está procurando não foi encontrada.</p>
                    <a href="#" onClick={handleBack} className='text-blue-700'>Voltar para a página inicial.</a>

                </div>
            </div>
        </div>
    )
}