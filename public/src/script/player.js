
const modal = document.getElementById('modal');
const infoModal = document.getElementById('info-modal');
const audioPlayer = document.getElementById('audioplayer');
const message = document.getElementById('message');
const controls = document.getElementById('custom-controls');
const themeToggle = document.getElementById('themeToggle');
const filenameInput = document.getElementById('filename');
const extensions = ['.mp3', '.wav', '.ogg', '.mp4', '.m4a'];

let selectedFile = '';
let selectedSrc = '';

const userTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (userTheme === 'dark' || (!userTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

filenameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
    e.preventDefault();
    preparePlayback();
    }
});

function openInfoModal() {
    infoModal.style.display = 'block';
}

function closeInfoModal() {
    infoModal.style.display = 'none';
}

function preparePlayback() {
    const name = filenameInput.value.trim();
    if (!name) {
    showMessage('Bitte eine Kennung eingeben.');
    return;
    }
    selectedFile = name;
    checkAudioExists(name, 0);
}

function checkAudioExists(name, index) {
    if (index >= extensions.length) {
    showMessage('Datei nicht gefunden.');
    return;
    }

    const src = `audio/${name}${extensions[index]}`;
    fetch(src, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
        selectedSrc = src;
        modal.style.display = 'block';
        } else {
        checkAudioExists(name, index + 1);
        }
    })
    .catch(() => checkAudioExists(name, index + 1));
}

function confirmPlayback() {
    modal.style.display = 'none';
    loadAudio(selectedSrc);
}

function loadAudio(src) {
    audioPlayer.src = src;
    audioPlayer.hidden = false;
    controls.style.display = 'flex';
    message.textContent = '';
    audioPlayer.play();
}

function showMessage(text) {
    message.textContent = text;
}

function playAudio() {
    audioPlayer.play();
}

function pauseAudio() {
    audioPlayer.pause();
}

function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block' || infoModal.style.display === 'block') {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (modal.style.display === 'block') confirmPlayback();
        if (infoModal.style.display === 'block') closeInfoModal();
    }
    if (e.key === 'Escape') {
        e.preventDefault();
        if (modal.style.display === 'block') modal.style.display = 'none';
        if (infoModal.style.display === 'block') infoModal.style.display = 'none';
    }
    }
});
