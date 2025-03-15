document.addEventListener("DOMContentLoaded", function () {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar() {
        document.getElementById("calendarMonthYear").textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

        let tbody = document.querySelector("#calendarTable tbody");
        tbody.innerHTML = ""; // Clear old cells

        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        let row = tbody.insertRow();
        for (let i = 0; i < firstDay; i++) row.insertCell();

        for (let day = 1; day <= daysInMonth; day++) {
            let cell = row.insertCell();
            cell.textContent = day;
            if ((firstDay + day) % 7 === 0) row = tbody.insertRow();
        }
    }

    document.getElementById("prevMonth").addEventListener("click", () => { currentMonth--; renderCalendar(); });
    document.getElementById("nextMonth").addEventListener("click", () => { currentMonth++; renderCalendar(); });

    renderCalendar();
});
