// Data Galeri Foto
const galleryData = [
  {
    id: 1,
    title: "Momen Santai",
    category: "memories",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Pemandangan indah waktu liburan bersama."
  },
  {
    id: 2,
    title: "Kopi & Suasana Malam",
    category: "moments",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    description: "Nongkrong santai menikmati secangkir kopi malam."
  },
  {
    id: 3,
    title: "Pertualangan Alam",
    category: "favorites",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    description: "Jalan-jalan menikmati hawa sejuk pegunungan."
  },
  {
    id: 4,
    title: "Sudut Kota",
    category: "memories",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    description: "Cahaya lampu kota di malam hari yang memukau."
  },
  {
    id: 5,
    title: "Sunset di Pantai",
    category: "moments",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Menikmati indahnya senja di tepi laut."
  },
  {
    id: 6,
    title: "Koleksi Favorit",
    category: "favorites",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    description: "Langit malam penuh bintang yang sangat tenang."
  }
];


let filteredData = [...galleryData];
let currentIndex = 0;


// Render Galeri
function renderGallery(data) {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";


  if (data.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-500">
        <p class="text-lg">Tidak ada foto ditemukan di kategori ini.</p>
      </div>
    `;
    return;
  }


  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card group relative overflow-hidden rounded-2xl bg-brand-cardBg border border-slate-800 cursor-pointer shadow-lg";
    card.onclick = () => openLightbox(index);


    card.innerHTML = `
      <div class="aspect-w-16 aspect-h-12 w-full overflow-hidden bg-slate-900">
        <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500 ease-out" loading="lazy" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
      <div class="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
        <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider mb-2">
          ${item.category}
        </span>
        <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">${item.title}</h3>
        <p class="text-slate-400 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">${item.description}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}


// Filter Tab Manager
document.getElementById("filterContainer").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;


  document.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.remove("active-filter");
    b.classList.add("inactive-filter");
  });


  btn.classList.remove("inactive-filter");
  btn.classList.add("active-filter");


  const filter = btn.dataset.filter;
  if (filter === "all") {
    filteredData = [...galleryData];
  } else {
    filteredData = galleryData.filter(item => item.category === filter);
  }
  renderGallery(filteredData);
});


// Lightbox Logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");


function openLightbox(index) {
  currentIndex = index;
  updateLightboxContent();
  lightbox.classList.remove("hidden");
  setTimeout(() => lightbox.classList.remove("opacity-0"), 10);
}


function closeLightbox() {
  lightbox.classList.add("opacity-0");
  setTimeout(() => lightbox.classList.add("hidden"), 300);
}


function updateLightboxContent() {
  const item = filteredData[currentIndex];
  if (!item) return;
  lightboxImg.src = item.imageUrl;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description;
}


document.getElementById("closeLightbox").addEventListener("click", closeLightbox);


document.getElementById("prevBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
  updateLightboxContent();
});


document.getElementById("nextBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % filteredData.length;
  updateLightboxContent();
});


// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.getElementById("prevBtn").click();
  if (e.key === "ArrowRight") document.getElementById("nextBtn").click();
});


// Surprise Confetti Button
document.getElementById("surpriseBtn").addEventListener("click", () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
});


// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderGallery(galleryData);
  lucide.createIcons();
});
