import { Disk } from "wasm-string-art";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();

img.crossOrigin = "Anonymous"; // This enables CORS
img.onload = function () {
  // Create an offscreen canvas to draw the grayscale image
  let offscreenCanvas = document.createElement("canvas");
  let offscreenCtx = offscreenCanvas.getContext("2d");

  offscreenCanvas.width = img.width;
  offscreenCanvas.height = img.height;

  offscreenCtx.drawImage(img, 0, 0, img.width, img.height);

  // Get the image data from the offscreen canvas
  let imgData = offscreenCtx.getImageData(0, 0, img.width, img.height);
  let data = imgData.data;

  // Convert the image to grayscale
  for (let i = 0; i < data.length; i += 4) {
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }

  offscreenCtx.putImageData(imgData, 0, 0);

  // Draw the grayscale image onto the visible canvas
  ctx.drawImage(offscreenCanvas, 0, 0, 512, 512);
};

fetch(
  "https://api.unsplash.com/photos/random?client_id=sJKNo5t2g_h5Q9mlvVGT9VM-jpsvbeiUEdGQVqA0_I8"
)
  .then((response) => response.json())
  .then((data) => {
    img.src = data.urls.raw;
  });

// const disk = Disk.new();

// let drawing = false;

// let canvas = document.getElementById("string-art-canvas");

// var centerX = disk.get_center();
// var centerY = disk.get_center();

// var radius = disk.get_radius();

// canvas.addEventListener("mousedown", (event) => {
//   if (!drawMode) return;

//   drawing = true; // start drawing when the mouse is pressed
//   draw(event); // draw immediately when the mouse is pressed
// });

// canvas.addEventListener("mousemove", (event) => {
//   if (!drawMode) return;

//   if (!drawing) return; // stop here if we're not drawing
//   draw(event); // draw when mouse is moved
// });

// canvas.addEventListener("mouseup", () => {
//   if (!drawMode) return;

//   drawing = false; // stop drawing when the mouse is released
// });

// canvas.addEventListener("touchstart", (event) => {
//   if (!drawMode) return;

//   drawing = true; // start drawing when the touch is started
//   draw(event.touches[0]); // draw immediately when the touch is started
// });

// canvas.addEventListener("touchmove", (event) => {
//   if (!drawMode) return;

//   if (!drawing) return; // stop here if we're not drawing
//   draw(event.touches[0]); // draw when touch is moved
// });

// canvas.addEventListener("touchend", () => {
//   if (!drawMode) return;

//   drawing = false; // stop drawing when the touch ends
// });

// const drawModeButton = document.getElementById("draw-mode-button");

// let drawMode = true;

// const activateDrawMode = () => {
//   clear();
//   drawModeButton.textContent = "stringify";
//   drawMode = true;
// };

// const clear = () => {
//   disk.reset();
//   disk.clear();
// };

// const activateStringMode = () => {
//   disk.initialize_drawing_strings();
//   drawModeButton.textContent = "reset";
//   drawMode = false;
// };

// drawModeButton.addEventListener("click", (event) => {
//   if (drawMode) {
//     activateStringMode();
//   } else {
//     activateDrawMode();
//   }
// });

// activateDrawMode();

// function draw(event) {
//   const boundingRect = canvas.getBoundingClientRect();
//   const scaleX = canvas.width / boundingRect.width;
//   const scaleY = canvas.height / boundingRect.height;

//   const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
//   const canvasTop = (event.clientY - boundingRect.top) * scaleY;

//   // Check if the point is within the circle
//   const dx = centerX - canvasLeft;
//   const dy = centerY - canvasTop;
//   const distance = Math.sqrt(dx * dx + dy * dy);

//   if (distance < radius) {
//     // Only draw if within the circle
//     disk.draw(canvasLeft, canvasTop);
//   }
// }

// // Initialize the canvas with the disk
// const renderLoop = () => {
//   disk.clear();
//   disk.draw_nails();
//   disk.draw_canvas();
//   disk.draw_strings();

//   requestAnimationFrame(renderLoop);
// };

// disk.draw_nails();
// disk.draw_canvas();
// disk.draw_strings();
// renderLoop();

// const pixelSizeSlider = document.getElementById("pixel-size");

// pixelSizeSlider.addEventListener("input", (event) => {
//   clear();
//   disk.set_pixel_size(event.target.value);
// });
