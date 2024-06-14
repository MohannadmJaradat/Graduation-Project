document.getElementById('submitFileButton').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if not authenticated
        window.location.href = '../Login/login.html'; 
    }
    const paperFileInput = document.getElementById('formFile');
    const paperFile = paperFileInput.files[0];
    const conferenceId = localStorage.getItem('conId');

    if (!paperFile) {
        alert('Please select a paper file to upload.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('conferenceId', conferenceId);
        formData.append('paper', paperFile);

        const response = await fetch('http://localhost:3000/author/add-submission-without-abstract', {
            method: 'POST',
            headers: {
                // No need to set 'Content-Type' header for FormData
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to add submission');
        }

        const result = await response.json();
        alert('Submission added successfully');
        console.log(result);
    } catch (error) {
        console.error('Error adding submission:', error);
        alert('Failed to add submission. Check console for details.');
    }
});
