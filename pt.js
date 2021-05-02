let p = document.getElementById("mycanvas");
let r = p.getContext("2d");
var myimg = document.createElement("img");
myimg.onload = () => {
  r.drawImage(myimg, 0, 0, 1500, 650);
};
myimg.src = "/martial/background.jpg";

//to load multiple images//
let loadimage = (src, callback) => {
  let image = document.createElement("img");
  image.onload = () => callback(image);
  image.src = src;
};
//to set general path//
let imgpath = (picno, action) => {
  return "/martial/" + action + "/" + picno + ".png";
};
let object = {
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};
let loadImage = (callback) => {
  let images = {
    backward: [],
    block: [],
    forward: [],
    idle: [],
    kick: [],
    punch: [],
  };
  let count = 0;
  ["backward", "block", "forward", "idle", "kick", "punch"].forEach(
    (action) => {
      let actionpic = object[action];
      count = count + actionpic.length;
      actionpic.forEach((picno) => {
        let path = imgpath(picno, action);

        loadimage(path, (image) => {
          images[action][picno - 1] = image;
          count = count - 1;
          if (count === 0) {
            callback(images);
          }
        });
      });
    }
  );
};
let animate = (r, images, action, callback) => {
  images[action].forEach((image, index) => {
    setTimeout(() => {
      r.clearRect(0, 0, 500, 500);
      r.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[action].length * 100);
};
loadImage((images) => {
  let queuedanimation = [];

  let aux = () => {
    let selectedanimation;
    if (queuedanimation.length === 0) {
      selectedanimation = "idle";
    } else {
      selectedanimation = queuedanimation.shift();
    }
    animate(r, images, selectedanimation, aux);
  };
  aux();
  document.addEventListener("keyup", (event) => {
    let key = event.key;
    if (key === "ArrowLeft") {
      queuedanimation.push("backward");
    } else if (key === "ArrowRight") {
      queuedanimation.push("punch");
    } else if (key === "ArrowUp") {
      queuedanimation.push("kick");
    } else if (key === "ArrowDown") {
      queuedanimation.push("block");
    }
  });
});
