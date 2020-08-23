
class App {

    constructor() {

        const messageContainer = document.getElementById('message-container');

        // #if PRODUCTION
        messageContainer.innerHTML = 'Successfully running the production build';
        // #else
        messageContainer.innerHTML = 'Successfully running the development build';
        // #endif

    }
}

export const app = new App();


