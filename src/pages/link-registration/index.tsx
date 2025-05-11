import logo from '../../assets/logo-icon.svg'
import LinkCreate from './link-create'
import LinkLists from './link-lists'

export default function PageLinkRegistration() {
    return (
        <div className='flex flex-col w-full max-w-7xl mx-auto gap-5 p-5 max-md:items-center md:my-10 md:gap-10 '>
            <img src={logo} width={70} className="logo" alt="Não encontrado" />
            <div className='flex flex-col gap-5  md:flex-row justify-between' >
                <LinkCreate />
                <LinkLists />
            </div>

        </div>
    )
}