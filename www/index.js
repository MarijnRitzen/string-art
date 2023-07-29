import { Disk } from "wasm-string-art";

// Import the WebAssembly memory at the top of the file.
import { memory } from "wasm-string-art/string_art_bg";

const disk = Disk.new();

let drawing = false;

canvas.addEventListener("mousedown", (event) => {
  if (!drawMode) return;

  drawing = true; // start drawing when the mouse is pressed
  draw(event); // draw immediately when the mouse is pressed
});

canvas.addEventListener("mousemove", (event) => {
  if (!drawMode) return;

  if (!drawing) return; // stop here if we're not drawing
  draw(event); // draw when mouse is moved
});

canvas.addEventListener("mouseup", () => {
  if (!drawMode) return;

  drawing = false; // stop drawing when the mouse is released
});

canvas.addEventListener("touchstart", (event) => {
  if (!drawMode) return;

  drawing = true; // start drawing when the touch is started
  draw(event.touches[0]); // draw immediately when the touch is started
});

canvas.addEventListener("touchmove", (event) => {
  if (!drawMode) return;

  if (!drawing) return; // stop here if we're not drawing
  draw(event.touches[0]); // draw when touch is moved
});

canvas.addEventListener("touchend", () => {
  if (!drawMode) return;

  drawing = false; // stop drawing when the touch ends
});

const drawModeButton = document.getElementById("draw-mode-button");

let drawMode = true;

const activateDrawMode = () => {
  clear();
  drawStrings();
  drawModeButton.textContent = "stringify";
  drawMode = true;
};

const clear = () => {
  disk.reset();
  disk.clear();
};

const activateStringMode = () => {
  disk.calculate_strings();
  drawModeButton.textContent = "reset";
  drawMode = false;
};

drawModeButton.addEventListener("click", (event) => {
  if (drawMode) {
    activateStringMode();
  } else {
    activateDrawMode();
  }
});

activateDrawMode();

function draw(event) {
  const boundingRect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  // Check if the point is within the circle
  const dx = centerX - canvasLeft;
  const dy = centerY - canvasTop;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < radius) {
    // Only draw if within the circle
    disk.draw(canvasLeft, canvasTop);
  }
}

// Initialize the canvas with the disk
const renderLoop = () => {
  disk.clear();
  disk.draw_nails();
  disk.draw_canvas();
  disk.draw_strings();

  requestAnimationFrame(renderLoop);
};

disk.draw_nails();
disk.draw_canvas();
disk.draw_strings();
renderLoop();

const pixelSizeSlider = document.getElementById("pixel-size");

pixelSizeSlider.addEventListener("input", (event) => {
  clear();
  disk.set_pixel_size(event.target.value);
});
