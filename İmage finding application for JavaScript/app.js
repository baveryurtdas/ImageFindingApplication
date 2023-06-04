const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const cleanButton = document.querySelector("#cleanButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

runEventListener();

function runEventListener(){
    form.addEventListener("submit",search);
    cleanButton.addEventListener("click",clean);
}

function clean(){
    searchInput.value ="";
    imageListWrapper.innerHTML="";
}

function search(e){
    
    const value = searchInput.value.trim();
    //* @RequestParam - Spring - Rest API
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID ZBF30ZEqmm3-GKKUWMwd2DSW7DS2J1G944onW9jlFEE"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
       Array.from(data.results).forEach((image)=>{
        // console.log(image.urls.small);
        addImageToUI(image.urls.small)
       })
    })
    .catch((err)=>console.log(err));
    
    
    e.preventDefault();


}


function addImageToUI(url){
    const div = document.createElement("div");
    div.className ="card";
    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height='400';
    img.width='400';

    div.append(img);
    imageListWrapper.append(div);
}