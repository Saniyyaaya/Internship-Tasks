document.getElementById("uploadBtn").addEventListener("click", () => {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (event) => {
    let fileList = document.getElementById("fileList");
    let filesDisplay = document.getElementById("filesDisplay");
    fileList.innerHTML = "";
    filesDisplay.innerHTML = "";  // Clear previous display

    Array.from(event.target.files).forEach(file => {
        let fileElement = document.createElement("p");
        fileElement.textContent = file.name;
        fileList.appendChild(fileElement);

        // Show the uploaded files on the screen with an open functionality
        let fileItem = document.createElement("p");

        // Create a link or embed based on file type
        let fileLink = document.createElement("a");
        fileLink.textContent = `Open ${file.name}`;
        fileLink.href = URL.createObjectURL(file); // Use Blob URL to link to the file
        fileLink.target = "_blank"; // Open in a new tab

        fileItem.appendChild(fileLink);
        filesDisplay.appendChild(fileItem);
    });

    // Display uploaded files section
    document.getElementById("uploadedFiles").style.display = "block";
});

document.getElementById("darkModeToggle").addEventListener("change", (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
