document.addEventListener('DOMContentLoaded', function () {
    const historyList = document.getElementById('history-list');
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Mengambil data dari localStorage yang sama dengan web app sebelumnya
    const savedHistory = localStorage.getItem('decisionAI_history');
    if (savedHistory) {
        const allConversations = JSON.parse(savedHistory);
        const sortedIds = Object.keys(allConversations).sort((a, b) => b.split('-')[1] - a.split('-')[1]);
        
        if (sortedIds.length === 0) {
            historyList.innerHTML = '<p>Belum ada riwayat konsultasi.</p>';
            return;
        }

        sortedIds.forEach(id => {
            const conversation = allConversations[id];
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `<strong>${conversation.title}</strong>`;
            
            // Event listener untuk mengirim data kembali ke bot (jika diperlukan)
            // item.onclick = () => {
            //     tg.sendData(`load_history_${id}`);
            // };

            historyList.appendChild(item);
        });
    } else {
        historyList.innerHTML = '<p>Belum ada riwayat konsultasi.</p>';
    }
});
