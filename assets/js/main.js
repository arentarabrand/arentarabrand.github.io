// Load komponen HTML
function loadComponent(id, path) {
  return fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

// Load semua komponen
document.addEventListener("DOMContentLoaded", async () => {
  // Load komponen secara async biar nunggu semua selesai
  await loadComponent("header", "components/header.html");
  await loadComponent("hero", "components/hero.html");
  await loadComponent("footer", "components/footer.html");

  // Apply bahasa setelah semua komponen masuk
  if (typeof applyLang === "function") applyLang();

  // Load preview produk
  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("product-card-container");
      products.slice(0, 3).forEach(product => {
        const card = `
          <div class="product-card">
            <img src="assets/img/products/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
        `;
        container.innerHTML += card;
      });
    });
});
