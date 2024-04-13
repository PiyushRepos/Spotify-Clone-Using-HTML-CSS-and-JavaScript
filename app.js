// initializing variables
const fullScreen = document.querySelector(".full-screen");
const openFullscreen = document.querySelector(".open-fullscreen");
// const closeFullscreen = document.querySelector(".close-fullscreen");
const musicPlayer = document.querySelector(".music-player");
const seekbar = document.querySelector("#seekbar");
const songContainer = document.querySelector(".song-container");
const audioElem = new Audio("./assets/songs/ve.mp3");
const playPauseBtn = document.getElementById("playPause");
const poster = document.querySelector(".left .poster");
const title = document.querySelector(".left .title");
const artists = document.querySelector(".left .artists");
const volumebar = document.querySelector(".volumebar");
const volumeUp = document.querySelector(".volumeUp");
const currentTime = document.querySelector("#currentTime");
const totalDuration = document.querySelector("#totalDuration");
const playNextBtn = document.querySelector(".playNextBtn");
const PlayPreviousBtn = document.querySelector(".PlayPreviousBtn");

let currentSongPlaying = 0;
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
    songPath: "./assets/songs/1.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d000048517fd9f2b5f151b7f3ba201626",
    title: "Ve Kamleya",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Ve Kamlyeya - Lofi",
    songPath: "./assets/songs/2.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d0000b273c1fdc57e31e3ef7caf37c87b",
    title: "Arambh Hai Prachand",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Arambh Hai Prachand",
    songPath: "./assets/songs/3.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d0000b273336a3ce27714f4f4999da39d",
    title: "Tere Hawaale",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Tere Hawaale",
    songPath: "./assets/songs/4.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d00004851a2055e0b847ff66fb5206099",
    title: "Kal Ho Na Ho",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Kal Ho Na Ho - Lofi Version",
    songPath: "./assets/songs/5.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d00004851c7d3529654eeb1d151f49d1f",
    title: "Ek Din",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Ek Din",
    songPath: "./assets/songs/6.mp3",
  },
  {
    poster: "https://i.scdn.co/image/ab67616d00001e02a06c61599f3231a01c192f71",
    title: "Nani Teri Morni Ko Mor Le Gaye",
    artists: "Atif Aslam, Shreya Ghoshal, Sachin-Jigar",
    duration: "2:28",
    date: "April 12, 2024",
    album: "Nani Teri Morni Ko Mor Le Gaye",
    songPath: "./assets/songs/7.mp3",
  },
];

// loading songs
let clutter = "";
songs.forEach((song, i) => {
  clutter += `
    <div class="song" data-id="${i}">
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

const Allsongs = document.querySelectorAll(".song");
Allsongs.forEach((song, i) => {
  song.addEventListener("click", (e) => {
    currentSongPlaying = `${song.dataset.id}`;
    audioElem.currentTime = 0;
    audioElem.src = songs[i].songPath;
    poster.src = songs[i].poster;
    title.innerText = songs[i].title;
    artists.innerText = songs[i].artists;
    playPause();
  });
});

// play and pause function
function playPause() {
  if (audioElem.paused) {
    audioElem.play();
    playPauseBtn.src = "./assets/icons/pause.svg";
  } else {
    audioElem.pause();
    playPauseBtn.src = "./assets/icons/play.svg";
  }
}
playPauseBtn.addEventListener("click", playPause);

// updating Seekbar Spans
let updateCurrentTime = 0;
let updateTotalDuration = 0;
function updateSeekbarSpansTime() {
  updateCurrentTime = setInterval(function () {
    let mins = Math.floor(audioElem.currentTime / 60);
    let secs = Math.floor(audioElem.currentTime % 60);
    if (secs < 10) {
      secs = "0" + String(secs);
    }
    currentTime.innerHTML = mins + ":" + secs;
  }, 10);

  updateTotalDuration = setInterval(function () {
    let mins = Math.floor(audioElem.duration / 60);
    let secs = Math.floor(audioElem.duration % 60);
    totalDuration.innerText = mins + ":" + secs;
  }, 10);
}

// updating seekbar
audioElem.addEventListener("timeupdate", () => {
  seekbar.value = Math.floor(
    (audioElem.currentTime / audioElem.duration) * 100
  );
  seekbar.setAttribute(
    "style",
    `background-image: linear-gradient(to right, #fff ${seekbar.value}%, #4D4D4D ${seekbar.value}%);`
  );
  updateSeekbarSpansTime();
  if (audioElem.ended) {
    seekbar.value = 0;
    playPauseBtn.src = "./assets/icons/play.svg";
    seekbar.setAttribute(
      "style",
      `background-image: linear-gradient(to right, #fff 100%, #4D4D4D 0%);`
    );
    clearInterval(updateCurrentTime);
    clearInterval(updateTotalDuration);
  }
});

// updating seekbar on user changes
seekbar.addEventListener("change", (changedTime) => {
  changedTime = Math.floor((seekbar.value * audioElem.duration) / 100);
  audioElem.currentTime = changedTime;
});

// updating volumebar
volumebar.addEventListener("change", () => {
  volumebar.setAttribute(
    "style",
    `background-image: linear-gradient(to right, #fff ${volumebar.value}%, #4D4D4D ${volumebar.value}%);`
  );
  volumeUp.src = "./assets/icons/volume_on.svg";
  audioElem.volume = volumebar.value / 100;
});

// mute or unmute functionality
let volumeValue = 0;
function muteUnmute() {
  volumeUp.addEventListener("click", () => {
    if (!volumeUp.classList.contains("muted")) {
      volumeValue = volumebar.value;
      audioElem.volume = 0;
      volumeUp.src = "./assets/icons/volume_off.svg";
      volumeUp.classList.add("muted");
      volumebar.value = 0;
      volumebar.setAttribute(
        "style",
        `background-image: linear-gradient(to right, #fff 1%, #4D4D4D ${volumebar.value}%);`
      );
    } else {
      volumeUp.classList.remove("muted");
      volumeUp.src = "./assets/icons/volume_on.svg";
      audioElem.volume = volumeValue / 100;
      volumebar.value = volumeValue;
      volumebar.setAttribute(
        "style",
        `background-image: linear-gradient(to right, #fff ${volumebar.value}%, #4D4D4D ${volumebar.value}%);`
      );
    }
  });
}
muteUnmute();

function playNext() {
  if (currentSongPlaying == songs.length - 1) {
    currentSongPlaying = 0;
    audioElem.src = songs[currentSongPlaying].songPath;
    audioElem.play();
  } else {
    currentSongPlaying++;
    audioElem.src = songs[currentSongPlaying].songPath;
    audioElem.play();
  }
}
playNextBtn.addEventListener("click", playNext);

function playPrevious() {
  if (currentSongPlaying == 0) {
    PlayPreviousBtn.style.pointerEvents = "none";
    setTimeout(() => {
      PlayPreviousBtn.style.pointerEvents = "all";
    }, 2000);
  } else {
    --currentSongPlaying;
    console.log(currentSongPlaying);
    audioElem.src = songs[currentSongPlaying].songPath;
    audioElem.play();
  }
}
PlayPreviousBtn.addEventListener("click", playPrevious);

openFullscreen.addEventListener("click", () => {
  fullScreen.style.display = "block";
  fullScreen.requestFullscreen();
});

fullScreen.addEventListener("click", () => {
  fullScreen.style.display = "none";
  document.exitFullscreen();
});
