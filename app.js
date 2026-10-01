const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const button = document.getElementById("btn");
const totalTugas = document.getElementById("total-tugas");
const selesai = document.getElementById("selesai");
const belumSelesai = document.getElementById("belum-selesai");

function updateStatus() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");

    const total = allTasks.length;
    const completed = completedTasks.length;
    const uncompleted = total - completed;

    totalTugas.textContent = total;
    selesai.textContent = completed;
    belumSelesai.textContent = uncompleted;
}
button.onclick = function(){
    if(inputBox.value === ''){
        alert("Kamu harus menuliskan sesuatu!");
    } else{
        let li = document.createElement("li"); //membuat list baru dengan tag <li>
        li.innerHTML = inputBox.value; //mengisi <li>
        listContainer.appendChild(li); //memasukkan content to do list ke dalam listContainer
        let span = document.createElement("span"); //membuat span untuk menghapus catatan
        span.innerHTML = "\u00d7"; //span diisi dengan karakter x (source youtube)
        li.appendChild(span); //memasukkan x ke dalam <li> 

    }
    inputBox.value = ""; //mengosongkan inputBox jika catatan berhasil di input
    saveData(); //menyimpan data 
    updateStatus();
}

listContainer.addEventListener('click', function(e) { 
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked"); //memeriksan catatan apakah sudah di checked atau belum 
        saveData(); 
        updateStatus();

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); //untuk menghapus catatan 
        saveData();
        updateStatus();
    }
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML); //untuk menyimpan catatan ke dalam browser
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data"); //mengambil dan menampilkan catatan yang pernah disimpan
    updateStatus(); 
}

showTask(); //menampilkan catatan saat halaman dibuka 