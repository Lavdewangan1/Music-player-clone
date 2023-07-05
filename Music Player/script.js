let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playingNow = document.getElementById('playingSong');
let timeStamp = document.getElementsByClassName('timeStamp');
let searchButton = document.getElementById('searchButton');
let searchQuery = document.getElementById('searchBar');





// Function for converting video to audio

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Variable to hold the YouTube player instance
let player;

// Function to create and initialize the YouTube player
function createYouTubePlayer(videoId) {
    player = new YT.Player('player', {
        height: '200',
        width: '300',
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: videoId
        }
    });
}





// Function for searching YouTube
function youtubeSearch(searchQuery) {
    const apiKey = 'AIzaSyDxVQRHEcqV421ax_qbFwLENsgheEf9dhg';
    const maxResults = 30;

    // Make the search request
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Handle the API response
            const videos = data.items;
            const songResults = document.getElementById('searchResults');
            videos.forEach(video => {
                const videoTitle = video.snippet.title;
                const videoDescription = video.snippet.description;
                const videoThumbnail = video.snippet.thumbnails.default.url;
                const videoId = video.id.videoId;
                const videoLink = `https://www.youtube.com/watch?v=${videoId}`;


                // Display the video information as desired
                const searchItem = document.createElement('div');
                searchItem.classList.add('searchItem');

                // Append the searchItem div to the songResults element
                songResults.appendChild(searchItem);
                const image = document.createElement('img');
                const name = document.createElement('span');
                const nameText = document.createElement('p');
                name.classList.add('name');
                image.classList.add('thumbnail');
                searchItem.appendChild(image);
                searchItem.appendChild(name);
                name.appendChild(nameText);

                // Clicking the result
                name.addEventListener('click', (event) => {
                    // window.open(videoLink, '_blank');
                    createYouTubePlayer(videoId);
                });

                image.src = videoThumbnail;
                nameText.textContent = videoTitle;

            });
        })
        .catch(error => {
            // Handle any errors
            console.error('Error searching YouTube:', error);
        });
}

searchButton.addEventListener('click', () => {
    let previousResults = document.getElementById('searchResults');
    while (previousResults.firstChild) {
        previousResults.removeChild(previousResults.firstChild);
    }
    youtubeSearch(searchQuery.value);
});




// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause()
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');

    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex}.mp3`;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        audioElement.currentTime = 0;
        playingNow.textContent = songs[songIndex - 1].songName;
        audioElement.play();
    })
})

document.getElementById('next').addEventListener('click', (e) => {
    if (songIndex > 4) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    e.target.classList.remove('fa-play-circle')
    e.target.classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    playingNow.textContent = songs[songIndex - 1].songName;
})
document.getElementById('previous').addEventListener('click', (e) => {

    if (songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = 5;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    e.target.classList.remove('fa-play-circle')
    e.target.classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    playingNow.textContent = songs[songIndex - 1].songName;
})

