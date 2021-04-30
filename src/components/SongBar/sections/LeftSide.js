import React from 'react';
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function LeftSide(props) {
  return (
    <HStack spacing="2rem">
      <IconButton
        variant="outline"
        onClick={props.openDrawer}
        icon={props.isDrawerOpen ? <FaChevronDown /> : <FaChevronUp />}
      />
      <VStack align="left">
        <Text fontWeight="bold">Now Playing: {props.currentSong}</Text>
        <Text>Next Song: {props.nextSong}</Text>
      </VStack>
    </HStack>
  );
}

export default LeftSide;