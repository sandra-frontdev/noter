// Array with all notes
let notes = [];

// Filter text:
const filters = { searchText: "" };

// Making object constuctor for creating notes:
function newNote(title, body) {
  (this.title = title), (this.body = body);
}

// For each note make header and paragraph: Take note from object:
let renderNotes = (notes, filters) => {
  notes.forEach(note => {
    // Creating elements
    const containerDiv = document.querySelector(".ui.celled.list");
    const parentDiv = document.createElement("div");
    let iconNote = document.createElement("img");
    iconNote.src = "https://img.icons8.com/dusk/64/000000/add-rule.png";
    const divHeader = document.createElement("div");
    const divNote = document.createElement("div");

    // Adding text content to elements:
    const divText = (divNote.textContent = note.body);
    const divHeaderText = (divHeader.textContent = note.title);

    // Appending elements to parent element and adding them to page:
    containerDiv.appendChild(parentDiv);
    parentDiv.appendChild(iconNote);
    parentDiv.appendChild(divHeader);
    parentDiv.appendChild(divNote);

    // Add classes to created elements:
    parentDiv.classList.add("item");
    iconNote.classList.add("ui", "avatar", "image");
    divHeader.classList.add("header");
    divNote.classList.add("content");
  });
};

// Invite function to show notes:
renderNotes(notes, filters);

/* ***Scroll up functionality:*** */
let scrollUpButton = document.getElementById("arrow-up");

// Adding event listener on scroll up button:
scrollUpButton.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log(document.documentElement);
});

// Show scroll down button when the user scrolls down 20px from the top of document
window.onscroll = () => {
  scrollFunction();
};

let scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUpButton.style.display = "block";
  } else {
    scrollUpButton.style.display = "none";
  }
};

/* ------------------------------------*/
/* Adding events listeners on buttons */
/* ------------------------------------*/

// Delete UI:
let deleteNotesDOM = () => {
  let notesElement = document.querySelectorAll(".item");
  Array.from(notesElement).forEach(element => {
    element.remove();
  });
};

// Delete data:
let deleteNotesData = () => {
  notes = [];
};

let addNoteBtn = document.getElementById("add-note");
let removeAllNotesBtn = document.getElementById("remove-all");

// Adding event listener to add note button
addNoteBtn.addEventListener("click", () => {
  // Create input elements and submit button on click:
  const parentButtons = document.querySelector(".parent-buttons");
  const input = `<form class="formInputs"><div class="ui input mini input-note">
  <input type="text" class="input-title" placeholder="Note Title...">
</div> <div class="ui mini input input-note">
<input type="text" class="bodyInput" placeholder="Note Body...">
</div>  <button class="ui button" type="submit">Submit</button></form>`;
  let inputElement = document.querySelector(".input-note");
  if (!inputElement) {
    parentButtons.insertAdjacentHTML("afterend", input);
    // Creating submit inputs function:
    let formElement = document.querySelector(".formInputs");
    console.log(formElement);
    formElement.addEventListener("submit", e => {
      e.preventDefault();
      let titleInput = document.querySelector(".input-title");
      console.log(titleInput.value);
      let bodyInput = document.querySelector(".input-title");
      console.log(bodyInput.value);
      let newObject = new newNote(titleInput.value, bodyInput.value);
      deleteNotesDOM();
      notes.push(newObject);
      renderNotes(notes, filters);
      console.log(notes);
    });
  }
});

// Adding event listener to remove all notes button
removeAllNotesBtn.addEventListener("click", () => {
  // Calling function for deleting elements from UI:
  deleteNotesDOM();
  // Calling function for deleting elements from data:
  deleteNotesData();
});

// Adding event listener on search/filter button
const filterNotes = document.querySelector(".filter");
const filterNotesEvent = () => {
  filterNotes.addEventListener("input", e => {
    deleteNotesDOM();
    filters.searchText = e.target.value;
    let filteredNotes = notes.filter(note => {
      return (
        note.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        note.body.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    });
    renderNotes(filteredNotes, filters);
  });
};
filterNotesEvent();
