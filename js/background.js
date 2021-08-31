const images = [
  "0.jpeg",
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
// // adding img element to body
// const bgImage = document.createElement("img");
// bgImage.src = `img/${chosenImage}`;
// document.body.appendChild(bgImage);

document.body.style.backgroundImage = `url(img/${chosenImage})`;
document.body.style.backgroundSize = "cover";
