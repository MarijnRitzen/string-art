import { Disk } from "wasm-string-art";

const disk = Disk.new();

function getNewImage() {
  fetch("https://faceapi.herokuapp.com/faces?n=1")
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data[0].image_url;
      const img = new Image();

      // Request cross-origin access
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext("2d");

        // Calculate scale and offset to maintain aspect ratio
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        // Draw the image onto the canvas
        context.drawImage(img, x, y, img.width * scale, img.height * scale);

        let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          let grayscale =
            0.3 * pixels[i] + 0.59 * pixels[i + 1] + 0.11 * pixels[i + 2];

          pixels[i] = grayscale; // red
          pixels[i + 1] = grayscale; // green
          pixels[i + 2] = grayscale; // blue
        }

        context.putImageData(imgData, 0, 0);

        let pixelValues = [];
        for (let i = 0; i < pixels.length; i += 4) {
          pixelValues.push(pixels[i]); // just use one channel as they are all the same
        }

        let pixelArray = new Uint8Array(pixelValues);

        disk.process_pixels(pixelArray);
        disk.draw_nails();
        disk.draw_canvas();
        disk.draw_strings();
      };

      img.src = imageUrl;
    });
}
const newImageButton = document.getElementById("new-image");

newImageButton.addEventListener("click", (event) => {
  getNewImage();
});
const imageModeButton = document.getElementById("image-mode-button");
let imageMode = true;

const activateImageMode = () => {
  clear();
  getNewImage();
  imageModeButton.textContent = "stringify";
  imageMode = true;
};

const clear = () => {
  disk.reset();
  disk.clear();
};

const activateStringMode = () => {
  disk.initialize_drawing_strings();
  imageModeButton.textContent = "reset";
  imageMode = false;
  renderLoop();
};
imageModeButton.addEventListener("click", (event) => {
  if (imageMode) {
    activateStringMode();
  } else {
    activateImageMode();
  }
});

// Initialize the canvas with the disk
const renderLoop = () => {
  disk.clear();
  disk.draw_nails();
  disk.draw_canvas();
  disk.draw_strings();

  requestAnimationFrame(renderLoop);
};

getNewImage();
