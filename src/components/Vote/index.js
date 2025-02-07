import React, { useContext, useRef, useState } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector, useDispatch } from 'react-redux';
import { clientLike, clientSave, clientDislike } from 'slices/voteSlice';
import { Flex, IconButton, Text, HStack, VStack } from '@chakra-ui/react';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from '@emotion/styled';
import throttle from 'utils/throttle';
import { addSong, removeSong } from 'slices/playlistsSlice';
import {
  addSong as saveToPlaylist,
  removeSong as removeSave,
} from 'services/playlist.js';

const BottomLeft = styled(Flex)`
  flex-direction: column;
  align-self: flex-start;
  margin-top: auto;
  pointer-events: auto;
`;

function Vote() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.user.authenticated);
  const currentSong = useSelector(state => state.queue.currentSong);
  const selectedPlaylistId = useSelector(
    state => state.playlists.selectedPlaylist
  );
  const vote = useSelector(state => state.vote);
  const { clientVote, clientSaved, likes, dislikes } = vote;
  const [saveSongLoading, setSaveSongLoading] = useState(false);

  const like = () => {
    socket.emit('vote', 'like');
    dispatch(clientLike());
  };

  const saveSong = async () => {
    setSaveSongLoading(true);

    const res = await saveToPlaylist(selectedPlaylistId, {
      song: currentSong,
    });

    if (res.status === 200 && res.data.success) {
      dispatch(
        addSong({ playlistId: selectedPlaylistId, song: res.data.song })
      );
      setSaveSongLoading(false);
      dispatch(clientSave());
    } else {
      // Handle save fail
    }
  };

  const dislike = () => {
    socket.emit('vote', 'dislike');
    dispatch(clientDislike());
  };
  const likeSong = useRef(throttle(like, 250));
  const dislikeSong = useRef(throttle(dislike, 250));

  if (!currentSong || !authenticated) return <div></div>;

  return (
    <BottomLeft>
      <HStack alignItems="flex-end">
        <VStack>
          <Text>{likes}</Text>
          <IconButton
            size="lg"
            onClick={likeSong.current}
            colorScheme={clientVote === 'like' ? 'blue' : 'gray'}
            aria-label="Like this song"
            icon={<IoMdThumbsUp />}
          />
        </VStack>
        <VStack>
          <Text>{clientSaved ? '😍' : ''}</Text>
          <IconButton
            size="lg"
            disabled={clientSaved}
            isLoading={saveSongLoading}
            onClick={saveSong}
            colorScheme={clientSaved ? 'yellow' : 'gray'}
            aria-label="Save this song"
            icon={clientSaved ? <AiFillStar /> : <AiOutlineStar />}
          />
        </VStack>
        <VStack>
          <Text>{dislikes}</Text>
          <IconButton
            size="lg"
            onClick={dislikeSong.current}
            colorScheme={clientVote === 'dislike' ? 'blue' : 'gray'}
            aria-label="Dislike this song"
            icon={<IoMdThumbsDown />}
          />
        </VStack>
      </HStack>
    </BottomLeft>
  );
}

export default Vote;
