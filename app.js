// initializing variables
const fullScreen = document.querySelector(".full-screen");
const musicPlayer = document.querySelector(".music-player");
const seekbar = document.querySelector(".seekbar input");
const songContainer = document.querySelector(".song-container");
const audioElem = new Audio('./assets/songs/ve.mp3');
const playPauseBtn = document.getElementById("playPause");
const currentSongPlaying = 0;

audioElem.src = "./assets/songs/1.mp3";

// array of songs
const songs = [
  {
    poster: "https://i.scdn.co/image/ab67616d00004851510fdfa6b5642fbe2623a644",
    title: "Jeene Laga Hoon (Lofi Mix)",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "4:21",
    date: "April 12, 2024",
    album: "Jeene Laga Hoon (Lofi Mix)",
    songPath: "./assets/songs/1.mp3"
  },
  {
    poster: "https://i.scdn.co/image/ab67616d000048517fd9f2b5f151b7f3ba201626",
    title: "Ve Kamleya",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Ve Kamlyeya - Lofi",
    songPath: "./assets/songs/2.mp3"
  },
  {
    poster: "https://i.scdn.co/image/ab67616d0000b273c1fdc57e31e3ef7caf37c87b",
    title: "Arambh Hai Prachand",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Arambh Hai Prachand",
    songPath: "./assets/songs/3.mp3"
  },
  {
    poster: "https://i.scdn.co/image/ab67616d0000b273336a3ce27714f4f4999da39d",
    title: "Tere hawaale",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Ek Din",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d00004851a2055e0b847ff66fb5206099",
    title: "Kal Ho Na Ho",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Kal Ho Na Ho - Lofi Version",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d00004851c7d3529654eeb1d151f49d1f",
    title: "Ek Din",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Ek Din",
    songPath: "./assets/songs/6.mp3"
  },
];

// loading songs
let clutter = "";
songs.forEach((song) => {
  clutter += `
    <div class="song">
    <div class="title-container">
      <img class="poster"
        src="${song.poster}"
      />
      <div class="song-name">
        <div class="title">${song.title}</div>
        <div class="artists">
          ${song.artists}
        </div>
      </div>
    </div>
    <div class="album-name">${song.album}</div>
    <div class="date-added">${song.date}</div>
    <div class="duration">${song.duration}</div>
  </div>
  `;
  songContainer.innerHTML = clutter;
});

const Allsongs = document.querySelectorAll('.song');
Allsongs.forEach((song, i) =>{
  song.addEventListener('click', (e)=>{
    audioElem.currentTime = 0;
    console.log(audioElem.currentTime)
    audioElem.src = songs[i].songPath;
    playPause();
  })
})

function playPause(){
  if(audioElem.paused){
    audioElem.play();
    playPauseBtn.src = "./assets/icons/pause.svg";
  }else{
    audioElem.pause();
    playPauseBtn.src = "./assets/icons/play.svg";
  }
}

function updateSeekbar(){
  seekbar.value = Math.floor(audioElem.currentTime/audioElem.duration*100);
  console.log(seekbar.value);
}

updateSeekbar();  

playPauseBtn.addEventListener('click', playPause)