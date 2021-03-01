import React from 'react'

import './TableHead.scss'

export default function TableHead():JSX.Element{

    return(
        <div className="TableHead">
            <div>Products</div>
            <div>Price</div>
            <div>Qty</div>
            <div>Cost</div>
        </div>
    )
}