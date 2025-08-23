
// Inaya's Birthday Counter
// Born: August 5, 2025 at 1:50am EST
const birthDate = new Date('2025-08-05T01:50:00-05:00'); // EST

function updateCounters() {
    const now = new Date();
    let diffMs = now - birthDate;
    if (diffMs < 0) {
        // Not born yet
        document.getElementById('days-counter').textContent = '0';
        document.getElementById('weeks-counter').textContent = '0 weeks 0 days';
        document.getElementById('months-counter').textContent = '0 months 0 days';
        document.getElementById('timer-counter').textContent = formatCountdown(-diffMs) + ' until birth';
        document.getElementById('progress-bar-fill').style.width = '0%';
        document.getElementById('progress-label').textContent = 'Not born yet';
        return;
    }

    // Days
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    document.getElementById('days-counter').textContent = days;

    // Weeks + days
    const weeks = Math.floor(days / 7);
    const weekDays = days % 7;
    document.getElementById('weeks-counter').textContent = `${weeks} week${weeks !== 1 ? 's' : ''} ${weekDays} day${weekDays !== 1 ? 's' : ''}`;

    // Months + days (approximate)
    const months = Math.floor(days / 30);
    const monthDays = days % 30;
    document.getElementById('months-counter').textContent = `${months} month${months !== 1 ? 's' : ''} ${monthDays} day${monthDays !== 1 ? 's' : ''}`;

    // Timer until next increment (next 1:50am EST)
    const nextIncrement = getNextIncrement(now);
    const msUntilNext = nextIncrement - now;
    document.getElementById('timer-counter').textContent = formatCountdown(msUntilNext) + ` until ${days + 1} days old`;

    // Progress bar to next birthday
    updateProgressBar(now);
}

function getNextIncrement(now) {
    // Next 1:50am EST after now
    const estOffset = -5 * 60; // EST offset in minutes
    const nowUtc = now.getTime() + now.getTimezoneOffset() * 60000;
    let next = new Date(nowUtc + estOffset * 60000);
    next.setHours(1, 50, 0, 0);
    if (now.getHours() > 1 || (now.getHours() === 1 && now.getMinutes() >= 50)) {
        next.setDate(next.getDate() + 1);
    }
    // Convert back to local time
    return new Date(next.getTime() - estOffset * 60000);
}

function formatCountdown(ms) {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

function updateProgressBar(now) {
    // Next birthday (year increment)
    let nextBirthdayYear = now.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const birthHour = birthDate.getHours();
    const birthMinute = birthDate.getMinutes();
    // If birthday this year has passed, use next year
    const thisYearBirthday = new Date(nextBirthdayYear, birthMonth, birthDay, birthHour, birthMinute);
    if (now >= thisYearBirthday) {
        nextBirthdayYear++;
    }
    const nextBirthday = new Date(nextBirthdayYear, birthMonth, birthDay, birthHour, birthMinute);
    // Last birthday
    const lastBirthday = new Date(nextBirthdayYear - 1, birthMonth, birthDay, birthHour, birthMinute);
    // Progress calculation
    const totalMs = nextBirthday - lastBirthday;
    const elapsedMs = now - lastBirthday;
    let percent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
    document.getElementById('progress-bar-fill').style.width = percent + '%';
    // Label: days until next birthday
    const msLeft = nextBirthday - now;
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    document.getElementById('progress-label').textContent = `${daysLeft} days until next birthday (${nextBirthdayYear})`;
}

function scheduleDailyUpdate() {
    const now = new Date();
    const nextIncrement = getNextIncrement(now);
    const msUntilNext = nextIncrement - now;
    setTimeout(() => {
        updateCounters();
        setInterval(updateCounters, 24 * 60 * 60 * 1000);
    }, msUntilNext);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounters();
    scheduleDailyUpdate();
    setInterval(updateCounters, 1000); // Real-time timer and progress
});
