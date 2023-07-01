let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playingNow = document.getElementById('playingSong');
let timeStamp = document.getElementsByClassName('timeStamp');

let songs = [
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else{
        audioElement.pause()
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate',() => {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');

    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex}.mp3`;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        playingNow.textContent = songs[songIndex-1].songName;
        audioElement.play();
    })
})

document.getElementById('next').addEventListener('click', (e) =>{
    if(songIndex>4){
        songIndex=0;
    }else{
        songIndex +=1;
    }
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        playingNow.textContent = songs[songIndex-1].songName;
})
document.getElementById('previous').addEventListener('click', (e) =>{
    
    if(songIndex>0){
        songIndex-=1;
    }else{
        songIndex=5;
    }
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        playingNow.textContent = songs[songIndex-1].songName;
})

