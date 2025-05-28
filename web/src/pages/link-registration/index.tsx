import logo from '../../assets/logo-icon.svg'
import brev from '../../assets/brev.ly.svg'
import LinkCreate from './link-create'
import LinkLists from './link-lists'

export default function PageLinkRegistration() {
    return (
        <div className='flex flex-col w-full max-w-7xl mx-auto gap-5 p-5 max-lg:items-center lg:my-10 lg:gap-10 '>
            <div className='flex flex-row gap-5'>
                <img src={logo} width={50} className="logo" alt="Logo" />
                <img src={brev} width={80} className="logo" alt="Brev.ly" />
            </div>
            <div className='flex flex-col gap-5  lg:flex-row justify-between w-full md:w-auto' >
                <LinkCreate />
                <LinkLists />
            </div>

        </div>
    )
}