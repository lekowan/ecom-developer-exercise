# Space NK developer exercise

In this exercise we would like you to build a recommendations carousel component. The carousel should look similar to this [screenshot](images/recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The carousel component you build should display the product title, image, brand name, price and should link to the website product detail pages. Creativity is accepted but do not alter the JSON provided and please refrain from using any JavaScript libraries or frameworks.

### Requirements

- Responsive
- Clean, reusable code

## Installation

Clone the repository (if reviewing outside of the PR):

```bash
git clone https://github.com/lekowan/ecom-developer-exercise.git
cd ecom-developer-exercise
```

Checkout the branch:

```bash
git checkout feature/carousel
```

## Running the project locally

### Desktop

Since we use `fetch` to load a local JSON file, we need to run a static server to avoid CORS errors that occur when opening files directly in the browser (via `file://`).

Run npx serve (requires node.js and npm)

```bash
 npx serve
```

Open your browser locally at:
http://localhost:3000

### Mobile

- For mobile testing, make sure your desktop and mobile device are on the same Wi-Fi network.
- When you run `npx serve`, it will give you a network address like:
  http://192.168.0.18:3000/
  Open this URL in your desktop browser, then open the same URL in your mobile browser to test on your phone.

## Features

### Navigation arrows

The carousel includes arrows to navigate between frames. Those svg icons were downloaded from the SpaceNK site.

After the JSON data has loaded, the left arrow is faded out (`opacity: 0.2`) and the right arrow fades in (`opacity: 1`) as per the carousels on the spaceNK site. When navigating, the arrow fades in. When the end of the carousel is reached, the right arrow fades out.

Clicking an arrow scrolls the carousel by one product at a time, rather than jumping to a whole new set, as observed on the SpaceNK site.

The carousel also handles edge cases when there are 3 or fewer products:

- If there is only 1 product, the navigation arrows are hidden on all viewports.
- If there are only 2 or 3 products, the navigation arrows are hidden on tablet and desktop viewports only.

### Scrolling

While the arrows enable navigation, the carousel also supports horizontal scrolling via touch gestures and trackpad or Magic Mouse swipes. This makes the experience feel more natural on mobile, tablet, and modern desktop devices.

### Hover

Product text is underlined on hover, consistent with the behavior of the live carousels.

### Clicking / tapping through to product

As observed on the Space NK carousels, clicking or tapping product titles redirects to the respective product pages.

### Data validation

The JSON data is validated before products are rendered. For a product to be displayed, it must meet the following criteria:

- a valid URL, ending with .html
- a valid image ending with an image extension
- a valid title that includes an hyphen that separates brand name and product name
- a valid price

An `excludedProducts` array is also used to manually filter out specific products. In the current dataset case, one product was excluded due to a faulty image that displays unwanted text next to the product photo.

In total, 4 products from the JSON dataset are not being rendered (one missing price, one incorrect title, one incorrect image URL and one faulty image).

### Slow loading

If the product data takes too long to load, a loading message is displayed while the navigation arrows remain hidden. This is to inform the user that content is being retrieved.

This behaviour can be tested by adding a 2 second delay right before the `fetch` call:

`await new Promise(resolve => setTimeout(resolve, 2000));`

### Error handling

If there are no products to display, or if an error occurs while loading the JSON data, the carousel is gracefully hidden using `display: none`, ensuring it doesn't interfere with the existing in-situ layout.

## Layout

A 3-column layout was used on tablet and desktop to match the visual reference provided in the brief. I noticed that your current site often uses a 4-column layout, but chose to stay close to the brief to avoid overstepping expectations.

The styling of the text follows the current site’s visual style, as I assumed this would be a reasonable and intentional way to show alignment with your brand while still respecting the exercise guidelines.

### Mobile

A mobile-first approach was used, starting with a single-column layout.
The image fills up the space (100% width).

### Tablet

At 750px and above, the layout transitions to two columns.

### Desktop

At 810px, the layout becomes three columns.

As seen on some of the live site carousels, the container has a max-width of 980px, which increases to 1320px at the 1440px breakpoint.

The image widths are fixed at 150px to stay close to the provided visual reference, although I noticed they behave slightly differently on the live site.

### Visual reference

https://www.spacenk.com/uk/fragrance/home-fragrance/candle/amber-scented-candle-MUK200005973.html

### Font

Font settings (including colors, sizes, and weights) were matched to those used on the Space NK site for consistency.

I downloaded FuturaNow from your site and referenced it in `fonts.css`.

## Accessibility

### Features

To enhance screen reader support, the carousel includes:

- clickable and tab-able product titles, as observed on the live carousels
- `role="region"` on `.carousel-wrapper` to define a landmark region.
- `aria-label="Recommended products carousel"` to provide an accessible name for the carousel.
- `aria-controls="carousel-container"` on navigation buttons to indicate what they affect.
- `tabindex="0"` on the carousel container to make it keyboard-focusable.

### Testing

The carousel was tested on a mobile screen reader using TalkBack (Android).
All carousel elements are correctly announced. The link is read out as a link, and the carousel can be navigated by swiping left or right.

## Tech notes

- Vanilla HTML, CSS, and JavaScript only
- No third-party libraries or frameworks used
- Fully self-contained – no external dependencies beyond npx serve for previewing

## Possible Improvements

**Testing**: While libraries and frameworks were not permitted in this exercise, adding unit tests (using JEST for example) could help verify logic for edge cases and error handling. For example, tests could cover fallback behavior when fewer than 3 products are available or when data loading fails or data loads slowly. Responsive behavior could be further verified with end-to-end tests using tools like Cypress or Playwright.
