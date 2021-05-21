import React from 'react'

import Builder from './Builder/Builder'

import './Controls.css'

const Controls = (props) => {
    const products = Object.keys(props.products).map(item => {
        return (
            <Builder 
                title={item}
                key={item}
                add={() => props.addProduct(item)}
                remove={() => props.removeProduct(item)}
            />
        )
    })

    return (
        <div className="controls">
            <div className="price">
                <p>total price: {props.totalPrice}</p>
            </div>
            {products}
            <button className="order-btn" onClick={props.order}>Order</button>
        </div>
    )
}

export default Controls