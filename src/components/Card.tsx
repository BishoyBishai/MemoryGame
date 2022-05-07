import React from 'react';
import CardWrapper from './CardWrapper';
import CardImage from './CardImage';
import CardBack from './CardBack';
import {ICard} from './Game';

interface Props {
  gridSize: number;
  isFlipped: boolean;
  disabled: boolean;
  card: ICard;
  onClick: (card: ICard) => void;
}

export default function Card({
  card,
  onClick,
  isFlipped,
  disabled,
  ...props
}: Props) {

  const handleCardClick = () => {
    if (disabled) return;
     onClick(card);
  };

  return (
    <CardWrapper {...props} isFlipped={isFlipped} onClick={handleCardClick}>
      <CardBack />
      <CardImage
        src={`https://picsum.photos/id/${card.imageId}/600`}
        alt={`${card.imageId}`}
      />
    </CardWrapper>
  );
}
