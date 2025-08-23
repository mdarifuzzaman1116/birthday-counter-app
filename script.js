// Birthday Counter for Inaya
// Born: August 5th, 2025 at 1:50 AM EST

function updateCounters() {
    // Inaya's birth date and time (August 5th, 2025 at 1:50 AM EST)
    const birthDate = new Date('2025-08-05T01:50:00-05:00'); // EST timezone
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffMs = now - birthDate;
    
    if (diffMs < 0) {
        // If birth date is in the future, show countdown
        const absDiffMs = Math.abs(diffMs);
        const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
        
        document.getElementById('days-counter').textContent = `${days} days until birth`;
        document.getElementById('weeks-counter').textContent = `${Math.floor(days / 7)} weeks ${days % 7} days until birth`;
        document.getElementById('months-counter').textContent = `${Math.floor(days / 30)} months ${days % 30} days until birth`;
        return;
    }
    
    // Calculate days since birth
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Calculate weeks and remaining days
    const weeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;
    
    // Calculate months and remaining days (approximate)
    const months = Math.floor(totalDays / 30);
    const remainingDaysAfterMonths = totalDays % 30;
    
    // Update the display
    document.getElementById('days-counter').textContent = totalDays;
    document.getElementById('weeks-counter').textContent = `${weeks} weeks ${remainingDaysAfterWeeks} days`;
    document.getElementById('months-counter').textContent = `${months} months ${remainingDaysAfterMonths} days`;
}

// Update counters when page loads
document.addEventListener('DOMContentLoaded', updateCounters);

// Update counters every minute to keep them current
setInterval(updateCounters, 60000);