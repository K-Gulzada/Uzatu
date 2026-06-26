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

// Функция открытия универсального окна
function openCustomModal(text, isError = false) {
    const modal = document.getElementById('customModal');
    const messageElement = document.getElementById('modalMessage');

    // Вставляем переданный текст
    messageElement.innerText = text;

    if (isError) {
        // Если это ошибка — включаем красный режим
        modal.classList.add('error-mode');
    } else {
        // Если все хорошо — убираем его (на случай, если он остался с прошлого раза)
        modal.classList.remove('error-mode');
    }

    // Показываем окно
    modal.classList.add('active');
}

// Функция закрытия окна
function closeCustomModal() {
    document.getElementById('customModal').classList.remove('active');
}

function sendRsvpToGoogleTable(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const button = document.getElementById('submitBtn');

    // Блокируем кнопку и стираем текст, оставляя ТОЛЬКО спиннер по центру
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span>';
    button.style.opacity = "0.8";

    // Дальше весь твой код отправки идет без изменений...
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.disabled = true;
        input.style.opacity = "0.6";
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwGIKh51Ep8jtobzjsCj1_JpgVbn5hELuQDHzmcQ8JeNFHzx4TwlmLqzNIJzPB-A-q-/exec';

    const nameField = form.querySelector('[name="name"]');
    const attendanceField = form.querySelector('[name="attendance"]:checked');

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            openCustomModal('Рахмет! Жауап сәтті қабылданды.', false);

            // Фиксируем финальный статус
            button.innerHTML = "Жіберу";
            button.disabled = true;
            button.style.opacity = "0.6";
        })
        .catch(error => {
            console.error('Ошибка!', error.message);
            button.disabled = false;
            button.style.opacity = "1";
            inputs.forEach(input => {
                input.disabled = false;
                input.style.opacity = "1";
            });
            openCustomModal('Желіде қате кетті. Кейінірек қайталап көріңіз.', true);
        });
}
