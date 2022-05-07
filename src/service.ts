function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a: number[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

export function generateCards(gridSize: number) {
  const imageIds: number[] = [];

  do {
    const randomNumber = getRandomArbitrary(1, 200);

    if (!imageIds.includes(randomNumber)) {
      imageIds.push(randomNumber);
      imageIds.push(randomNumber);
    }

  } while (imageIds.length <= (gridSize * gridSize));

  return shuffle(imageIds);
}

export const fetch = async (url: string, payload: number): Promise<Response> => {
    /* -----------------
     PLEASE DO NOT TOUCH
     IT"S THE PROTOTYPE
     BACKEND FOR THE DEMO PRODUCT
     ----------------- */
    if(url !== '/api/v2/imageIds'){
        throw new Error('RESOURCE DOES NOT EXIST');
    }

    return new Promise((resolve) => {

        const ok = Boolean(Math.round(Math.random()));
        const init = { "status": ok ? 200 : 500 };
        const body = ok ? generateCards(payload) : undefined;

        const myResponse = new Response(new Blob([JSON.stringify(body)], { type: 'application/json'}),init);
        resolve(myResponse)
    })
}
