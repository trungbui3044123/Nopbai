// lay data va luu vao storage

// lay ra cac value co dinh o bai tap
const usersStorage = JSON.parse(localStorage.getItem("usersStorage")) || [];
const tbody = document.getElementById("data");
const username = document.getElementById("username");
const email = document.getElementById("email");
const role = document.getElementById("role");

function showListUser() {

    let html = "";
    usersStorage.forEach(user => {
        html += `
    <tr data-id=${user.id }>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.role}</td>
    <td><button>Edit</button></td>
    <td><button>Delete</button></td>
    </tr>
    `;

    });
    tbody.innerHTML = html;
}
showListUser();
// validate function
function validateInput(userObject) {
    if (usersStorage.some(user => user.username === userObject.username)) {
        throw new Error("Trùng mẹ nó tên rồi loz");
    }
    if (usersStorage.some(user => user.email === userObject.email)) {
        throw new Error("Trùng mẹ nó email rồi loz");
    }
    if (userObject.email == "" || userObject.username == "" || userObject.role == "") {
        throw new Error("Không đc để trống");
    }
}
// addfunction
export function addUser(event) {
    event.preventDefault();
    // bat dc event input lam o html, chi export addUser thoi
    //  lay dc value, && cho no vao object moi 
    let newName = username.value.trim();
    let newEmail = email.value.trim();
    let newRole = role.value;

    try {
        const newUser = {
            id: usersStorage.length,
            username: newName,
            email: newEmail,
            role: newRole
        }
        // validate input    
        validateInput(newUser);
        // push vao mang storage
        usersStorage.push(newUser)
        // luu mang moi
        localStorage.setItem("usersStorage", JSON.stringify(usersStorage));
        //show lai data , reset form(submit la auto roi)
        showListUser()
    }
    catch (e) {
        alert(e.message);
    }

}

// edit,delete
export function edit_delete(event) {
    // event dc add vao tbody, bat dc event click vao node nao dung btn hayko
    // bat dc su kien khi click, bat vao dau, bat dau tu cai node ma co dinh o html, roi toi cac node dong

    const targetEvent = event.target;
    if (targetEvent.tagName === "BUTTON") { //tagName,nodeName luon tra ve upper nen la phai so sanh BUTTON
        // lay ra cai row chiu event de su dung
        const eventRow = targetEvent.closest("tr");
        const targetIndex = Number(eventRow.dataset.id) || 0;
        let eventCellName = eventRow.cells[0];
        let eventCellEmail = eventRow.cells[1];
        let eventCellRole = eventRow.cells[2];
        // ktra xem btn do la edit hay delete
        if (targetEvent.innerHTML === "Edit") {
            // cho input khi edit . Doi cells tu td sang td co input text
            targetEvent.innerHTML = "Save";
            eventCellName.innerHTML = '<td ><input type="text" placeholder="New Name" style="width: 90%;"></td>';
            eventCellEmail.innerHTML = '<td ><input type="text" placeholder="New email" style="width: 90%;"></td>';
            eventCellRole.innerHTML =
                '<td><select id="role" name="role"><option value="Admin">Admin</option><option value="Member">Member</option></select></td>';

        }

        else if (targetEvent.innerHTML === "Save") {
            targetEvent.innerHTML = "Edit";
            const editName = eventCellName.querySelector("Input").value.trim() || "";
            const editMail = eventCellEmail.querySelector("Input").value.trim() || "";
            const editRole = eventCellRole.querySelector("Select").value || "";
            try {

                // doi lai ve dang td
                eventCellName.innerHTML = `<td>${editName}</td>`;
                eventCellEmail.innerHTML = `<td>${editMail}</td>`;
                eventCellRole.innerHTML = `<td>${editRole}</td>`;

                const editObject = {
                    id: targetIndex,
                    username: editName,
                    email: editMail,
                    role: editRole,
                }
                // validate input
                validateInput(editObject);
                // push vao mang storage
                usersStorage.push(editObject);
                // luu mang moi
                localStorage.setItem("usersStorage", JSON.stringify(usersStorage));

                console.log(editObject);

            } catch (e) {
                alert(e.message);
            }

        }

        else if (targetEvent.innerHTML === "Delete") {
// delete from UI
            eventRow.remove();
// deleve from DB
            if(targetIndex){
            usersStorage.splice(targetIndex,1);
            localStorage.setItem("usersStorage", JSON.stringify(usersStorage));
            console.log(usersStorage);    
            }     
        }

    }

    // cho input khi edit, xoa row khi delete
    // edit thi luu data moi
    // bo input  di    
}


fetch("/resource/users/user.json")
    .then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error("Xem lai api");
        }
    })
    .then(rawdata => {

        localStorage.setItem("usersStorage", JSON.stringify(rawdata));

    })
    .catch((e) => alert(e.message));
