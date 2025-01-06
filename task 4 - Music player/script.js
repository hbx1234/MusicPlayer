const songs = [
    {
      title: "Birthday Song",
      artist: "Susan and Amy",
      src: "Susan and Amy - Birthday Song.mp3",
      albumArt: "happy-birthday.webp" // Replace with actual album art if available
    },
    {
      title: "Birthday Time",
      artist: "Bobtown",
      src: "Bobtown - Birthday Time.mp3",
      albumArt: "images.jpg"
    },
    {
      title: "Free Happy Birthday",
      artist: "Mark Humble",
      src: "Mark Humble - Free Happy Birthday.mp3",
      albumArt: "pic 4.jpg"
    }
  ];
  
  let currentSongIndex = 0;
  let isPlaying = false;
  
  // DOM Elements
  const songTitle = document.getElementById("song-title");
  const artistName = document.getElementById("artist-name");
  const albumArt = document.querySelector(".album-art");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.getElementById("progress");
  const volumeSlider = document.getElementById("volume-slider");
  
  const audio = new Audio();
  
  // Load song details into the UI
  function loadSong(song) {
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.albumArt;
    audio.src = song.src;
  }
  
  // Play song
  function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  }
  
  // Pause song
  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
  }
  
  // Previous song
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  }
  
  // Next song
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  }
  
  // Update progress bar and time
  function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  
    // Update current time
    currentTimeEl.textContent = formatTime(currentTime);
  
    // Update duration
    if (duration) {
      durationEl.textContent = formatTime(duration);
    }
  }
  
  // Format time (e.g., 1:23)
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  // Set volume
  function setVolume(e) {
    audio.volume = e.target.value;
  }
  
  // Event Listeners
  playBtn.addEventListener("click", playSong);
  pauseBtn.addEventListener("click", pauseSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressBar.addEventListener("click", setProgress);
  volumeSlider.addEventListener("input", setVolume);
  
  audio.addEventListener("ended", nextSong);
  
  // Initialize
  loadSong(songs[currentSongIndex]);
  