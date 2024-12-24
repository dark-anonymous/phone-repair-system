// Fungsi untuk navigasi antar halaman
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

// Fungsi untuk menyimpan data ke Local Storage
function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Fungsi untuk mengambil data dari Local Storage
function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Fungsi untuk menangani penambahan repair
function handleAddRepair(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerContact = document.getElementById('customer-contact').value;
    const phoneModel = document.getElementById('phone-model').value;
    const repairType = document.getElementById('repair-type').value;
    const repairPrice = parseFloat(document.getElementById('repair-price').value);
    const paymentMethod = document.getElementById('payment-method').value;

    const repairData = getDataFromLocalStorage('repairData');
    repairData.push({ customerName, customerContact, phoneModel, repairType, repairPrice, paymentMethod });

    saveDataToLocalStorage('repairData', repairData);
    updateRepairHistoryTable();
    alert('Repair added successfully!');

    // Reset form input
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-contact').value = '';
    document.getElementById('phone-model').value = '';
    document.getElementById('repair-type').value = '';
    document.getElementById('repair-price').value = '';
    document.getElementById('payment-method').value = 'Cash';
}

// Fungsi untuk memperbarui tabel Repair History
function updateRepairHistoryTable() {
    const repairData = getDataFromLocalStorage('repairData');
    const tableBody = document.querySelector('#repair-history-table tbody');
    const totalEarnings = repairData.reduce((sum, repair) => sum + repair.repairPrice, 0);
    document.getElementById('earnings').textContent = totalEarnings.toFixed(2);

    tableBody.innerHTML = '';
    repairData.forEach((repair, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${repair.customerName}</td>
            <td>${repair.phoneModel}</td>
            <td>${repair.repairType}</td>
            <td>RM ${repair.repairPrice.toFixed(2)}</td>
            <td>${repair.paymentMethod}</td>
            <td>
                <button class="edit-btn" onclick="editRepair(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRepair(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk mengedit data repair
function editRepair(index) {
    const repairData = getDataFromLocalStorage('repairData');
    const repair = repairData[index];

    // Isi data ke form Add Repair
    document.getElementById('customer-name').value = repair.customerName;
    document.getElementById('customer-contact').value = repair.customerContact;
    document.getElementById('phone-model').value = repair.phoneModel;
    document.getElementById('repair-type').value = repair.repairType;
    document.getElementById('repair-price').value = repair.repairPrice;
    document.getElementById('payment-method').value = repair.paymentMethod;

    // Hapus data lama
    deleteRepair(index);

    // Arahkan ke halaman Add Repair
    showPage('repair-form');
}

// Fungsi untuk menghapus data repair
function deleteRepair(index) {
    const repairData = getDataFromLocalStorage('repairData');
    repairData.splice(index, 1); // Hapus data berdasarkan index
    saveDataToLocalStorage('repairData', repairData);
    updateRepairHistoryTable();
    alert('Repair deleted successfully.');
}

// Inisialisasi halaman dan data saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    showPage('repair-form');
    updateRepairHistoryTable();
});
row.innerHTML = `
    <td>${repair.customerName}</td>
    <td>${repair.phoneModel}</td>
    <td>${repair.repairType}</td>
    <td>RM ${repair.repairPrice.toFixed(2)}</td>
    <td>${repair.paymentMethod}</td>
    <td>
        <button class="edit-btn" onclick="editRepair(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button class="delete-btn" onclick="deleteRepair(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
    </td>
`;
