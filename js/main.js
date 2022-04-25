const songList = [
  {
    title: "Love Theme",
    file: "love-theme.mp3",
    cover: "1.jpg"

  },
  {
    title: "Uncharted Worlds",
    file: "uncharted-worlds.mp3",
    cover: "2.jpg"
  },
  {
    title: "Leaving Earth",
    file: "leaving-earth.mp3",
    cover: "2.jpg"
  },
  {
    title: "I Was Lost Without You",
    file: "i-was-lost-without-you.mp3",
    cover: "2.jpg"
  },
]

let actualSong = null

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

audio.addEventListener("timeupdate", updateProgress)

play.addEventListener("click", () => {
  if (audio.paused) {
    playSong()
  } else {
    pauseSong()
  }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

function loadSongs() {
  songList.forEach((song, index) => {

    const li = document.createElement("li")

    const link = document.createElement("a")

    link.textContent = song.title
    link.href = "#"

    link.addEventListener("click", () => loadSong(index))

    li.appendChild(link)

    songs.appendChild(li)
  })
}


function loadSong(songIndex) {
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex)
    actualSong = songIndex
    audio.src = "./audio/" + songList[songIndex].file
    playSong()
    changeSongtitle(songIndex)
    changeCover(songIndex)
  }
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement
  const percent = (currentTime / duration) * 100
  progress.style.width = percent + "%"
}

function setProgress(event) {
  const totalWidth = this.offsetWidth
  const progressWidth = event.offsetX
  const current = (progressWidth / totalWidth) * audio.duration
  audio.currentTime = current
}

function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause")
    play.classList.add("fa-play")
  } else {
    play.classList.add("fa-pause")
    play.classList.remove("fa-play")
  }
}

function playSong() {
  if (actualSong !== null) {
    audio.play()
    updateControls()
  }
}

function pauseSong() {
  audio.pause()
  updateControls()
}

function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a")
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active")
  }
  links[newIndex].classList.add("active")
}

function changeCover(songIndex) {
  cover.src = "./img/" + songList[songIndex].cover
}

function changeSongtitle(songIndex) {
  title.innerText = songList[songIndex].title
}

function prevSong() {
  if (actualSong > 0) {
    loadSong(actualSong - 1)
  } else {
    loadSong(songList.length - 1)
  }
}

function nextSong() {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1)
  } else {
    loadSong(0)
  }
}

audio.addEventListener("ended", () => nextSong())

loadSongs()