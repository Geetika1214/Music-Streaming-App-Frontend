console.log("Welcome to spotify");
//Initialize the variables
let songIndex =0;
let audioelement = new Audio("songs/doraemon.mp3");
let masterplay = document.getElementById("masterplay");
let progressbar = document.getElementById("progress-bar");
let gif =  document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let mastersongname = document.getElementById("mastersongname");
const songs = [
   { songName : "Doraemon" , filePath : "songs/doraemon.mp3", coverPath:"covers/1.jpg" },
   { songName : "Kiteretsu" , filePath : "songs/kiteretsu.mp3", coverPath:"covers/2.jpg" },
   { songName : "Ninja-Hattori" , filePath : "songs/ninja_hattori.mp3", coverPath:"covers/3.jpg" },
   { songName : "Pokemon" , filePath : "songs/pokemon.mp3", coverPath:"covers/7.jpg" },
   { songName : "Shinchan" , filePath : "songs/shinchan.mp3", coverPath:"covers/6.jpg" },
]


songItem.forEach((element, i) => {
   console.log(element, i);
   const img = element.getElementsByTagName("img")[0];
   const songNameElement = element.getElementsByClassName("songname")[0];

   if (img) {
      img.src = songs[i].coverPath;
   } else {
      console.error(`Image not found in element ${i}`);
   }

   if (songNameElement) {
      songNameElement.innerText = songs[i].songName;
   } else {
      console.error(`Song name element not found in element ${i}`);
   }
});


// Handle play/pause click
masterplay.addEventListener("click", ()=>{
   console.log("button clicked");
   if(audioelement.paused || audioelement.currentTime<=0){
      audioelement.play();
      masterplay.classList.remove("fa-circle-play");
      masterplay.classList.add("fa-pause-circle");
      gif.style.opacity= 1;
   }
   else{
      audioelement.pause();
      masterplay.classList.remove("fa-pause-circle");
      masterplay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
   }
});

//Listen to Events
audioelement.addEventListener("timeupdate", ()=>{
   //Update seek bar
   let progress = (audioelement.currentTime/audioelement.duration) *100;
   progressbar.value = progress;
});

progressbar.addEventListener("change", ()=>{
   audioelement.currentTime = progressbar.value * audioelement.duration/100;
});

const makeallplay = ()=> {
   Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=> {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-circle-play");
   });
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=> {
  element.addEventListener("click",(e) => {
   makeallplay();
   gif.style.opacity = 1;
   songIndex = parseInt(e.target.id);
   e.target.classList.remove("fa-circle-play");
   e.target.classList.add("fa-pause-circle");
   audioelement.src = songs[songIndex].filePath;
   mastersongname.innerText = songs[songIndex].songName;
   audioelement.currentTime = 0;
   audioelement.play();
   masterplay.classList.remove("fa-circle-play");
   masterplay.classList.add("fa-pause-circle");
  });
});

document.getElementById("forward").addEventListener("click", () => {
   if (songIndex > 4) {
       songIndex = 0;
   } else {
       songIndex += 1;
   }
   audioelement.src = songs[songIndex].filePath;
   mastersongname.innerText = songs[songIndex].songName;
   audioelement.currentTime = 0;
   audioelement.play();
   masterplay.classList.remove("fa-circle-play");
   masterplay.classList.add("fa-pause-circle");
});


document.getElementById("backward").addEventListener("click", ()=> {
   if(songIndex < 0){
      songIndex =0;
   }
   else{
      songIndex += 1;
   }
   audioelement.src = songs[songIndex].filePath;
   mastersongname.innerText = songs[songIndex].songName;
   audioelement.currentTime = 0;
   audioelement.play();
   masterplay.classList.remove("fa-circle-play");
   masterplay.classList.add("fa-pause-circle");
});
