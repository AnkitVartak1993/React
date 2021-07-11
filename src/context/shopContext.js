import React, { Component } from 'react';
import Client from 'shopify-buy';


const ShopContext = React.createContext();
const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

class ShopProvider extends Component {
    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }

    componentDidMount() {
        //create new checkout or fetch existing one
        if (!localStorage.checkoutId) {
            this.createCheckout();
        }
        else {
            this.fetchCheckout(localStorage.getItem('checkout_id'));
        }
    }

    //create checkout id in user storage
    createCheckout = async () => {
        client.checkout.create().then((id) => {
            localStorage.setItem('checkout_id', id);
            this.setState({ checkout: id });
        })
    }

    //fetch items in cart
    fetchCheckout = async (checkoutId) => {
        client.checkout.fetch(checkoutId)
            .then((checkout) => {
            this.setState({checkout:checkout})
        })
    }

    addItemtoCheckout = async () => {

    }

    removeLineItem = async (lineIds) => {

    }

    //fetch all shopify products
    fetchAllProducts = async () => {
        client.product.fetchAll().then((products) => {
            this.setState({ products: products });
        })
    }

    //fetch a product by handle/unique name
    fetchProductWithHandle = async (handle) => {
        client.product.fetchByHandle(handle).then((product) => {
            this.setState({ product: product });
    })

    }

    closeCart = () => { }
    openCart = () => { }
    closeMenu = () => { }
    openMenu = () => { }


    render() {
        return (
                <ShopContext.Provider value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    closeMenu: this.closeMenu,
                    openMenu: this.openMenu,
                    removeLineItem: this.removeLineItem,
                    addItemtoCheckout: this.addItemtoCheckout
                }}>
                    {this.props.children}
                </ShopContext.Provider>
        );
    }
}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };
export default ShopProvider;
