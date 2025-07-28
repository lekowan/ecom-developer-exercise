const wrapper = document.querySelector(".carousel-wrapper");
const container = document.querySelector(".carousel-container");
const loader = document.getElementById("carousel-loader");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Helper function to check if a filename is an image
function isImageFile(filename) {
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
}

// Helper function to check if a string is a full title
// This assumes brand and product title are always separated by a hyphen
// and brand does not contain an hyphen
function isFullTitle(title) {
  return title && title.includes("-");
}

// Helper function to check if a url includes .html
function hasHtmlExtension(url) {
  return url && url.includes(".html");
}

// Helper function to check if a price is valid
function isValidPrice(price) {
  const num = Number(price);
  return !isNaN(num) && num > 0;
}

// Products to be excluded
// In this case, the product image has a visual fault so needs removing
const excludedProducts = ["Oskia - Renaissance Cleansing Gel"];

// Helper function to check if a product is valid
// To be valid, a product should include all 4 key/value pairs
// All values should be valid
// The product title should not be in the excluded products list
function isValidProduct(product) {
  return (
    hasHtmlExtension(product.productUrl) &&
    isFullTitle(product.productTitle) &&
    isImageFile(product.imageSrc) &&
    isValidPrice(product.price) &&
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
      <img src="${product.imageSrc}" alt="${
      product.productTitle
    }" loading="lazy" class="loading" />
      <p class='product-brand'>${brand}</p>
      <a href="${product.productUrl}" target="_blank">
        <p class='product-title'>${productTitle}</p>
      </a>
      <p class="product-price">${`£${product.price}`}</p>
    `;

    // This is to prevent the alt text from showing in the image while it loads
    const img = card.querySelector("img");
    img.onload = () => img.classList.remove("loading");
    container.appendChild(card);
  });
}

async function initCarousel() {
  try {
    // Fetch the JSON data
    const response = await fetch("./data/recommendations.json");
    const data = await response.json();
    const totalProducts = data.productData.length;

    // If there are no products to display, hide the carousel and exit
    if (totalProducts === 0) {
      wrapper.style.display = "none";
      return;
    }

    // Fade out left button on load
    prevBtn.style.opacity = "0.2";

    // Fade in right button on load
    nextBtn.style.opacity = "1";

    // Render the product cards
    renderCards(data.productData);

    // Hide the loader and show the carousel
    loader.hidden = true;
    container.hidden = false;

    const productCard = document.querySelector(".product-card");
    const productCardWidth = productCard?.clientWidth || container.clientWidth;

    // This function handles edge cases where number of products < 3
    // Show/hide buttons based on viewport and product count
    function updateButtonVisibility() {
      const isMobile = window.matchMedia("(max-width: 749px)").matches;

      if (totalProducts === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else if (!isMobile && totalProducts <= 3) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "";
        nextBtn.style.display = "";
      }
    }

    // Run the function on initial load
    updateButtonVisibility();

    // Fade out the buttons as required
    function updateButtonOpacity() {
      // If scrolled all the way to the left, fade left button
      if (container.scrollLeft <= 0) {
        prevBtn.style.opacity = "0.2";
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
        nextBtn.style.opacity = "0.2";
        nextBtn.disabled = true;
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.disabled = false;
      }
    }

    // Scrolling functions
    // Scrolling distance equals the width of a product card
    function scrollNext() {
      container.scrollBy({ left: productCardWidth, behavior: "smooth" });
    }

    function scrollPrev() {
      container.scrollBy({ left: -productCardWidth, behavior: "smooth" });
    }

    // Add event listeners
    prevBtn.addEventListener("click", scrollPrev);
    nextBtn.addEventListener("click", scrollNext);

    // Update button visibility on scroll and window resize
    container.addEventListener("scroll", updateButtonOpacity);
    window.addEventListener("resize", updateButtonVisibility);
  } catch (error) {
    console.error("Failed to load products. Hiding carousel", error);
    wrapper.style.display = "none";
  }
}

initCarousel();
