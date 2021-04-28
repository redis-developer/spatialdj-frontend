import React, { useState } from 'react';
import { Avatar, Tag, Flex, ScaleFade } from '@chakra-ui/react';
import Draggable from 'react-draggable';

function Bubble(props) {
  const { image, username, prefix, defaultPos, type, pos } = props;
  const [isHover, setIsHover] = useState(false);
  const showTag = !(type === 'other' && !isHover);

  // Prevents dragging text and images
  const preventDragHandler = e => {
    e.preventDefault();
  };

  let tagColor = 'blue';

  switch (type) {
    case 'you':
      tagColor = 'blue';
      break;
    case 'songPicker':
      tagColor = 'red';
      break;
    default:
      break;
  }

  const handleHover = e => {
    setIsHover(true);
  };

  const handleUnHover = e => {
    setIsHover(false);
  };

  return (
    <Draggable
      disabled={type !== 'you'}
      defaultPosition={defaultPos}
      defaultClassName="_draggable"
      defaultClassNameDragging="__dragging"
      defaultClassNameDragged="__dragged"
      bounds="#canvas"
    >
      <Flex
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
        width="200px"
        flexDir="column"
        alignItems="center"
      >
        <Avatar
          cursor={type !== 'you' ? 'pointer' : 'move'}
          size="lg"
          src={image}
          name={username}
          onDragStart={preventDragHandler}
        />

        <ScaleFade in={showTag} initialScale={0.8}>
          <Tag mt={2} variant="solid" colorScheme={tagColor}>
            {prefix}&nbsp;{username.substr(0, 20)}
          </Tag>
        </ScaleFade>
      </Flex>
    </Draggable>
  );
}

export default Bubble;
