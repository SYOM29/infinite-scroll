import unsplashApiKey from './keys/keys.js';


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Setup unsplash
const fetchedImageCount = 30;
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${fetchedImageCount}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

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

        img.addEventListener('load', imageLoaded);
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

window.addEventListener('scroll', () => {
    if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        ready = false;
        getPhotos();
    }
});

getPhotos();