# SPREAD Memory

### Background
This is a demo memory game product for a customer project, which was created by a colleague that has left the company.
The product comes without a backend and works with a custom api-client that mocks the requests. Unfortunately, he
could not finish the demo, and has left it in a non-compiling state without git history. 

#### Task
Please bring the game into a functional state (ignore ui and style to stay in the timebox),
and lay the foundation for the product that will emerge from this demo.
You may use any library you want, but please stay in a time window of maximum 4 hours.


### The Game Rules
- All the cards should be faced down when the game starts. 
- An image is revealed, when the user clicks on a card. 
- The user can reveal 2 images at a time.
- If the revealed images are the same they should stay revealed.


### Technical AC
- The code needs to be type-safe up to the i/o-boundary.
- Tests are not required


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Solution
----------------

**Fixed some bugs**

Add Missing files 

Parse request body in correct way

Add missing types  

**Start App**

Check what we already have and what is missing

Checking our services and application's structure 

**Development**

After reading README file and the code base. I started to develop the missing features to complete the game 

**1\. Fixed some bugs**
-----------------------

    // Game.tsx file 
    // Adding missing files 
    import { fetch } from "./../service"; 
    


**1\. Fixed some bugs**
-----------------------

    // Game.tsx file 
    // Change useEffect structure 
    // useEffect doesn't expect the callback function to return Promise, rather it expects that nothing is returned or a function is returned.
    
      useEffect(() => {
        fetchData(); // async function 
      }, []);

    // Game.tsx file 
    // add fetchData function to reaload game's image  
    
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
    


**1\. Fixed some bugs**
-----------------------

    // Game.tsx file 
    // Change Cards type from any to be ICard [] 
    // Add new game's state for error 
    
      const [cards, setCards] = useState<ICard[]>([]);
      const [errorInLoadingGameImages, setErrorInLoadingGameImages]= useState<boolean>(false);
    


**1\. Fixed some bugs**
-----------------------

    //  CardImage.tsx 
    // to display card's back I added property  backface-visibility
    
    export default styled.img`
      transform: rotateY(180deg);
      width: 100%;
      height: 100%;
    +  backface-visibility: hidden;
    `;
    
    // with this change we applied "All the cards should be faced down when the game starts."  
    


**2\. Start App**
-----------------

    // feature#1:  An image is revealed, when the user clicks on a card. 
    // to add this feature I added a prop function drill from the Game component into the Card component
    // on click on the card fire this function
    
    
     interface Props {
      gridSize: number;
      + onClick: (card: ICard) => void;
    }
    

**3\. Development**
-------------------

    // Game.tsx
    // feature#2:  The user can reveal 2 images at a time.
    // for this I added two new states 
    
    
      const [firstRevealedCard, setFirstRevealedCard] = useState<ICard | null>(
        null
      );
    
      const [secondRevealedCard, setSecondRevealedCard] = useState<ICard | null>(
        null
      );
    
    
    // on Click on memory card fire this function 
    
    const handleRevealedCard = (card: ICard) => {
      // if the first click set the first revealedCard else set the second one 
        firstRevealedCard
          ? setSecondRevealedCard(card)
          : setFirstRevealedCard(card);
    };


**3\. Development**
-------------------

    // Card.tsx
    // feature#2:  The user can reveal 2 images at a time.
    // I added new props for the card to check flipping state 
    
    
     interface Props {
      gridSize: number;
      + isFlipped: boolean;
      card: ICard;
      onClick: (card: ICard) => void;
    }


**3\. Development**
-------------------

    // Game.tsx
    // we flip the card if it one of revealed cards
            <Card
              onClick={handleRevealedCard}
              isFlipped={
                card === firstRevealedCard ||
                card === secondRevealedCard
              }
              key={card.cardId}
              gridSize={gridSize}
              card={card}
            />

    // Game.tsx
    // feature#3:  If the revealed images are the same they should stay revealed.
      useEffect(() => {
        if (firstRevealedCard && !secondRevealedCard) {
          // just one card Selected
          return;
        } 
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


**3\. Development**
-------------------

    // Game.tsx
    // feature#3:  If the revealed images are the same they should stay revealed.
      useEffect(() => {
        if (firstRevealedCard && !secondRevealedCard) {
          // just one card Selected
          return;
        } 
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


**3\. Development**
-------------------

    // Game.tsx
    //  to make sure that the user does not select another card while we revealing or resetting
    //  I added another state to disable cards on those cases 
      const [disabled, setDisabled] = useState<boolean>(false);
    // and add this state into the card strucure 
    
    
            <Card
              onClick={handleRevealedCard}
       +       disabled={disabled}
              isFlipped={
                card === firstRevealedCard ||
                card === secondRevealedCard ||
                card.matched
              }
              key={card.cardId}
              gridSize={gridSize}
              card={card}
            />


**3\. Development**
-------------------

    // Card.tsx
    //  to make sure that the user does not select another card while we revealing or resetting
    //  on Card Component if card on disaple state on click disable the action 
    interface Props {
      gridSize: number;
      isFlipped: boolean;
    +  disabled: boolean;
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
     +   if (disabled) return;
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
    
**3\. Development**
-------------------

    // Game.tsx
    //  on Error Display Error Component to refresh the page 
    
          <ErrorWrapper>
            <div className="error-body">
              sorry some problem occurred while loading the game <br />
              thanks for your refreshing this page
            </div>
            <button className="btn" onClick={fetchData}>refresh</button>
          </ErrorWrapper>
