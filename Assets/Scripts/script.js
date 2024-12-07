let examData = [];

fetch('Assets/Scripts/examData.json')
    .then(response => response.json())
    .then(data => {
        examData = data;
    })
    .catch(error => console.error('Error loading exam data:', error));

function showExamDetails() {
    const rollNumber = document.getElementById("rollNumber").value;
    const examTable = document.getElementById("examDetails");
    const detailsDiv = document.getElementById("details");
    examTable.innerHTML = "";
    detailsDiv.innerHTML = "";

    if (!rollNumber) {
        const message = document.createElement("p");
        message.className = "message";
        message.textContent = "Please enter your Student ID.";
        examTable.appendChild(message);
        return;
    }

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Room</th>
        </tr>
    `;

    let found = false;

    const order = ["English I", "Discrete Mathematics", "History of the Emergence of Bangladesh"];

    const sortedData = examData.sort((a, b) => {
        return order.indexOf(a.subjectName) - order.indexOf(b.subjectName);
    });

    for (const exam of sortedData) {
        const isInRoom1 = isInRange(rollNumber, exam.room1.range);
        const isInRoom2 = isInRange(rollNumber, exam.room2.range);
        if (isInRoom1 || isInRoom2) {
            const room = isInRoom1 ? exam.room1.number : exam.room2.number;
            found = true;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${exam.subjectName}</td>
                <td>${exam.date}</td>
                <td>${exam.time}</td>
                <td>${room}</td>
            `;
            table.appendChild(row);

            const card = document.createElement("div");
            card.className = "detail-card";
            card.innerHTML = `
                <h3>${exam.subjectName}</h3>
                <p><strong>Subject Code:</strong> ${exam.subjectCode}</p>
                <p><strong>Section:</strong> ${exam.section}</p>
                <p><strong>Instructor:</strong> ${exam.instructor}</p>
                <p><strong>Date:</strong> ${exam.date}</p>
                <p><strong>Time:</strong> ${exam.time}</p>
                <p><strong>Room:</strong> ${room}</p>
            `;
            detailsDiv.appendChild(card);
        }
    }

    if (!found) {
        const message = document.createElement("p");
        message.className = "message";
        message.textContent = "No details found for this ID.";
        examTable.appendChild(message);
    } else {
        examTable.appendChild(table);
    }
}

function isInRange(roll, range) {
    const [start, end] = range.split("-").map(Number);
    const rollNum = Number(roll);
    return rollNum >= start && rollNum <= end;
}
