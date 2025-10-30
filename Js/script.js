const API_URL = "http://localhost:3000";
let students = [];

function addStudents() {
  const input = document.getElementById("studentInput").value.trim();
  if (!input) return alert("Please enter some names first!");
  
  students = input.split("\n").filter(name => name.trim() !== "");
  document.getElementById("studentList").innerHTML = students.map(s => `<li>${s}</li>`).join("");
  document.getElementById("result").innerText = "Students added!";
}

function pickRandom() {
  if (students.length === 0) {
    document.getElementById("result").innerText = "No students left!";
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * students.length);
  const chosen = students[randomIndex];

  // Show result
  document.getElementById("result").innerHTML = `🎉 Picked: <b>${chosen}</b>`;

  // Remove picked student from list
  students.splice(randomIndex, 1);

  // Update displayed list
  document.getElementById("studentList").innerHTML = students.map(s => `<li>${s}</li>`).join("");
}

function resetList() {
  students = [];
  document.getElementById("studentInput").value = "";
  document.getElementById("studentList").innerHTML = "";
  document.getElementById("result").innerText = "List reset!";
}
// Handle radio change
document.querySelectorAll('input[name="dist"]').forEach(radio => {
  radio.addEventListener('change', () => {
    console.log("Distribute based on:", radio.value);
    alert(`You selected: ${radio.value}`);
  });
});

document.getElementById('spinner').style.display='block'

<script>
 {/* Simple Team Picker JS  */}
const nameInput = document.getElementById('nameInput');
const addBtn = document.getElementById('addBtn');
const inputList = document.getElementById('inputList');
const fileInput = document.getElementById('fileInput');
const pasteBtn = document.getElementById('pasteBtn');
const clearInputsBtn = document.getElementById('clearInputsBtn');

{/* // === Replace the old line with this one === */}
let names = []; // array of {id, name, gender, label}

let teams = []; // array of arrays

teams.forEach(group => {
  if (group.length === 0) return;
  const repIndex = Math.floor(Math.random()*group.length);
  group[repIndex].isRep = true;
});


