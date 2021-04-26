class Game {
  constructor() {
    const container = document.getElementById("game-container");

    // #if PRODUCTION
    container.innerHTML = "Successfully running the production build";
    // #else
    container.innerHTML = "Successfully running the development build";
    // #endif
  }
}

export const game = new Game();
