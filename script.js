// Устанавливаем дату свадьбы: 29 июля 2026 года, 17:00:00
const weddingDate = new Date('July 29, 2026 17:00:00').getTime();

const timerFunction = setInterval(function () {
    // Получаем текущую дату и время
    const now = new Date().getTime();

    // Находим разницу между датами
    const distance = weddingDate - now;

    // Вычисляем дни, часы, минуты и секунды
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Выводим результат в HTML-элементы
    if (distance > 0) {
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    } else {
        // Если дата уже наступила, обнуляем таймер
        clearInterval(timerFunction);
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
}, 1000);

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('play-icon');

    if (music.paused) {
        music.play();
        // Меняем иконку на Pause и запускаем вращение
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        document.querySelector('.rotated-text').style.animationPlayState = 'running';
    } else {
        music.pause();
        // Меняем обратно на Play и останавливаем вращение
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        document.querySelector('.rotated-text').style.animationPlayState = 'paused';
    }
}
