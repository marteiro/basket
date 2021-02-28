import React, { SyntheticEvent } from "react";
import { IProduct } from "src/api/RandomShop";
import CurrencyValue from "./CurrencyValue";

import './ShopItem.scss'

interface IProps extends IProduct {
  onChange: (value: number) => void;
  onRemove: (value: string) => void
}

interface IState {
  quantity: number,
  isRemoving: boolean
}

const maxItemCount = 5;

export default class ShopItem extends React.Component<IProps, IState> {
  public readonly state: IState = {
    quantity: this.props.quantity,
    isRemoving: false
  };

  public get cost(): number {
    const { price } = this.props;
    const quantity = this.state.quantity;
    return price * quantity;
  }

  private _update = (value: string | number) => {
    const pickedValue = parseInt(value as string)

    if(pickedValue > maxItemCount) alert(`Maxium of ${maxItemCount} units per product type`) 

    this.setState({
      ...this.state,
      quantity: Math.min(pickedValue, maxItemCount)
    });
    this.props.onChange(this.cost);
  };

  private _remove = () => {
    this.setState({
      ...this.state,
      isRemoving: true
    });
    setTimeout(() => this.props.onRemove(this.props.uid), 320)
  }

  render() {
    const { quantity } = this.state;
    const { name, price } = this.props;

    return (
      <fieldset className={`ShopItem ${this.state.isRemoving ? 'out' : ''}`}>

        <label>
          {name}
        </label>

        <CurrencyValue
          symbol="£"
          value={this.cost}
          title="Price"
          code="GBP" />

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
            symbol="£"
            value={this.cost}
            title="Cost"
            code="GBP" />

          <button onClick={this._remove}>
            Remove Product
          </button>
        </div>

      </fieldset>
    );
  }
}
