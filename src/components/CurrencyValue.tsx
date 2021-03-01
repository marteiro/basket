import React from 'react'

import './CurrencyValue.scss'

interface IProps {
    locale: string
    value: number
    code: string
    title: string
}

export default function CurrencyValue({value, code, title, locale }: IProps): JSX.Element {

    const currencyString = value.toLocaleString(locale, { style: 'currency', currency: code })

    return (
        <output title={title} className="CurrencyValue">
            &nbsp;{currencyString}
        </output>
    )
}