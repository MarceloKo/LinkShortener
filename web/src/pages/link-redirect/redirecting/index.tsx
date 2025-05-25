
import logo from '../../../assets/logo-icon.svg'
export default function LinkRedirecting() {
    return (
        <div className='flex flex-col items-center text-center justify-center gap-10'>
            <img src={logo} width={80} className="logo" alt="Não encontrado" />

            <h2 className='text-2xl font-bold'>Redirecionando...</h2>
            <div>

                <p>O link será aberto automaticamente em alguns instantes. </p>
                <p>Não foi redirecionado? <a href='/' className='text-blue-700'>Acesse aqui</a></p>
            </div>
        </div>

    )
}