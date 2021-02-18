const URL =
  "https://literate-tribble.vrmn17v8c56d2.us-west-2.cs.amazonlightsail.com/persons";

// To bypass CORS error, passing the request through "abhi-cors-anywhere" proxy. (I created a proxy for this purpose)
const CORS_URL = `https://abhi-cors-anywhere.herokuapp.com/${URL}`;

const cardContainerElement = document.querySelector(".card-container");

fetch(CORS_URL)
  .then((res) => res.json())
  .then((persons) => {
    persons.forEach((person) => {
      const cardElement = create_cardElement(person);
      cardContainerElement.appendChild(cardElement);
    });
  })
  .catch((err) => {
    const errorElement = document.createElement("p");
    errorElement.innerText = "Oops! Not able to get persons 😟";
    cardContainerElement.appendChild(errorElement);
  });

/* ------------------  Functions  ------------------ */
/**
 * Modify Biography to fit in one line
 * @param {String} biography - biography got from the api call
 * @return {String} - modified biography (ading "..." and "Read more")
 */
const manageBiography = (biography) => {
  const words = biography.split(" ");

  // if there are less than 8 words - no need to modify as the text will fit in 2 lines
  if (words.length < 8) {
    return words.join(" ");
  } else {
    // after first 6 words add "..." and put the remaining text into span with class "more". Also, add a button with text "Read more"
    let modifiedBiography = words.slice(0, 6).join(" ");
    modifiedBiography += `<span class="dots">...</span>`;
    modifiedBiography += `<span class="more"> ${words
      .slice(6)
      .join(
        " "
      )}</span>   <button type="button" class="read-button btn btn-link btn-sm" onclick = "clickHandler(event)">Read more</button>`;

    return modifiedBiography;
  }
};

/**
 * Handle "Read more" or "Read less" click events
 * @param {Object} event - Click event
 */
const clickHandler = (event) => {
  const id = event.target.parentNode.parentNode.parentNode.id;
  toggleRead(id);
};

/**
 * Toggle biography either into full text or 2 lines based on the "id" of the card
 * @param {String} id - Card id
 */
const toggleRead = (id) => {
  const dots = document.querySelector(`#${id} .dots`);
  const moreText = document.querySelector(`#${id} .more`);
  const btnText = document.querySelector(`#${id} .read-button`);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
};

/**
 * Create a card element and insert HTML into it
 * @param {Object} person - Individual person object which contains - id, name, date_of_birth, biography, metadata
 * @return {DOM Element} - card element
 */
const create_cardElement = ({
  id,
  name,
  date_of_birth,
  biography,
  metadata,
}) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.setAttribute("id", `card-${id}`);

  const tagsHTML = metadata.tags.reduce(
    (acc, curr) =>
      acc + `<span class="tag badge bg-secondary" disabled>${curr}</span>`,
    ""
  );

  cardElement.innerHTML = `<div class="card-header">${name}</div>
                                <div class="card-body">
                                    <p class="card-text"><span class="bold-text">Date of Birth</span>: ${date_of_birth}</p>
                                    <p class="card-text"><span class="bold-text">Bio: </span>${manageBiography(
                                      biography
                                    )}</p>
                                    <p><span class="bold-text">Tags: </span>${tagsHTML}</p>
                                </div> 
                            </div>`;

  return cardElement;
};
