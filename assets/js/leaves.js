const canvas = document.getElementById("leaves-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load leaf image
const leafImage = new Image();
leafImage.src = "./assets/images/leaf1.png";

const leaves = Array(40).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 20 + 10,
  speed: Math.random() * 1 + 0.5,
  drift: Math.random() * 2 - 1,
  rotation: Math.random() * 360,
  rotationSpeed: Math.random() * 2 - 1
}));

function drawLeaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  leaves.forEach(leaf => {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    ctx.drawImage(leafImage, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
    ctx.restore();

    leaf.y += leaf.speed;
    leaf.x += leaf.drift;
    leaf.rotation += leaf.rotationSpeed;

    if (leaf.y > canvas.height) {
      leaf.y = -20;
      leaf.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawLeaves);
}

// Start animation after image loads
leafImage.onload = () => drawLeaves();
