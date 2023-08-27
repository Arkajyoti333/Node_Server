// Get references to DOM elements
const changeTextBtn = document.getElementById("changeTextBtn");
const contentParagraph = document.querySelector("#content p");

// Add click event listener to the button
changeTextBtn.addEventListener("click", () => {
    contentParagraph.textContent = "Text changed using JavaScript!";
});
