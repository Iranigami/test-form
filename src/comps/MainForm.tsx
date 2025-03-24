import { useEffect, useState } from 'react'
import arrow_icon from '../assets/icons/arrow-next.svg'
import axios from 'axios'

import cryg from '../assets/icons/cryg-icon.png'
import del from '../assets/icons/del-icon.png'
import back from '../assets/icons/back.svg'
import info from '../assets/icons/info-icon.svg'
import wallet_icon from '../assets/icons/wallet-icon.svg'

export default function MainForm() {

    const [sellCurr, setSellCurr] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [buyCurr, setBuyCurr] = useState(0);
    const [delToDollar, setDelToDollar] = useState(2.154);      //useState to use it in future
    const [crygToDollar, setcrygToDollar] = useState(333.73);      //useState to use it in future
    const currFirst = "CRYG";
    const currSecond = "DEL";
 

    const getExchange = (jwtToken:string|null) => {
      axios.get('https://marketplace.backend.wtsdemo.ru/api/configuration/keys/15', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,}
      })
        .then(response => {
          const rate = response.data.data.configurationKey.key;
          setExchangeRate(rate);
        })
        .catch(error => {
          console.error('Ошибка получения курса обмена, попробуйте удалить куки сайта и попробовать снова');
          document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
          location.reload();
        });

    };

    const saveJwtToCookie = (token:string) => {
      document.cookie = `jwt=${token}; path=/`;
    };

    const readJwtFromCookie = () => {
      const cookieValue = document.cookie.match('(^|;) ?jwt=([^;]*)(;|$)');
      return cookieValue ? cookieValue[2] : null;
    };

    useEffect(() => {
      let isMounted = true;
    
      const jwtToken = readJwtFromCookie();
      
      if (jwtToken) {
        getExchange(jwtToken);
      } else {
        axios.get('https://marketplace.backend.wtsdemo.ru/api/csrf')
          .then((response) => {
            const csrfToken = response.data.csrfToken;

            axios.post('https://marketplace.backend.wtsdemo.ru/api/login', {
              email: 'admin@admin.com',
              password: '12345678',
            }, {
              headers: {
                "csrf-token": csrfToken,
              },
            })
              .then((response) => {
                const newJwtToken = response.data.data.tokens.accessToken;
                saveJwtToCookie(newJwtToken);
                getExchange(newJwtToken);
              })
              .catch((error) => {
                console.error('Ошибка авторизации:', error);
              });
          })
          .catch((error) => {
            console.error('Ошибка получения CSRF-токена:', error);
          });
      }
      const intervalId = setInterval(() => getExchange(jwtToken), 10000);   //bc there's no websocket server now?
      return () => {
        clearInterval(intervalId);
        isMounted = false;
      };
    }, []);
    
      const handleSellFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(event.target.value);
        if (!value) value = 0; 
        setSellCurr(value);
        setBuyCurr(value * exchangeRate);
      };

    return(
        <div className="z-0 lg:w-[32rem] lg:h-[35rem] w-[21rem] h-[28rem] bg-linear-to-b from-[#222342] to-[#22234200] rounded-[1.25rem] mx-auto lg:p-[1.25rem] p-[0.6rem] justify-center shadow-[0_4px_60px_0_rgba(0,0,0,0.3)] relative font-poppins font-normal lg:text-[1.125rem] text-[0.75rem] text-white">
            <div className="flex lg:gap-[1rem] gap-[1.25rem]">
                <button className="font-semibold">
                    Swap
                </button>
                <button className="opacity-[30%]">
                    Pools
                </button>
            </div>
            <div className="lg:w-[29.6rem] lg:h-[10rem] w-[19.7rem] h-[7.9rem] bg-[#FFFFFF04] rounded-[1.25rem] mx-auto lg:mt-[1.25rem] mt-[0.625rem] justify-left text-left px-[1.5rem] pt-[1.1rem]">
                <div className="opacity-[70%] font-default">Вы продаете</div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-[0.375rem] mt-[1rem] items-center">
                        <img src={cryg} alt="cryg" className="lg:h-[2.25rem] h-[2rem]" />
                        <span className="font-semibold lg:text-[1.625rem] text-[1rem]">{currFirst}</span>
                        <img src={back} alt="img" className="" />
                    </div>
                    <input id="sellInput" type="number" className="font-semibold text-right lg:text-[1.625rem] text-[1rem] focus:outline-none" onChange={handleSellFieldChange}  defaultValue={0}/>
                </div>
                <div className="flex lg:mt-[1.6rem] mt-[1rem] opacity-[70%] justify-between">
                    <div className="text-left">{currFirst}</div>
                    <div className="">~${(crygToDollar*sellCurr).toFixed(2)}</div>
                </div>
            </div>
            <div className="rounded-full bg-[#40A5F3] lg:w-[3rem] lg:h-[3rem] w-[2rem] h-[2rem] absolute mx-auto left-0 right-0 -mt-[1rem] justify-center items-center flex shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                <img src={arrow_icon} alt='arrow' className='mx-auto lg:w-[1.22rem] w-[1rem]'/>
            </div>
            <div className="lg:w-[29.6rem] lg:h-[10rem] w-[19.7rem] h-[7.9rem] bg-[#FFFFFF14] rounded-[1.25rem] mx-auto mt-[0.5rem] justify-left text-left px-[1.5rem] pt-[1.1rem]">
                <div className="opacity-[70%] font-default">Вы покупаете</div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-[0.375rem] mt-[1rem] items-center">
                            <img src={del} alt="del" className="lg:h-[2.25rem] h-[2rem]" />
                            <span className="font-semibold lg:text-[1.625rem] text-[1rem]">{currSecond}</span>
                            <img src={back} alt="img" className="" />
                        </div>
                        <div className="font-semibold text-right lg:text-[1.625rem] text-[1rem] focus:outline-none">
                            {buyCurr}
                        </div>
                    </div>
                    <div className="flex lg:mt-[1.6rem] mt-[1rem] opacity-[70%] justify-between">
                        <div className="text-left">{currSecond}</div>
                        <div className="">~${(delToDollar*buyCurr).toFixed(2)} {!!sellCurr && <span>({((delToDollar*buyCurr/(crygToDollar*sellCurr)-1)*100).toFixed(2)}%)</span>}</div>
                    </div>
            </div>
            <div className="lg:w-[29.6rem] lg:h-[2.5rem] w-[19.7rem] h-[2.5rem] bg-[#FFFFFF04] rounded-[0.625rem] mx-auto lg:mt-[1.25rem] mt-[0.625rem] flex justify-left items-center px-[0.625rem] lg:px-[1.25rem] lg:gap-[0.67rem] gap-[0.4rem]">
                <img src={info} alt="img" className="w-[1.25rem] opacity-[70%]" />
                <span className="opacity-[70%]">1 {currFirst} = {exchangeRate} {currSecond}</span> <span className="text-[#40A5F3]">(${delToDollar})</span>
            </div>
            <button className="bg-[#40A5F3] lg:w-[29.6rem] lg:h-[3.5rem] w-[19.7rem] h-[3.5rem] rounded-[0.9rem] flex justify-center items-center gap-[0.5rem] mt-[1.25rem]">
                <img src={wallet_icon} alt="wallet" className="w-[1.4rem]" />
                <span>Connect wallet</span>
            </button>
        </div>
    )
}