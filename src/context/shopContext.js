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

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
        {
                variantId,
            quantity: parseInt(quantity, 10), //base to the 10
        },
        ];
        const checkout = await client.checkout.addLineItems(
        this.state.checkout.id,
        lineItemsToAdd
        );
        this.setState({
            checkout: checkout
        });
        this.openCart();
    };

    removeLineItem = async (lineIds) => {
        const checkoutId = this.state.checkout.id

        client.checkout.removeLineItems(checkoutId, lineIds)
        .then(checkout => this.setState({ checkout }))
    }

    //fetch all shopify products
    fetchAllProducts = async () => {
        client.product.fetchAll().then((products) => {
            this.setState({ products: products });
        })
    }

    //fetch a product by handle/unique name
   fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });

    return product;
  };

    closeCart = () => { this.setState({ isCartOpen: false})}
    openCart = () => { this.setState({ isCartOpen: true})}
    closeMenu = () => { this.setState({ isMenuOpen: false })}
    openMenu = () => { this.setState({ isMenuOpen: true })}


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
                    addItemToCheckout: this.addItemToCheckout
                }}>
                    {this.props.children}
                </ShopContext.Provider>
        );
    }
}

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };
export default ShopProvider;
