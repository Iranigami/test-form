import logo from '../assets/icons/logo.svg'
import decimal from '../assets/icons/menu/decimal.png'
import wallet from '../assets/icons/wallet-icon.svg'
import LangButton from './LangButton'

export default function Header() {
    return(
        <div className="w-full h-[2rem] lg:mt-[2.5rem] mt-[1.25rem] flex text-white justify-between top-0 left-0 right-0 fixed lg:px-[6rem] px-[1.4rem] z-10 ">
            <div className="lg:flex hidden font-default text-[0.875rem] gap-[20px] justify-center items-center">
                <div className="font-poppins font-semibold flex gap-[0.4rem] text-[1.25rem] mr-[1.25rem]">
                    <img src={logo} alt="logo" className="w-[2rem]" />
                    <span>Canyon Swap</span>
                </div>
                <a className={`text-[#40A5F3] font-bold hover:opacity-[80%]`} href="">
                    Главная
                </a>
                <a className={`hover:opacity-[80%]`} href="">
                    Лендинг
                </a>
                <a className={`hover:opacity-[80%]`} href="">
                    FAQ
                </a>
                <a className={`hover:opacity-[80%]`} href="">
                    Обратная связь
                </a>
            </div>
            <div className="flex gap-[0.313rem]">
              <LangButton className="lg:flex hidden"/>
              <button className="flex w-[5.4rem] h-[2rem] bg-[#222342] rounded-[1.875rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.3)] text-[0.75rem] justify-center items-center gap-[0.25rem]">
                <img src={decimal} alt="decimal" className="w-[1.125rem]"/>
                <span>Decimal</span>
              </button>
              <button className="flex w-[8rem] h-[2rem] bg-[#222342] rounded-[1.875rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.3)] text-[0.75rem] justify-center items-center gap-[0.25rem]">
                <img src={wallet} alt="wallet" className="w-[1.125rem]"/>
                <span>Connect wallet</span>
              </button>
              <LangButton className="lg:hidden"/>
            </div>
        </div>
    )
}