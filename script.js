
// Inaya's Birthday Counter
// Born: August 5, 2025 at 1:50am ET (America/New_York)

// Get current time in America/New_York as a plain Date object
function nowInNY() {
    const now = new Date();
    // Format now in NY timezone to get individual components
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).formatToParts(now);
    const get = (type) => parseInt(parts.find(p => p.type === type).value);
    return {
        year: get('year'),
        month: get('month'), // 1-indexed
        day: get('day'),
        hour: get('hour'),
        minute: get('minute'),
        second: get('second'),
        raw: now
    };
}

// Build a UTC timestamp for a given NY local time
function nyToUTC(year, month, day, hour, minute, second = 0) {
    // Use a string the browser can parse with timezone context
    const pad = (n) => String(n).padStart(2, '0');
    // We'll use Intl to find the UTC offset at that moment by binary search approach
    // Simpler: construct the date as if UTC, then adjust by checking actual NY offset
    const isoStr = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
    // Try EST (-05:00) and EDT (-04:00); pick the one that round-trips correctly
    for (const offset of ['-05:00', '-04:00']) {
        const candidate = new Date(isoStr + offset);
        const check = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }).formatToParts(candidate);
        const get = (type) => parseInt(check.find(p => p.type === type).value);
        if (
            get('year') === year && get('month') === month && get('day') === day &&
            get('hour') === hour && get('minute') === minute
        ) {
            return candidate;
        }
    }
    // Fallback
    return new Date(isoStr + '-05:00');
}

// Birth moment as UTC Date object
const birthDate = nyToUTC(2025, 8, 5, 1, 50, 0);

// Compute months elapsed since birth (monthly birthday = 5th of each month at 1:50am NY)
function getMonthsElapsed(nowNY) {
    const birthYear = 2025, birthMonth = 8; // August
    let months = (nowNY.year - birthYear) * 12 + (nowNY.month - birthMonth);
    // If we haven't hit 1:50am on the 5th yet this month, subtract one
    if (nowNY.day < 5 || (nowNY.day === 5 && (nowNY.hour < 1 || (nowNY.hour === 1 && nowNY.minute < 50)))) {
        months -= 1;
    }
    return Math.max(0, months);
}

// Next monthly birthday timestamp (UTC)
function getNextMonthlyBirthday(nowNY) {
    const monthsElapsed = getMonthsElapsed(nowNY);
    const nextMonthCount = monthsElapsed + 1;
    // Add nextMonthCount months to Aug 2025
    let targetMonth = 8 + nextMonthCount;
    let targetYear = 2025 + Math.floor((targetMonth - 1) / 12);
    targetMonth = ((targetMonth - 1) % 12) + 1;
    return nyToUTC(targetYear, targetMonth, 5, 1, 50, 0);
}

// Last monthly birthday timestamp (UTC)
function getLastMonthlyBirthday(nowNY) {
    const monthsElapsed = getMonthsElapsed(nowNY);
    if (monthsElapsed === 0) return birthDate;
    let targetMonth = 8 + monthsElapsed;
    let targetYear = 2025 + Math.floor((targetMonth - 1) / 12);
    targetMonth = ((targetMonth - 1) % 12) + 1;
    return nyToUTC(targetYear, targetMonth, 5, 1, 50, 0);
}

// Next annual birthday (Aug 5)
function getNextAnnualBirthday(nowNY) {
    let year = nowNY.year;
    // If Aug 5 1:50am already passed this year, go to next year
    const thisYearBday = nyToUTC(year, 8, 5, 1, 50, 0);
    if (new Date() >= thisYearBday) year++;
    return nyToUTC(year, 8, 5, 1, 50, 0);
}

function formatCountdown(ms) {
    if (ms <= 0) return '0h 0m 0s';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return `${hours}h ${minutes}m ${seconds}s`;
}

function ordinal(n) {
    const s = ['th','st','nd','rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function updateCounters() {
    const now = new Date();
    const nyNow = nowInNY();
    const diffMs = now - birthDate;

    if (diffMs < 0) {
        document.getElementById('days-counter').textContent = '0';
        document.getElementById('weeks-counter').textContent = '0 weeks 0 days';
        document.getElementById('months-counter').textContent = '0 months 0 days';
        document.getElementById('monthly-bday-counter').textContent = 'Not born yet';
        document.getElementById('timer-counter').textContent = formatCountdown(-diffMs) + ' until birth';
        document.getElementById('progress-bar-fill').style.width = '0%';
        document.getElementById('progress-label').textContent = 'Not born yet';
        return;
    }

    // Days since birth
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    document.getElementById('days-counter').textContent = totalDays.toLocaleString();

    // Weeks + remaining days
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    document.getElementById('weeks-counter').textContent =
        `${weeks} week${weeks !== 1 ? 's' : ''} ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;

    // Months (true calendar months) + remaining days
    const monthsElapsed = getMonthsElapsed(nyNow);
    const lastMonthlyBday = getLastMonthlyBirthday(nyNow);
    const daysSinceLastMonthly = Math.floor((now - lastMonthlyBday) / (1000 * 60 * 60 * 24));
    document.getElementById('months-counter').textContent =
        `${monthsElapsed} month${monthsElapsed !== 1 ? 's' : ''} ${daysSinceLastMonthly} day${daysSinceLastMonthly !== 1 ? 's' : ''}`;

    // Monthly birthday milestone label
    document.getElementById('monthly-bday-counter').textContent =
        `She just turned ${ordinal(monthsElapsed)} month old!`;

    // Countdown to next monthly birthday
    const nextMonthly = getNextMonthlyBirthday(nyNow);
    const msUntilMonthly = nextMonthly - now;
    const nextMonthNumber = monthsElapsed + 1;
    document.getElementById('timer-counter').textContent =
        formatCountdown(msUntilMonthly) + ` until ${ordinal(nextMonthNumber)} month`;

    // Progress bar: last monthly birthday -> next monthly birthday
    const lastMonthly = getLastMonthlyBirthday(nyNow);
    const totalMonthMs = nextMonthly - lastMonthly;
    const elapsedMonthMs = now - lastMonthly;
    const percent = Math.min(100, Math.max(0, (elapsedMonthMs / totalMonthMs) * 100));
    document.getElementById('progress-bar-fill').style.width = percent.toFixed(2) + '%';

    // Annual birthday progress label
    const nextAnnual = getNextAnnualBirthday(nyNow);
    const msUntilAnnual = nextAnnual - now;
    const daysUntilAnnual = Math.floor(msUntilAnnual / (1000 * 60 * 60 * 24));
    const annualYear = nextAnnual.getFullYear();
    document.getElementById('progress-label').textContent =
        `${daysUntilAnnual} days until ${annualYear} birthday · Month ${percent.toFixed(1)}% complete`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounters();
    setInterval(updateCounters, 1000);
});
