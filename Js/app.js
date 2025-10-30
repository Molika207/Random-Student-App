const studentInput = document.getElementById("studentName");
const addBtn = document.getElementById("addBtn");
const pickBtn = document.getElementById("pickBtn");
const clearBtn = document.getElementById("clearBtn");
const excelFile = document.getElementById("excelFile");
const studentList = document.getElementById("studentList");
const result = document.getElementById("result");
const groupOptions = document.getElementById("groupOptions");
const groupSizeInput = document.getElementById("groupSize");
const modeRadios = document.querySelectorAll('input[name="mode"]');

let students = [];

// Mode toggle
modeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    groupOptions.style.display = radio.value === "group" ? "block" : "none";
  });
});

// Add manually
addBtn.onclick = () => {
  const name = studentInput.value.trim();
  if (name && !students.includes(name)) {
    students.push(name);
    updateList();
    studentInput.value = "";
  }
};

// Update student list
function updateList() {
  studentList.innerHTML = "";
  students.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = s;
    li.onclick = () => {
      students.splice(i, 1);
      updateList();
    };
    studentList.appendChild(li);
  });
}

// Shuffle helper
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

// Pick / group logic
pickBtn.onclick = () => {
  result.innerHTML = "";
  if (students.length === 0) {
    result.textContent = "⚠️ No students added!";
    return;
  }

  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (mode === "single") {
    const randomIndex = Math.floor(Math.random() * students.length);
    const chosen = students[randomIndex];
    result.innerHTML = `<p>🎉 Selected: <strong>${chosen}</strong></p>`;
  } else {
    const size = parseInt(groupSizeInput.value);
    if (isNaN(size) || size < 2) {
      result.textContent = "⚠️ Invalid group size!";
      return;
    }

    const shuffled = shuffle([...students]);
    let groups = [];
    for (let i = 0; i < shuffled.length; i += size) {
      groups.push(shuffled.slice(i, i + size));
    }

    result.innerHTML = "<h3>👥 Groups:</h3>";
    groups.forEach((g, i) => {
      result.innerHTML += `<p><strong>Group ${i + 1}:</strong> ${g.join(", ")}</p>`;
    });
  }
};

// Clear all
clearBtn.onclick = () => {
  students = [];
  updateList();
  result.innerHTML = "";
};

// 📂 Import Excel file
excelFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Flatten and clean names
    const names = rows.flat().map(n => String(n).trim()).filter(n => n);
    names.forEach(name => {
      if (!students.includes(name)) students.push(name);
    });

    updateList();
  };
  reader.readAsArrayBuffer(file);
});
