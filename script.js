import unsplashApiKey from './keys/keys.js';
console.log(unsplashApiKey);
// Setup unsplash
const fetchedImageCount = 10;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${fetchedImageCount}`;

// Get photos
async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl);
        const date = await response.json();
        console.log(data);
    } catch (error) {
        
    }
}

getPhotos();