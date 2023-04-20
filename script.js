let chooseFile = document.getElementById("chooseFile");
let display = document.getElementById("display");
let overlay = document.getElementById("overlay");
let image = document.querySelector("img");
let contain = document.getElementById("container");
let image_src;
let downloadLink = document.getElementById("img-btn");
let images_fill = document.getElementById("fill");
let filterArray = ["none", "blur(5px)", "brightness(200p%)", "contrast(200%)", "greyscale(100%)", "sepia(100%)", "saturate(8)"];
let downloadBtn = document.getElementsByClassName("download");
chooseFile.addEventListener("change", file)
function file() {
    
    overlay.remove()
     image_src = URL.createObjectURL(chooseFile.files[0]);
    if(image_src) {
    image.style.visibility = "visible";
    image.src = image_src;
    
   
    }
    displayImg();
    
    
    }
function displayImg() {
    
    let output = "";
    //let image_src = URL.createObjectURL(chooseFile.files[0]);
    if(image_src) {
    
    filterArray.forEach((arr) => {
    output += `<div class="img-btn">
    <img src="${image_src}" class="design"
     style="filter:${arr}">
     <button class="download">DOWNLOAD</button>
     </div>`
    
    })
    
    images_fill.innerHTML = output;

    }
    let downloadArr = Array.from(downloadBtn);
        downloadArr.forEach((arr) => {
            arr.removeEventListener("click", downloadLinks);
            arr.addEventListener("click", downloadLinks);
        });
    
}
  
function downloadLinks() {
    let listing = Array.from(images_fill.children);
    listing.forEach((list) => {
        let downloadButton = list.querySelector(".download");
        let image = list.querySelector(".design");
        let downloadClicked = false; // flag variable
        
        downloadButton.addEventListener("click", () => {
            if (!downloadClicked) {
                downloadClicked = true; // set flag variable to true
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                context.filter = window.getComputedStyle(image).getPropertyValue('filter');
                context.drawImage(image, 0, 0);
                let dataUrl = canvas.toDataURL("image/png");
                let downloadLink = document.createElement("a");
                downloadLink.href = dataUrl;
                downloadLink.download = "image.png";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
            }
        });
    });
}






