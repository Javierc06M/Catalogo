const phones = [
    { id: 1, name: "Galaxy S21", brand: "Samsung", gama: "Alta", price: 799, screenSize: 6.2, image: "img/s21.webp" },
    { id: 2, name: "iPhone 13", brand: "Apple", gama: "Premium", price: 999, screenSize: 6.1, image: "img/iphone 13.webp" },
    { id: 3, name: "Redmi Note 10", brand: "Xiaomi", gama: "Media", price: 199, screenSize: 6.43, image: "img/redmin10.webp" },
    { id: 4, name: "P40 Lite", brand: "Huawei", gama: "Media", price: 299, screenSize: 6.4, image: "img/p40.webp" },
    { id: 5, name: "OnePlus Nord", brand: "OnePlus", gama: "Alta", price: 399, screenSize: 6.44, image: "img/oneplus.jpeg" },
    { id: 6, name: "Galaxy A52", brand: "Samsung", gama: "Media", price: 349, screenSize: 6.5, image: "img/a52.jpg" },
    { id: 7, name: "iPhone SE", brand: "Apple", gama: "Media", price: 399, screenSize: 4.7, image: "img/iphone se.jpeg" },
    { id: 8, name: "Mi 11", brand: "Xiaomi", gama: "Alta", price: 749, screenSize: 6.81,  image: "img/mi11.jpeg" },
    { id: 9, name: "Galaxi S24 Ultra", brand: "Samsung", gama: "Premium", price: 1000, screenSize: "6.8", image: "img/s24.jpg" }
];

const phoneGrid = document.getElementById('phone-grid');
const searchInput = document.getElementById('search-input');
const brandSelect = document.getElementById('brand-select');
const gamaSelect = document.getElementById('gama-select');
const priceRange = document.getElementById('price-range');
const priceDisplay = document.getElementById('price-display');
const screenSizeRange = document.getElementById('screen-size-range');
const screenSizeDisplay = document.getElementById('screen-size-display');

// Elementos del modal
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
const modalTitle = document.getElementById('imageModalLabel');
const modalImg = document.getElementById('expandedImage');

function filterPhones() {
    const searchTerms = searchInput.value.toLowerCase().split(' ');
    const selectedBrand = brandSelect.value;
    const selectedGama = gamaSelect.value;
    const maxPrice = parseInt(priceRange.value);
    const maxScreenSize = parseFloat(screenSizeRange.value);

    const filteredPhones = phones.filter(phone => {
        const searchMatch = searchTerms.every(term => 
            phone.name.toLowerCase().includes(term) ||
            phone.brand.toLowerCase().includes(term) ||
            phone.gama.toLowerCase().includes(term) ||
            phone.price.toString().includes(term) ||
            phone.screenSize.toString().includes(term)
        );

        return searchMatch &&
            (selectedBrand === '' || phone.brand === selectedBrand) &&
            (selectedGama === '' || phone.gama === selectedGama) &&
            phone.price <= maxPrice &&
            phone.screenSize <= maxScreenSize;
    });

    displayPhones(filteredPhones);
}

function displayPhones(phonesToShow) {
    phoneGrid.innerHTML = '';
    if (phonesToShow.length === 0) {
        phoneGrid.innerHTML = '<div class="col-12"><p class="no-results">No se encontraron teléfonos que coincidan con los criterios de búsqueda.</p></div>';
        return;
    }
    phonesToShow.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('col', 'phone-card');
        phoneCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${phone.image}" class="card-img-top phone-image" alt="${phone.name}" onclick="expandImage('${phone.image}', '${phone.name}')">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${phone.name}</h5>
                    <p class="card-text">
                        <strong>Marca:</strong> ${phone.brand}<br>
                        <strong>Gama:</strong> ${phone.gama}<br>
                        <strong>Tamaño de pantalla:</strong> ${phone.screenSize}"
                    </p>
                    <p class="phone-price mt-auto mb-2">$${phone.price}</p>
                    <button class="btn btn-primary w-100">Ver detalles</button>
                </div>
            </div>
        `;
        phoneGrid.appendChild(phoneCard);
    });
}

function expandImage(imgSrc, imgAlt) {
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    modalTitle.textContent = imgAlt;
    imageModal.show();
}

function updatePriceDisplay() {
    priceDisplay.textContent = `$${priceRange.value}`;
}

function updateScreenSizeDisplay() {
    screenSizeDisplay.textContent = `${screenSizeRange.value}"`;
}

searchInput.addEventListener('input', filterPhones);
brandSelect.addEventListener('change', filterPhones);
gamaSelect.addEventListener('change', filterPhones);
priceRange.addEventListener('input', () => {
    updatePriceDisplay();
    filterPhones();
});
screenSizeRange.addEventListener('input', () => {
    updateScreenSizeDisplay();
    filterPhones();
});

// Inicialización
updatePriceDisplay();
updateScreenSizeDisplay();
displayPhones(phones);