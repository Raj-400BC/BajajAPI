
document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const user_id = document.getElementById('user_id').value;
    const userEmail = document.getElementById('userEmail').value;
    const userRollNo = document.getElementById('userRollNo').value;
    const dataArray = document.getElementById("dataArray").value.split(",");
    const postData = { user_id, userEmail, userRollNo, data: dataArray };

    try {
        const response = await fetch('/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('output').innerHTML = `
            <h2>Response</h2>
            <p>Status: ${data.is_success}</p>
            <p>User ID: ${data.user_id}</p>
            <p>Email: ${data.email}</p>
            <p>Roll Number: ${data.roll_number}</p>
            <p>Odd Numbers: ${data.odd_numbers.join(', ')}</p>
            <p>Even Numbers: ${data.even_numbers.join(', ')}</p>
            <p>Alphabets: ${data.alphabets.join(', ')}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = `
            <h2>Error</h2>
            <p>Something went wrong. Please try again later.</p>🥹
            <p>I have tested it in POSTMAN . It was working 🥹 🥹🥹</p>
        `;
    }
});
