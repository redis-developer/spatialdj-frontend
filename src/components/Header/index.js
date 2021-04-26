import React from 'react';
import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';
import { Flex } from '@chakra-ui/react';

function Header({ children }) {
  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg="blue.800"
      >
        <LeftMenu />
        <RightMenu />
      </Flex>
      {children}
    </div>
  );
}

export default Header;
