import React from 'react'
import { IProduct } from 'src/api/RandomShop'
import { CURRENCY_CODE, LOCALE, MAX_ITEM_COUNT } from '../config'
import CurrencyValue from './CurrencyValue'

import './ShopItem.scss'

interface IProps extends IProduct {
    onChange: (value: number) => void;
    onRemove: (value: string) => void
}

interface IState {
    quantity: number,
    isRemoving: boolean
}

export default class ShopItem extends React.Component<IProps, IState> {
    public readonly state: IState = {
        quantity: this.props.quantity,
        isRemoving: false
    };

    public get uid():string{
        return this.props.uid
    } 

    public get quantity():number{
        return this.state.quantity
    } 

    public get cost(): number {
        const { price } = this.props
        const quantity = this.state.quantity

        return price * quantity
    }

    private _update = (value: string | number) => {
        const pickedValue = parseInt(value as string)

        if (pickedValue > MAX_ITEM_COUNT) { alert(`Maxium of ${MAX_ITEM_COUNT} units per product type`) }

        this.setState({
            ...this.state,
            quantity: Math.min(pickedValue, MAX_ITEM_COUNT)
        })
        this.props.onChange(this.cost)
    };

    private _remove = () => {
        this.setState({
            ...this.state,
            isRemoving: true
        })
        setTimeout(() => this.props.onRemove(this.props.uid), 320)
    }

    render():JSX.Element {
        const { quantity } = this.state
        const { name } = this.props

        return (
            <fieldset className={`ShopItem ${this.state.isRemoving ? 'out' : ''}`}>

                <label>
                    {name}
                </label>

                <CurrencyValue
                    code={CURRENCY_CODE}
                    locale={LOCALE}
                    value={this.cost}
                    title="Price" />

                <div>
                    <input
                        onChange={(event) => this._update(event.target.value)}
                        type="number"
                        step="1"
                        min="1"
                        max="5"
                        value={quantity}
                    />
                </div>

                <div className="columnCost">
                    <CurrencyValue
                        code={CURRENCY_CODE}
                        value={this.cost}
                        locale={LOCALE}
                        title="Cost" />

                    <button onClick={this._remove} type="button">
                        Remove Product
                    </button>
                </div>

            </fieldset >
        )
    }
}
