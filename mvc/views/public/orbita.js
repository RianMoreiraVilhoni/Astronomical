function createStars() {
    const container = document.querySelector("#orbita");
    const offset = 50; 

    for (let i = 0; i < 1000; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = ".1px";
        star.style.height = ".1px";
        star.style.top = `calc(${Math.random() * 90}% + ${offset}px)`; 
        star.style.left = Math.random() * 100 + "%";
        container.appendChild(star);
    }
}
createStars();
