 const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function() {
    document.body.classList.toggle("dark");
};
const images = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
];

let currentImage = 0;

const slideImage = document.getElementById("slideImage");

setInterval(function() {
    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    slideImage.src = images[currentImage];
}, 3000);