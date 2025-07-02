
const maxlengthInput = document.getElementById("maxlength-input");
const editorTextarea = document.getElementById("editor-textarea");
const editorCounter = document.getElementById("editor-counter");
const copyButton = document.getElementById("copy-button");
const pasteButton = document.getElementById("paste-button");

function updateMaxLength() {
    const newMaxLength = parseInt(maxlengthInput.value, 10);

    if (isNaN(newMaxLength) || newMaxLength < 1) {
        // If the input is invalid, reset to a sensible default like 1.
        maxlengthInput.value = "1";
        editorTextarea.maxLength = 1;
    } else {
        editorTextarea.maxLength = newMaxLength;
    }

    // Truncate the current text if it exceeds the new limit.
    if (editorTextarea.value.length > editorTextarea.maxLength) {
        editorTextarea.value = editorTextarea.value.slice(0, editorTextarea.maxLength);
    }
    updateCounter();
}

maxlengthInput.addEventListener("change", updateMaxLength);

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(editorTextarea.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
});

pasteButton.addEventListener("click", () => {
    navigator.clipboard.readText()
        .then(text => {
            // Use slice() instead of the deprecated substr().
            editorTextarea.value = text.slice(0, editorTextarea.maxLength);
            console.log('Pasted content: ', text);
            updateCounter();
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
});


function updateCounter() {
    editorCounter.textContent = `${editorTextarea.value.length}/${editorTextarea.maxLength}`;
}

editorTextarea.addEventListener("input", updateCounter);

// Initialize the counter and max length on load.
updateCounter();

