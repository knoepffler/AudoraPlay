
const modal = document.getElementById('modal');
const infoModal = document.getElementById('info-modal');
const audioPlayer = document.getElementById('audioplayer');
const message = document.getElementById('message');
const controls = document.getElementById('custom-controls');
const themeToggle = document.getElementById('themeToggle');
const filenameInput = document.getElementById('filename');
const extensions = ['.mp3', '.wav', '.ogg', '.mp4', '.m4a'];

// Survey modal elements
const surveyModal = document.getElementById('survey-modal');
const surveyIframe = document.getElementById('survey-iframe');
const SURVEY_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeCJVdbMpfVYdJCJd5FKJ6elw8AgA0zgTpvZPHkTUoGTFd3dw/viewform?embedded=true';

let selectedSrc = '';
let currentFilename = '';

const userTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (userTheme === 'dark' || (!userTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.textContent = '☀️';
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (filenameInput) {
    filenameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            preparePlayback();
        }
    });
}

function openInfoModal() {
    if (infoModal) {
        infoModal.style.display = 'block';
    }
}

function closeInfoModal() {
    if (infoModal) {
        infoModal.style.display = 'none';
    }
}

function preparePlayback() {
    if (!filenameInput) return;
    const name = filenameInput.value.trim();
    if (!name) {
    showMessage('Bitte eine Kennung eingeben.');
    return;
    }
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
        currentFilename = `${name}${extensions[index]}`;
        if (modal) {
            modal.style.display = 'block';
        }
        } else {
        checkAudioExists(name, index + 1);
        }
    })
    .catch(() => checkAudioExists(name, index + 1));
}

function confirmPlayback() {
    if (modal) {
        modal.style.display = 'none';
    }
    loadAudio(selectedSrc);
}

function loadAudio(src) {
    if (!audioPlayer || !controls || !message) return;
    audioPlayer.src = src;
    audioPlayer.hidden = false;
    controls.style.display = 'flex';
    message.textContent = '';
    audioPlayer.play();
}

function showMessage(text) {
    if (message) {
        message.textContent = text;
    }
}

function playAudio() {
    if (audioPlayer) audioPlayer.play();
}

function pauseAudio() {
    if (audioPlayer) audioPlayer.pause();
}

function stopAudio() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}


document.addEventListener('keydown', function(e) {
    const modalVisible = modal && modal.style.display === 'block';
    const infoVisible = infoModal && infoModal.style.display === 'block';
    const surveyVisible = surveyModal && surveyModal.style.display === 'block';
    if (modalVisible || infoVisible || surveyVisible) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (modalVisible) confirmPlayback();
            if (infoVisible) closeInfoModal();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            if (modalVisible) modal.style.display = 'none';
            if (infoVisible) infoModal.style.display = 'none';
            if (surveyVisible) closeSurveyModal();
        }
    }
});

function openSurveyModal() {
    if (!surveyModal || !surveyIframe) return;
    // Set src when opening to avoid loading it upfront
    surveyIframe.src = SURVEY_URL;
    surveyModal.style.display = 'block';
}

function closeSurveyModal() {
    if (!surveyModal || !surveyIframe) return;
    surveyModal.style.display = 'none';
    // Reset src to stop any network activity/media
    surveyIframe.src = '';
}
