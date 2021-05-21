import React from 'react'

import Wrapper from '../../hoc/Wrapper'
import Button from '../UI/Button/Button'

const Order = (props) => {

    let summary = null
    if (props.order) {
        summary = Object.keys(props.order).map(item => {
            return <li key={item}>{item}: {props.order[item]}</li>
        })
    }

    return(
        <Wrapper>
            <h3>Order</h3>
            <ul>
                {summary}
            </ul>
            <p>total price: {props.totalPrice}</p>
            {console.log(summary)}
            {
                summary === null || summary.length === 0 ? (
                    <div>
                        <p>Your Cart is still empty!</p>
                        <Button btnType="danger" click={props.cancel}>Back to Shop</Button>
                    </div>
                ) : <div>
                    <p>Continue?</p>
                    <Button btnType="success" click={props.continue}>Yes</Button>
                    <Button btnType="danger" click={props.cancel}>No</Button>
                </div>
            }
                
        </Wrapper>
    )
}

export default Order