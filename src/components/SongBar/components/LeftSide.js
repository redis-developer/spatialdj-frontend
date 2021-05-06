import React from 'react';
import { useSelector } from 'react-redux';
import { HStack, IconButton, Text, VStack, Tag } from '@chakra-ui/react';
import { FaChevronUp } from 'react-icons/fa';

function LeftSide(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  const playlist = useSelector(state => state.playlists);
  const { playlists, selectedPlaylist } = playlist;

  if (!authenticated) {
    return <Tag size="lg">👀 SPECTATOR MODE</Tag>;
  }

  return (
    <HStack spacing="2rem">
      <IconButton
        variant="outline"
        onClick={props.openDrawer}
        icon={<FaChevronUp />}
      />
      {selectedPlaylist == null ? (
        <Text>No playlist selected</Text>
      ) : (
        <VStack align="left" spacing={0}>
          <Text fontWeight="bold">
            Selected playlist: {playlists?.[selectedPlaylist]?.name}
          </Text>
          <Text>
            Your next song: {playlists?.[selectedPlaylist]?.queue?.[0]?.title}
          </Text>
        </VStack>
      )}
    </HStack>
  );
}

export default LeftSide;
