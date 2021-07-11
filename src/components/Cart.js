import React, {useContext} from 'react';
import { ShopContext } from '../context/shopContext';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input
} from "@chakra-ui/react";


const Cart = () => {
    const { isCartOpen, closeCart, checkOut, removeLineItem } = useContext(ShopContext);

    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement="right"
                onClose={closeCart}
            >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Shopping Cart</DrawerHeader>

            <DrawerBody>
                <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
            </DrawerContent>
      </Drawer>
        </>
    )
}

export default Cart
