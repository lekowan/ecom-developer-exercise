# Space NK Developer Exercise

In this exercise we would like you to build a recommendations carousel component. The carousel should look similar to this [screenshot](images/recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The carousel component you build should display the product title, image, brand name, price and should link to the website product detail pages. Creativity is accepted but do not alter the JSON provided and please refrain from using any JavaScript libraries or frameworks.

### Requirements

- Responsive
- Clean, reusable code

## Installation

Clone the repository:

```bash
git clone https://github.com/lekowan/ecom-developer-exercise.git
cd ecom-developer-exercise
```

Checkout the branch:

```bash
git checkout feature/carousel
```

## Running the project locally

Since we use `fetch` to load a local JSON file, we need to run a static server to avoid CORS errors that occur when opening files directly in the browser (via `file://`).

Run npx serve (requires node.js and npm)

```bash
 npx serve
```

Open your browser at:
http://localhost:3000

## Features

### Navigation arrows

The carousel includes arrows to navigate between frames. Those svg icons were downloaded from the SpaceNK site.
On load, the left arrow is faded out as per the carousels on the spaceNK site. When navigating, the arrow fades in. When the end of the carousel is reached, the right arrow fades out.

Clicking an arrow scrolls the carousel by one product at a time, rather than jumping to a whole new set, as observed on the SpaceNK site.

### Scrolling

While the arrows enable navigation, the carousel also supports horizontal scrolling via touch gestures and trackpad or Magic Mouse swipes. This makes the experience feel more natural on mobile, tablet, and modern desktop devices.

### Hover

Product text is underlined on hover, consistent with the behavior of the live carousels.

### Data validation

The JSON data is validated before products are rendered. For a product to be displayed, it must meet the following criteria:

- a valid URL, ending with .html
- a valid image ending with an image extension
- a valid title that includes an hyphen that separates brand name and product name
- a valid price

An `excludedProducts` array is also used to manually filter out specific products. In this case, one product was excluded due to a faulty image that displays unwanted text next to the product photo.

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

### Carousel reference

https://www.spacenk.com/uk/fragrance/home-fragrance/candle/amber-scented-candle-MUK200005973.html

### Font

Font settings (including colors, sizes, and weights) were matched to those used on the Space NK site for consistency.

I downloaded FuturaNow from your site and referenced it in `fonts.css`.

### Accessibility

To enhance screen reader support, the carousel includes:

- `role="region"` on `.carousel-wrapper` to define a landmark region.
- `aria-label="Recommended products carousel"` to provide an accessible name for the carousel.
- `aria-controls="carousel-container"` on navigation buttons to indicate what they affect.
- `tabindex="0"` on the carousel container to make it keyboard-focusable.

### Tech Notes

- Vanilla HTML, CSS, and JavaScript only
- No third-party libraries or frameworks used
- Fully self-contained – no external dependencies beyond npx serve for previewing
