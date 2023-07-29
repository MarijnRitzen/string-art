import { Disk } from "wasm-string-art";

// Import the WebAssembly memory at the top of the file.
import { memory } from "wasm-string-art/string_art_bg";

const disk = Disk.new();

const canvas = document.getElementById("string-art-canvas");

const ctx = canvas.getContext("2d");

const MARGIN = 16;
const PADDING = 16;

var centerX = disk.get_radius() + MARGIN + PADDING;
var centerY = disk.get_radius() + MARGIN + PADDING;
var radius = disk.get_radius();

const drawStrings = () => {
  const nailsArray = new Int32Array(
    memory.buffer,
    disk.nails(),
    disk.nails_size()
  );

  const strings = new Uint16Array(
    memory.buffer,
    disk.strings(),
    disk.strings_size()
  );

  let pixel_size = disk.get_pixel_size();
  ctx.globalAlpha = 0.5;

  for (let i = 0; i < disk.strings_size(); i = i + 2) {
    let start_index = strings[i];
    let end_index = strings[i + 1];

    let start_x = nailsArray[2 * start_index];
    let start_y = nailsArray[2 * start_index + 1];

    let end_x = nailsArray[2 * end_index];
    let end_y = nailsArray[2 * end_index + 1];

    // Draw point on the disk
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(start_x * pixel_size + MARGIN, start_y * pixel_size + MARGIN); // Move the pen to the starting point
    ctx.lineTo(end_x * pixel_size + MARGIN, end_y * pixel_size + MARGIN); // Draw a line to the ending point
    ctx.stroke(); // Render the line
  }
};

// Drawing
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
