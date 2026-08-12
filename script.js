const songs = [
    {
        title:"Escape Your Love",
        artist:"FaSSounds",
        src:"songs/song1.mp3",
        image:"Album Images/song1 Fassounds.jpg"
    },

    {
        title:"Carnaval",
        artist:"Alec-Koff",
        src:"songs/song2.mp3",
        image:"Album Images/song2 alec-koff.jpg"
    },

    {
        title:"No-copyright",
        artist:"sigmamusicart",
        src:"songs/song3.mp3",
        image:"Album Images/song3 sigmamusicart.png"
    },

    {
        title:"Funk & Breakbeast",
        artist:"Alexguz",
        src:"songs/song4.mp3",
        image:"Album Images/song4 Alexguz.png"
    },

    {
        title:"Dance Playful Night",
        artist:"Alexzavesa",
        src:"songs/song5.mp3",
        image:"Album Images/song5 Alexzavesa.jpg"
    },

    {
        title:"Background",
        artist:"ikoliks",
        src:"songs/song6.mp3",
        image:"Album Images/song6 ikoliks.jpg"
    },

    {
        title:"Water",
        artist:"Kontraa",
        src:"songs/song7.mp3",
        image:"Album Images/song7 Kontraa.jpg"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const image = document.getElementById("image1");

// load song function 

function loadSong(){
    const song = songs[currentSong];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    image.src = song.image;

    audio.src = song.src;

    updateActiveSong();
}

// audio.play();
// setPlayIcon(true);
// loadSong();

const playButton = document.getElementById("play");

// play pause button working
const playIcon = playButton.querySelector("img");

// creating a set play button function
function setPlayIcon(isPlaying){
    if(isPlaying)
    {
        playIcon.src = "Album Images/pause.jpg";
    }
    else{
        playIcon.src = "Album Images/play-icon.png";
    }
}

// adding a click event
playButton.addEventListener("click", ()=>
{
    if(audio.paused){
        audio.play();
        setPlayIcon(true);
    }
    else{
        audio.pause();
       setPlayIcon(false);
    }
});

// next and previous button 
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

// applying event listener to next button
nextButton.addEventListener("click", ()=>{
    currentSong++;

    if(currentSong>=songs.length)
    {
        currentSong = 0;
    }
    loadSong();
    audio.play();
    setPlayIcon(true);
});

// applying event listener to previous button
previousButton.addEventListener("click", ()=>{
    currentSong--;

    if(currentSong<0)
    {
        currentSong = songs.length - 1;
    }
    loadSong();
    audio.play();
    setPlayIcon(true);
});

// adding properties on progress bar
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// creating a time formatting function so that the time will also display in minutes
function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : " "}${seconds}`;
}

// loadedmetadat means the browser has loaded information about the audio, including its duration
audio.addEventListener("loadedmetadata", ()=>{

    duration.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// adding eventlistener for time update
audio.addEventListener("timeupdate", ()=>{

    currentTime.textContent = formatTime(audio.currentTime);
    progressBar.value = audio.currentTime;

    const percentage = (audio.currentTime/ audio.duration)*100;

    progressBar.style.background =
     `linear-gradient(to right, #d34cff ${percentage}%, #292b3b ${percentage}%)`;
});

const progressBar = document.getElementById("progress-bar");

progressBar.addEventListener("input", ()=>{

    audio.currentTime = progressBar.value;
});

// volume button
const volume = document.getElementById("volume");

volume.addEventListener("input", ()=>{

    audio.volume = volume.value;
});

const volumeButton = document.getElementById("volume-button");

volumeButton.addEventListener("click",()=>{

    if(volume.style.display === "none")
    {
        volume.style.display = "block";
    }
    else{
        volume.style.display = "none";
    }
});

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong >= songs.length)
    {
        currentSong = 0;
    }

    loadSong();
    audio.play();
    setPlayIcon(true);
});

// playlist
const playlist = document.getElementById("playlist");

let playlistItems =[];

// creating the playlist item

songs.forEach((song, index) =>{

    const songItem = document.createElement("div");

   

    songItem.classList.add("playlist-item");

    songItem.textContent = song.title;

     songItem.addEventListener("click",()=>{
         currentSong = index;
         loadSong();
         audio.play();
         setPlayIcon(true);
    });

    playlist.appendChild(songItem);
    playlistItems.push(songItem);
});

// creating a fuction or highlighting the current song is playing
function updateActiveSong()
{
    playlistItems.forEach((item) => {

        item.classList.remove("active");
    });

    playlistItems[currentSong].classList.add("active");
}
loadSong();
