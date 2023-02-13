export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
        action: request[3],
    }
}

export const rerender = async (component) => {
    document.getElementById('main-container').innerHTML = await component.render();
    await component.after_render();
}

export const showMessage = (message) => {
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-button">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-button').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
    });
}