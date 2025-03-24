import { PropsWithChildren, useState } from 'react';
import lang from '../assets/icons/menu/lang.svg'
import back from '../assets/icons/back.svg'

type Props = {
    className?:string
};

export default function LangButton(props: PropsWithChildren<Props>){
    const languages = ['RU', 'EN'];
      const [selectedLanguage, setSelectedLanguage] = useState('RU');
      const [showMenu, setShowMenu] = useState(false);
    
      const handleClick = () => {
        setShowMenu(!showMenu);
      };
    
      const handleSelect = (language: string) => {
        setSelectedLanguage(language);
        setShowMenu(false);
      };
    
      return (
        <div className={`${props.className} text-[0.75rem] relative`}>
          <button 
            onClick={handleClick}
            className="flex w-[4rem] h-[2rem] bg-[#222342] rounded-[1.875rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.3)] justify-center items-center gap-[0.25rem]">
                <img src={lang} alt="language" className="w-[1.125rem]" />
                {selectedLanguage}
                <img src={back} alt="img" className="w-[0.625rem]" />
          </button>
          {showMenu && (
            <ul className="w-[4.5rem] h-[4rem] bg-[#1A1830] rounded-[0.625rem] justify-left text-left p-[0.625rem] shadow-[0_4px_40px_0_rgba(0,0,0,0.3)] lg:absolute lg:mt-[2.625rem] mt-[0.375rem]">
              {languages.map((language) => (
                <li 
                    key={language} 
                    className={`${language === selectedLanguage && "text-[#40A5F3] opacity-[70%]"}`} 
                    onClick={() => handleSelect(language)}>
                  {language}
                </li>
              ))}
            </ul>
          )}
        </div>
      )
}