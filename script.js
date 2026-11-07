let inp = document.getElementById("todocon");
let btn = document.getElementById("add-btn");
let entr = document.getElementById("entries");

let storedentries = localStorage.getItem("entries");
let entries = [];

if (storedentries !== null) {
    entries = JSON.parse(storedentries);
}

btn.addEventListener("click", function() {
    if (inp.value.trim() === "") {
        alert("Please enter valid text");
    }
    else {
        entries.push(inp.value);
        displayentries();
        inp.value = "";
        localStorage.setItem("entries", JSON.stringify(entries));
    }
});

function displayentries() {
    entr.innerHTML = "";

    for (let i = 0; i < entries.length; i++) {
        entr.innerHTML += `
            <div class="whole">
                <p>${entries[i]}</p>
                <div class="bns">
                    <button class="del-btn" data-index="${i}">Delete</button>
                    <button class="upd-btn" data-index="${i}">Update</button>
                </div>
            </div>
        `;
    }}

entr.addEventListener("click", function(event) {
    if (event.target.classList.contains("del-btn")) {
        let index = event.target.getAttribute("data-index");
        entries.splice(index, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        displayentries();
    }
    else if (event.target.classList.contains("upd-btn")) {
        let index = event.target.getAttribute("data-index");
        let updatedentry = prompt("Enter updated task:", entries[index]);
        if (updatedentry !== null && updatedentry.trim() !== "") {
            entries[index] = updatedentry;
            localStorage.setItem("entries", JSON.stringify(entries));
            displayentries();
        }
    }
});
displayentries();