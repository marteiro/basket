import React from 'react'
import { CURRENCY_CODE, LOCALE } from '../config'
import CurrencyValue from './CurrencyValue'

import './MathResult.scss'

interface IProps {
  title: string;
  value: number;
}

const MathResult: React.FC<IProps> = ({ title, value }:IProps) => {
    return (
        <fieldset className="MathResult">
            <label>{title}</label>
            <CurrencyValue
                locale={LOCALE}
                value={value}
                title="Price"
                code={CURRENCY_CODE} />
        </fieldset>
    )
}

export default MathResult
