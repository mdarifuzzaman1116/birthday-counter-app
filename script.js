// Birthday Counter JavaScript
// Birthday date: August 5th, 2025
const birthdayDate = new Date('2025-08-05');

function updateCounter() {
    const now = new Date();
    const timeDifference = now - birthdayDate;
    
    // Calculate total days since birthday
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    // Calculate weeks and remaining days
    const weeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;
    
    // Calculate months and remaining days
    const currentDate = new Date(now);
    const birthDate = new Date(birthdayDate);
    
    let months = 0;
    let remainingDaysAfterMonths = 0;
    
    // Calculate months difference
    months = (currentDate.getFullYear() - birthDate.getFullYear()) * 12;
    months += currentDate.getMonth() - birthDate.getMonth();
    
    // Calculate remaining days after months
    const tempDate = new Date(birthDate);
    tempDate.setMonth(tempDate.getMonth() + months);
    
    if (tempDate > currentDate) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
    }
    
    remainingDaysAfterMonths = Math.floor((currentDate - tempDate) / (1000 * 60 * 60 * 24));
    
    // Update the display
    document.getElementById('days-count').textContent = totalDays;
    document.getElementById('weeks-count').textContent = `${weeks} weeks ${remainingDaysAfterWeeks} days`;
    document.getElementById('months-count').textContent = `${months} months ${remainingDaysAfterMonths} days`;
}

// Update counter immediately when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
    
    // Update counter every hour (3600000 milliseconds)
    setInterval(updateCounter, 3600000);
});

// Also update counter every minute for more accurate display
setInterval(updateCounter, 60000);