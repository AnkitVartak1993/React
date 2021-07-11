import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { Box, Flex, Icon, Badge, Image, Text } from '@chakra-ui/react';
import { MdMenu, MdShoppingBasket, MdDialpad } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { openCart, openMenu, checkout } = useContext(ShopContext);

    return (
        <Flex backgroundColor='#FFA8E2'  flexDir='row' justifyContent='space-between' p='2rem'>
            <Icon fill='white' cursor='pointer' as={MdMenu} w={30} h={30}
            onClick={openMenu}
            >Menu</Icon>
            <Link to={'/'}><Icon fill='white' as={MdDialpad} w={100} h={100} /></Link>
            <Box>
            <Icon fill="white" cursor="pointer" onClick={() => openCart()} as={MdShoppingBasket} w={30} h={30}></Icon>
                <Badge backgroundColor="#FF38BD" borderRadius="50%">{checkout?.lineItems?.length}</Badge>
            </Box>
        </Flex>
    )
}

export default NavBar
