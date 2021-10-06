const [voidPoint, solidPoint] = ["○", "●"];

let swiper = document.body.querySelector(".swiper");
let wrapper = swiper.querySelector(".wrapper");
let prevButton = swiper.querySelector(".switch.prev");
let nextButton = swiper.querySelector(".switch.next");
let pointsContainer = swiper.querySelector(".indicator");

// 设置自适应宽度
let width = document.body.clientWidth;
document.documentElement.style.setProperty("--width", `${width}px`);
window.addEventListener("resize", function() {
    width = document.body.clientWidth;
    document.documentElement.style.setProperty("--width", `${width}px`);
});

// 设置轮播逻辑
let duration = parseInt(wrapper.dataset.duration);
let interval = parseInt(wrapper.dataset.interval);
let imgIndex = 0;
let imgCount = wrapper.querySelectorAll("img").length;
wrapper.style.transition = `left ${duration / 1000}s`;
wrapper.style.left = "0px";
wrapper.addEventListener("mouseenter", function() {
    clearInterval(timer);
});
wrapper.addEventListener("mouseleave", function() {
    timer = getTimer();
});

// 设置前进后退按钮
let timer = getTimer();
prevButton.addEventListener("click", function() {
    clearInterval(timer);
    toPrevImage();
    timer = getTimer();
});
nextButton.addEventListener("click", function() {
    clearInterval(timer);
    toNextImage();
    timer = getTimer();
});

// 设置圆点
for (let i = 0; i < imgCount; i++) {
    let span = document.createElement("span");
    span.setAttribute("data-index", `${i}`);
    span.innerText = voidPoint;
    span.addEventListener("click", changeImage);
    pointsContainer.appendChild(span);
}
pointsContainer.firstElementChild.innerText = solidPoint;

// 函数定义
function changeImage(event) {
    let point = event.target;
    getNthPoint(imgIndex).innerText = voidPoint;
    imgIndex = parseInt(point.dataset.index);
    point.innerText = solidPoint;
    wrapper.style.left = `${-width * imgIndex}px`;
}

function getNthPoint(index) {
    return pointsContainer.querySelector(`span:nth-child(${index + 1})`);
}

function toNextImage() {
    let point = getNthPoint(imgIndex);
    point.innerText = voidPoint;
    imgIndex = (imgIndex + 1) % imgCount;
    point = getNthPoint(imgIndex);
    point.innerText = solidPoint;
    wrapper.style.left = `${-width * imgIndex}px`;
}

function toPrevImage() {
    let point = getNthPoint(imgIndex);
    point.innerText = voidPoint;
    imgIndex = (imgIndex + imgCount - 1) % imgCount;
    point = getNthPoint(imgIndex);
    point.innerText = solidPoint;
    wrapper.style.left = `${-width * imgIndex}px`;
}

function getTimer() {
    return setInterval(toNextImage, interval);
}