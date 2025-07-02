/**
 * The source code for the "N Chars Editor" Hello World application.
 *
 * @version 1.0.0
 * @copyright Copyright (c) 2020-2025 The Hello World Writer
 * @license MIT
 * @website https://www.thehelloworldwriter.com
 *
 * @author TechAurelian <contact@techaurelian.com> (https://techaurelian.com)
 */

/**
 * The default maximum length for the textarea.
 */
const DEFAULT_MAX_LENGTH = 100;

/**
 * The input field for setting the maximum length of the textarea.
 */
const maxlengthInput = document.getElementById("maxlength-input");

/**
 * The textarea where users can input text.
 */
const editorTextarea = document.getElementById("editor-textarea");

/**
 * The character counter element that displays the current length and maximum length.
 */
const editorCounter = document.getElementById("editor-counter");

/**
 * The button to copy the content of the textarea to the clipboard.
 */
const copyButton = document.getElementById("copy-button");

/**
 * The button to paste and replace the content of the textarea with clipboard contents.
 */
const pasteButton = document.getElementById("paste-button");

/**
 * Updates the maximum length of the textarea based on user input.
 */
function updateMaxLength() {
  const newMaxLength = parseInt(maxlengthInput.value, 10);

  if (isNaN(newMaxLength) || newMaxLength < 1) {
    // If the input is invalid, reset to the default.
    maxlengthInput.value = DEFAULT_MAX_LENGTH;
    editorTextarea.maxLength = DEFAULT_MAX_LENGTH;
  } else {
    editorTextarea.maxLength = newMaxLength;
  }

  // Truncate the current text if it exceeds the new limit.
  if (editorTextarea.value.length > editorTextarea.maxLength) {
    editorTextarea.value = editorTextarea.value.slice(0, editorTextarea.maxLength);
  }

  // Update the counter to reflect the new max length.
  updateCounter();
}

// Update the max length when the user enters a new value in the maxlength input
maxlengthInput.addEventListener("change", updateMaxLength);

// Copy the content of the textarea to the clipboard when the copy button is clicked
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

// Replace the content of the textarea with clipboard contents when the paste button is clicked
pasteButton.addEventListener("click", () => {
  navigator.clipboard.readText()
    .then(text => {
      editorTextarea.value = text.slice(0, editorTextarea.maxLength);
      console.log('Pasted content: ', text);
      updateCounter();
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
});

/**
 * Updates the character counter display based on the current textarea value and max length.
 */
function updateCounter() {
  editorCounter.textContent = `${editorTextarea.value.length}/${editorTextarea.maxLength}`;
}

// Update the character counter whenever the textarea content changes
editorTextarea.addEventListener("input", updateCounter);

// Update the character counter on initial load
updateCounter();

