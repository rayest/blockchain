const newYears = '25 July 2024'

function countdown() {
    const newYearsEveDate = new Date(newYears)
    const currentDate = new Date()

    const totalSeconds = (newYearsEveDate - currentDate) / 1000

    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = Math.floor(totalSeconds) % 60

    document.getElementById('days').innerHTML = formatTime(days)
    document.getElementById('hours').innerHTML = formatTime(hours)
    document.getElementById('minutes').innerHTML = formatTime(minutes)
    document.getElementById('seconds').innerHTML = formatTime(seconds)
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

// Initial call
countdown()

setInterval(countdown, 1000)