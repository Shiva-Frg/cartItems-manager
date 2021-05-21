import React from 'react'

import Wrapper from '../hoc/Wrapper'
import Modal from '../Components/UI/Modal/Modal'
import Loader from '../Components/UI/Loader/Loader'
import Controls from '../Components/Controls/Controls'
import Order from '../Components/Order/Order'
import axios from '../axios-order'

const prices = {
    product1: 45,
    product2: 55,
    product3: 65,
    product4: 75
}

class Shopping extends React.Component {
    state = {
        products: null,
        order: null,
        totalPrice: 0,
        showModal: false,
        loader: false
    }

    componentDidMount() {
        axios.get('/products.json')
        .then(res => {
            this.setState({ products: res.data })
        })
    }

    addProductToCart= (title) => {
        const productPrice = prices[title]
        const prevPrice = this.state.totalPrice
        const newPrice = prevPrice + productPrice

        const prevCount = this.state.products[title]
        const newCount = prevCount + 1
        const updatedProduct = {...this.state.products}
        updatedProduct[title] = newCount

        let product = null
        if (this.state.order !== null) {
            product = Object.keys(this.state.order).find(item => {
                return item === title
            })
            if (product !== undefined) {
                const updatedOrder = {...this.state.order}
                updatedOrder[product] = this.state.order[product] + 1
                this.setState({ order: updatedOrder })
            }
            else {
                this.setState({ order: {...this.state.order, [title]: 1 } })
            }
        }
        else {
            this.setState({ order: { [title]: 1 } })
        }

        this.setState({ products: updatedProduct, totalPrice: newPrice })
    }

    removeProduct = (title) => {
        const productPrice = prices[title]
        const prevPrice = this.state.totalPrice
        let newPrice = prevPrice - productPrice
        if (newPrice <= 0) {
            newPrice = 0
        }
        
        const prevCount = this.state.products[title]
        const newCount = prevCount - 1
        const updatedProduct = { ...this.state.products }
        updatedProduct[title] = newCount

        let product = null
        if (this.state.order !== null) {
            product = Object.keys(this.state.order).find(item => {
                return item === title
            })
            if (product !== undefined) {
                const updatedOrder = {...this.state.order}
                updatedOrder[product] = this.state.order[product] - 1
                if (updatedOrder[product] === 0) {
                    delete updatedOrder[product]
                }
                this.setState({ order: updatedOrder })
            }
        }

        this.setState({ products: updatedProduct, totalPrice: newPrice })
    }

    showModalHandler = () => {
        this.setState({ showModal: true })
    }

    closeModalHandler = () => {
        this.setState({ showModal: false })
    }

    sendProductToDatabase = () => {
        this.setState({ loader: true })
        const order = {
            order: this.state.order,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Shiva',
                email: 'frg.shivaspace47@gmail.com'
            }
        }
        axios.post('orders.json', order)
        .then(res => {
            this.setState({ loader: false, showModal: false })
        })
        .catch(err => {
            this.setState({ loader: false, showModal: false })
        })
    }

    render() {
        let order = null
        let products = <Loader />

        if (this.state.products) {
            products = (
                <Controls
                    products = {this.state.products}
                    totalPrice = {this.state.totalPrice}
                    addProduct = {this.addProductToCart}
                    removeProduct = {this.removeProduct}
                    order={this.showModalHandler}
                />
            )
        }

        if (this.state.order) {
            order = (
                <Order
                    order={this.state.order}
                    totalPrice={this.state.totalPrice}
                    cancel={this.closeModalHandler}
                    continue={this.sendProductToDatabase}
                />
            )
        }

        if (this.state.order === null) {
            order = (
                <Order
                    totalPrice={this.state.totalPrice}
                    cancel={this.closeModalHandler}
                    continue={this.sendProductToDatabase}
                />
            )
        }

        if (this.state.loader) {
            order = <Loader />
        }

        return (
            <Wrapper>
                <Modal show={this.state.showModal} modalClose={this.closeModalHandler} >
                    {order}
                </Modal>
                {products}
            </Wrapper>
        )
    }
}

export default Shopping