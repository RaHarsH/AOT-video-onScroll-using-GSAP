const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const frames = {
    currentIndex: 114,
    maxIndex: 502
};

let imagesLoaded = 0;
let images = [];

const preloadImages = () => {
    for(let i = frames.currentIndex; i <= frames.maxIndex; i++) {
        const imageUrl = `./AOT_frames/frame_${i.toString().padStart(4, '0')}.jpg`;
        const img = new Image();

        img.src = imageUrl;

        img.onload = () => {
            imagesLoaded++;
            if(imagesLoaded === frames.maxIndex - 114) {
                loadImage(frames.currentIndex);
                startAnimation();
                // console.log('Last image is ', imagesLoaded)
            }
        }
        images.push(img);
    }
}

const loadImage = (index) => {
    if(index >= 114 && index <= frames.currentIndex) {
        const img = images[index - 114]; // to get the first element of the images array , the first frame is 114

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        // to center the img inside the canvas
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.curretnIndex = index;
    }
}

gsap.registerPlugin(ScrollTrigger);

const startAnimation = () => {
    const t1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
            markers: false,
        }
    });

    t1.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: () => {
            loadImage(Math.floor(frames.currentIndex));
        }
    })
}

preloadImages();