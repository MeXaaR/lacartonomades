import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppContext } from '../../context/appContext'
import { COLORS, FONTS } from '../../settings/theme'

const languages = ['fr','en']

const LanguagePicker = () => {
    const { i18n, t } = useTranslation()
    const [, dispatch] = useAppContext()
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      }
    return (
        <Wrapper>
            <h4 className="title is-5">Languages</h4>
            <Buttons className="buttons">
                {languages.map(ln => (
                    <button 
                        onClick={() => changeLanguage(ln)} 
                        className={`button is-rounded ${i18n.language === ln && "is-info"}`} 
                        key={ln}
                    >
                        <span className="icon">
                            <img src={`/images/languages/${ln}.png`} />
                        </span>
                        <span>{ln}</span>
                    </button>
                ))}
            </Buttons>
        </Wrapper>
    )
}

const Buttons = styled.div`
    button {
        text-transform: uppercase;
        font-family: ${FONTS.TITLES};
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    .title {
        font-family: ${FONTS.TITLES};
        color: ${COLORS.MAIN};
        }
`

export default LanguagePicker