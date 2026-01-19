const urlInput = document.getElementById('urlInput');
const checkBtn = document.getElementById('checkBtn');
const loading = document.getElementById('loading');
const resultDiv = document.getElementById('result');

checkBtn.addEventListener('click', checkLink);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkLink();
});

async function checkLink() {
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please enter a URL first.');
        return;
    }

    // UI Reset
    resultDiv.classList.add('hidden');
    loading.classList.remove('hidden');
    resultDiv.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        // Simulate a small delay for "scanning" effect
        setTimeout(() => {
            loading.classList.add('hidden');
            resultDiv.classList.remove('hidden');
            displayResult(data);
        }, 800);

    } catch (error) {
        loading.classList.add('hidden');
        alert('Error connecting to server. Make sure the backend is running.');
        console.error(error);
    }
}

function displayResult(data) {
    const { status, score, message, risks } = data;

    let iconClass = 'fa-check-circle';
    let statusLabel = 'Safe';
    let cardClass = 'safe';
    let scoreColor = '#22c55e'; // Green

    if (status === 'SUSPICIOUS') {
        iconClass = 'fa-exclamation-triangle';
        statusLabel = 'Suspicious';
        cardClass = 'suspicious';
        scoreColor = '#eab308'; // Yellow
    } else if (status === 'DANGEROUS') {
        iconClass = 'fa-ban';
        statusLabel = 'Dangerous';
        cardClass = 'dangerous';
        scoreColor = '#ef4444'; // Red
    } else if (status === 'INVALID') {
        iconClass = 'fa-question-circle';
        statusLabel = 'Invalid URL';
        cardClass = 'suspicious'; // Grey/Yellow
    }

    // Build Risk List
    let risksHtml = '';
    if (risks && risks.length > 0) {
        risksHtml = `<ul class="risk-list">
            ${risks.map(risk => `<li>${risk}</li>`).join('')}
        </ul>`;
    }

    resultDiv.innerHTML = `
        <div class="result-card ${cardClass}">
            <div class="status-header">
                <div class="status-icon">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div>
                    <h2 class="status-text">${statusLabel}</h2>
                    <p style="color: #94a3b8; font-size: 0.9rem;">${message}</p>
                </div>
            </div>

            <div class="score-container">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #94a3b8; margin-bottom: 5px;">
                    <span>Threat Score</span>
                    <span>${score}/100</span>
                </div>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${score}%; background-color: ${scoreColor};"></div>
                </div>
            </div>

            ${risksHtml}
        </div>
    `;
}
