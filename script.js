let students = [];
let selectedRow = null;

const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  const email = document.getElementById('email').value.trim();

  if (selectedRow) {
    // Update existing student
    selectedRow.cells[0].innerText = name;
    selectedRow.cells[1].innerText = roll;
    selectedRow.cells[2].innerText = email;
    selectedRow = null;
  } else {
    // Add new student
    addStudent({ name, roll, email });
  }

  form.reset();
  renderTable();
});

function addStudent(student) {
  students.push(student);
}

function renderTable() {
  tableBody.innerHTML = '';

  students.forEach((student, index) => {
    const row = tableBody.insertRow();

    row.insertCell(0).innerText = student.name;
    row.insertCell(1).innerText = student.roll;
    row.insertCell(2).innerText = student.email;

    // Actions
    const actionsCell = row.insertCell(3);
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.className = 'action-btn edit-btn';
    editBtn.onclick = () => editStudent(row);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.onclick = () => deleteStudent(row);

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
  });
}

function editStudent(row) {
  selectedRow = row;
  document.getElementById('name').value = row.cells[0].innerText;
  document.getElementById('roll').value = row.cells[1].innerText;
  document.getElementById('email').value = row.cells[2].innerText;
}

function deleteStudent(row) {
  const index = row.rowIndex - 1; // Adjust for header row
  students.splice(index, 1);
  renderTable();
}
