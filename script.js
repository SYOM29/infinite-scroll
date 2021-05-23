import unsplashApiKey from './keys/keys.js';


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Setup unsplash
const fetchedImageCount = 10;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${fetchedImageCount}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        anchor.appendChild(img);
        imageContainer.appendChild(anchor);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

getPhotos();