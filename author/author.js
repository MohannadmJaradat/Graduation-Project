document.addEventListener('DOMContentLoaded', () => {
    const paperSection = document.getElementById('paperSection');
    const abstractSection = document.getElementById('abstractSection');

    // Dummy URLs for the uploaded files (replace these with actual file URLs)
    const uploadedPaperURL = 'path/to/uploaded/paper.pdf';
    const uploadedAbstractURL = 'path/to/uploaded/abstract.pdf';

    // Function to create view/download button
    function createFileLink(url, label) {
        const link = document.createElement('a');
        link.href = url;
        link.className = 'btn btn-outline-secondary btn-sm';
        link.textContent = label;
        link.target = '_blank'; // Open in new tab
        return link;
    }

    // Add the paper link/button
    if (uploadedPaperURL) {
        const paperLink = createFileLink(uploadedPaperURL, 'View/Download Paper');
        paperSection.appendChild(paperLink);
    } else {
        paperSection.textContent = 'No paper uploaded.';
    }

    // Add the abstract link/button
    if (uploadedAbstractURL) {
        const abstractLink = createFileLink(uploadedAbstractURL, 'View/Download Abstract');
        abstractSection.appendChild(abstractLink);
    } else {
        abstractSection.textContent = 'No abstract uploaded.';
    }

    // Add event listeners for edit and delete buttons
    const editButton = document.querySelector('.btn-warning.test-button');
    const deleteButton = document.querySelector('.btn-danger.test-button');

    editButton.addEventListener('click', () => {
        // Handle edit action
        alert('Edit button clicked');
    });

    deleteButton.addEventListener('click', () => {
        // Handle delete action
        alert('Delete button clicked');
    });
});
