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
    Input,
    SimpleGrid,
    Text,
    Image,
    Flex,
    Box,
    Link
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';

const Cart = () => {
    const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(ShopContext);

    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement="right"
                onClose={closeCart}
                siz='sm'
            >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Shopping Cart</DrawerHeader>

            <DrawerBody>
                <Input placeholder="Type here..." />
                {checkout.lineItems?.length ? checkout.lineItems.map(item => (
                    <SimpleGrid templateColumns='repeat(4, 1fr)' gap={1} keys={item.title}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <CloseIcon cursor="pointer" onClick={() => removeLineItem(item.id)} />
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                            <Image src={item.variant.image.src} />
                            </Box>
                            <Box display="flex" flexDir="column" align="center" justify="center">
                                <Text fontSize="sm" fontWeight="bold">
                                    {item.title}
                                </Text>
                                <Text fontSize="sm">
                                    {item.variant.title}
                                </Text>
                            </Box>
                            <Box>
                                <Text height="100%" display="flex" align="center" justifyContent="center">
                                    {item.variant.price}
                                </Text>
                            </Box>
                    </SimpleGrid>)) : 
                        <Box h="100%" w="100%">
                            <Text h="100%" display="flex" flexDir="column" alignItems="center" justifyContent="center">Your Cart is empty!</Text>
                        </Box>
                        }
            </DrawerBody>

                    { checkout.lineItems?.length ?
                        <DrawerFooter>
                        <Button colorScheme="blue">
                            <Link href={checkout.webUrl}>
                                Checkout
                            </Link>
                        </Button>
                    </DrawerFooter> : null }
            </DrawerContent>
      </Drawer>
        </>
    )
}

export default Cart
