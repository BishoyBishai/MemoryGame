import React, { useEffect, useState } from "react";
import Board from "./Board";
import Card from "./Card";
import { fetch } from "./../service";
import ErrorWrapper from "./ErrorWrapper";

interface Props {
  gridSize?: number;
}

export interface ICard {
  cardId: number;
  imageId: number;
  matched: boolean;
}

function Game({ gridSize = 5 }: Props) {
  const [cards, setCards] = useState<ICard[]>([]);
  const [errorInLoadingGameImages, setErrorInLoadingGameImages]= useState<boolean>(false);
  const [firstRevealedCard, setFirstRevealedCard] = useState<ICard | null>(
    null
  );
  const [secondRevealedCard, setSecondRevealedCard] = useState<ICard | null>(
    null
  );
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleRevealedCard = (card: ICard) => {
    // if the first click set the first revealedCard else set the second one 
    firstRevealedCard
      ? setSecondRevealedCard(card)
      : setFirstRevealedCard(card);
  };

  const resetRevealedCards = () => {
    setFirstRevealedCard(null);
    setSecondRevealedCard(null);
    setDisabled(false);
  };

  const fetchData = async () => {
    const response = await fetch("/api/v2/imageIds", 5);
    if (!response || !response.ok) {
      // the request has been failed 
      setErrorInLoadingGameImages(true);
      return;
    }

    const body: number[] = await response.json();
    if (!body) {
      // body parsing has been failed 
      setErrorInLoadingGameImages(true);
      return;
    }

    // build cards list  
    const cards: ICard[] = body.map((imageId) => ({
      cardId: Math.random(),
      imageId,
      matched: false,
    }));

    // if everything works good reset error state into false 
    setErrorInLoadingGameImages(false);

    // set Cards List with the new array of cards
    setCards(cards);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (firstRevealedCard && !secondRevealedCard) {
      // just one card Selected
      return;
    } 
    setDisabled(true);
    if (firstRevealedCard?.imageId === secondRevealedCard?.imageId) {
      // if we have two cards have been revealed
      if(firstRevealedCard?.cardId === secondRevealedCard?.cardId ){
        // the same card
        resetRevealedCards();
        return;
      }
      // matched cards
      setCards((prevCards) => {
        return prevCards.map((c) => {
          if (c.imageId === firstRevealedCard?.imageId) {
            return { ...c, matched: true };
          }
          return c;
        });
      });
    }
    // wait just one second before resetting the revealed card 
    setTimeout(() => {
      resetRevealedCards();
    }, 1000);
  }, [firstRevealedCard, secondRevealedCard]);

  if(errorInLoadingGameImages){
    return (
      <ErrorWrapper>
        <div className="error-body">
          sorry some problem occurred while loading the game <br />
          thanks for your refreshing this page
        </div>
        <button className="btn" onClick={fetchData}>refresh</button>
      </ErrorWrapper>
    );
  }
  return (
    <Board>
      {cards.map((card: ICard) => (
        <Card
          onClick={handleRevealedCard}
          disabled={disabled}
          isFlipped={
            card === firstRevealedCard ||
            card === secondRevealedCard ||
            card.matched
          }
          key={card.cardId}
          gridSize={gridSize}
          card={card}
        />
      ))}
    </Board>
  );
}

export default Game;
