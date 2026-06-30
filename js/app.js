const menuGrid = document.getElementById("menuTableBody");
const imageStack = document.getElementById("imageStack");
const totalCaloriesElem = document.getElementById("totalCalories");
const totalPriceElem = document.getElementById("totalPrice");
const balancedBadge = document.getElementById("balancedBadge");

// Definisi elemen checklist gizi berdasarkan ID di HTML
const giziElems = {
    "Makanan Pokok": document.getElementById("cat-pokok"),
    "Lauk-Pauk": document.getElementById("cat-lauk"),
    "Sayur": document.getElementById("cat-sayur"),
    "Buah": document.getElementById("cat-buah"),
    "Minuman": document.getElementById("cat-minuman")
};

// 1. Fungsi untuk me-render seluruh card makanan ke dashboard
function renderMenu() {
    let menuHTML = "";
    
    menuData.forEach(menu => {
        menuHTML += `
            <div class="menu-card" data-kategori="${menu.kategori}">
                <div class="card-image-wrapper">
                    <img src="${menu.gambar}" alt="${menu.nama}" onerror="this.src='https://placehold.co/300x200?text=Food'">
                </div>
                <div class="card-content">
                    <span class="card-badge">${menu.kategori}</span>
                    <h3>${menu.nama}</h3>
                    <div class="card-details">
                        <span class="detail-kalori">${menu.kalori} kkal</span>
                        <span class="detail-harga">Rp ${menu.harga.toLocaleString('id-ID')}</span>
                    </div>
                    <label class="select-label">
                        <input type="checkbox" class="menu-checkbox" data-id="${menu.id}" onchange="updatePlanner()">
                        <span>Pilih Menu</span>
                    </label>
                </div>
            </div>
        `;
    });
    
    menuGrid.innerHTML = menuHTML;
}

// 2. Fungsi utama untuk update kalkulasi dan gambar secara real-time
function updatePlanner() {
    const checkboxes = document.querySelectorAll(".menu-checkbox");
    let totalCalories = 0;
    let totalPrice = 0;
    
    // Objek untuk melacak kategori apa saja yang sudah dipilih
    let kategoriTerpilih = {
        "Makanan Pokok": false,
        "Lauk-Pauk": false,
        "Sayur": false,
        "Buah": false,
        "Minuman": false
    };
    
    // String untuk menampung gambar dari menu yang dicentang
    let selectedImagesHTML = "";

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const menuId = parseInt(cb.getAttribute("data-id"));
            // Cari data menu yang cocok di menuData
            const menu = menuData.find(m => m.id === menuId);
            
            if (menu) {
                totalCalories += menu.kalori;
                totalPrice += menu.harga;
                kategoriTerpilih[menu.kategori] = true;
                
                // Menggunakan path gambar langsung dari assets yang diatur di data.js
                selectedImagesHTML += `
                    <div class="stacked-image-box" title="${menu.nama}">
                        <img src="${menu.gambar}" alt="${menu.nama}" onerror="this.src='https://placehold.co/50x50?text=Food'">
                    </div>
                `;
            }
        }
    });

    // --- A. UPDATE TAMPILAN GAMBAR (STACK BARU) ---
    if (selectedImagesHTML === "") {
        imageStack.innerHTML = `<p class="empty-state">Belum ada menu dipilih</p>`;
    } else {
        imageStack.innerHTML = selectedImagesHTML;
    }

    // --- B. UPDATE TOTAL KALORI & HARGA ---
    totalCaloriesElem.innerText = `${totalCalories} kkal`;
    totalPriceElem.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    // --- C. UPDATE CHECKLIST KATEGORI GIZI ---
    let semuaKategoriTerpenuhi = true;

    for (const kategori in giziElems) {
        const elem = giziElems[kategori];
        if (kategoriTerpilih[kategori]) {
            // Jika ada minimal 1 menu dicentang di kategori ini
            elem.className = "status-terpenuhi";
            elem.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${kategori}`;
        } else {
            // Jika belum ada yang dicentang
            elem.className = "status-belum";
            elem.innerHTML = `<i class="fa-regular fa-circle"></i> ${kategori}`;
            semuaKategoriTerpenuhi = false; // Ada yang belum diisi
        }
    }

    // --- D. UPDATE BADGE MENU SEIMBANG ---
    if (semuaKategoriTerpenuhi) {
        balancedBadge.classList.remove("d-none");
    } else {
        balancedBadge.classList.add("d-none");
    }
}

// Jalankan cetak menu pertama kali saat file dimuat
renderMenu();