const container = document.querySelector(".carousel-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Fade out left button on load
prevBtn.style.opacity = "0.5";

// Helper function to check if a filename is an image
function isImageFile(filename) {
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
}

// Helper function to check if a string is a full title
function isFullTitle(title) {
  return title && title.includes("-");
}

// Helper function to check if a url ends with .html
function hasHtmlExtension(url) {
  return url && url.endsWith("html");
}

// Products to be excluded
// In this case, the product image has a visual fault so needs removing
const excludedProducts = ["Oskia - Renaissance Cleansing Gel"];

// Helper function to check if a product is valid
// To be valid, a product should include all 4 key/value pairs
// All values should be valid
function isValidProduct(product) {
  return (
    hasHtmlExtension(product.productUrl) &&
    isFullTitle(product.productTitle) &&
    isImageFile(product.imageSrc) &&
    product.price &&
    !excludedProducts.includes(product.productTitle)
  );
}

function renderCards(productData) {
  // Filter out any invalid items
  // Loop through the array and add product cards to the DOM
  productData.filter(isValidProduct).forEach((product) => {
    const fullTitle = product.productTitle;
    const brand = fullTitle.split("-")[0];
    const productTitle = fullTitle.split("-")[1];
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="${product.productUrl}" target="_blank">
        <img src="${product.imageSrc}" alt="${product.productTitle}" />
        <p class='product-brand'>${brand}</p>
        <p class='product-title'>${productTitle}</p>
      </a>
      <p class="product-price">${`£${product.price}`}</p>

    `;
    container.appendChild(card);
  });
}

async function initCarousel() {
  try {
    // Fetch the JSON data
    const response = await fetch("./data/recommendations.json");
    const data = await response.json();

    // Render the product cards
    renderCards(data.productData);

    const productCard = document.querySelector(".product-card");
    const productCardWidth = productCard?.clientWidth || container.clientWidth;

    // Fade out the buttons as required
    function updateButtons() {
      // If scrolled all the way to the left, fade left button
      if (container.scrollLeft <= 0) {
        prevBtn.style.opacity = "0.5";
        prevBtn.disabled = true;
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.disabled = false;
      }

      // If scrolled all the way to the right, fade right button
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        nextBtn.style.opacity = "0.5";
        nextBtn.disabled = true;
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.disabled = false;
      }
    }

    // Srolling functions
    // Scrolling distance === 1x productCardWidth
    function scrollNext() {
      container.scrollBy({ left: productCardWidth, behavior: "smooth" });
    }

    function scrollPrev() {
      container.scrollBy({ left: -productCardWidth, behavior: "smooth" });
    }

    // Add event listeners
    prevBtn.addEventListener("click", scrollPrev);
    nextBtn.addEventListener("click", scrollNext);
    container.addEventListener("scroll", updateButtons);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

initCarousel();
