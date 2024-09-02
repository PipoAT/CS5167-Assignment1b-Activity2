document.addEventListener('DOMContentLoaded', () => {
    const entries = [
        { date: '2024-08-30', time: '08:00', journal: 'Had a productive day.', sleep: 7, feelings: ['motivated', 'happy'] },
        { date: '2024-08-31', time: '09:00', journal: 'Felt a bit anxious.', sleep: 5, feelings: ['anxious'] },
        { date: '2024-09-01', time: '07:30', journal: 'Went for a long walk.', sleep: 6, feelings: ['energetic', 'happy'] }
    ];

    const form = document.querySelector('form');
    const sleepInput = document.getElementById('sleep');
    const feelingInputs = document.querySelectorAll('input[name="feeling"]');
    const avgSleepDisplay = document.querySelector('#sleep-data text');
    const moodText = document.querySelector('#mood-data text');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const journal = document.getElementById('journal').value;
        const sleep = parseInt(sleepInput.value);
        const feelings = Array.from(feelingInputs)
            .filter(input => input.checked)
            .map(input => input.value);

        if (isNaN(sleep)) {
            alert('Please enter a valid number for sleep.');
            return;
        }

        const entry = { date, time, journal, sleep, feelings };
        const existingEntryIndex = entries.findIndex(e => e.date === date);

        if (existingEntryIndex !== -1) {
            entries[existingEntryIndex] = entry;
        } else {
            entries.push(entry);
        }

        updateStatistics();
        form.reset();
    });

    sleepInput.addEventListener('input', () => {
        console.log(`Sleep input changed: ${sleepInput.value}`);
    });

    feelingInputs.forEach(input => {
        input.addEventListener('change', () => {
            console.log(`Feeling input changed: ${input.value} is ${input.checked ? 'checked' : 'unchecked'}`);
        });
    });

    function updateStatistics() {
        const totalSleep = entries.reduce((sum, entry) => sum + entry.sleep, 0);
        const avgSleep = (totalSleep / entries.length).toFixed(2);
        avgSleepDisplay.textContent = `${avgSleep} Hours`;

        const latestEntry = entries[entries.length - 1];
        moodText.textContent = latestEntry.feelings.join(', ');
    }

    updateStatistics();
});
