// declearing variables;
const pickUpMovie = document.querySelector("select");
const seatsSection = document.querySelector("#seats_section");
const seats = document.querySelectorAll(
    ".seat_section_row_section .seats:not(.blocked)"
);
const amount = document.querySelector("#amount");
const price = document.querySelector("#price");

let priceOfMovie = pickUpMovie.value;
console.log(priceOfMovie);

// Adding event listeners and creating functions

const mainFunctional = () => {
    const activeSeats = document.querySelectorAll(
        ".seat_section_row_section .seats.active"
    );
    const indexOfActiveSeats = [...activeSeats].map((seat) =>
        [...seats].indexOf(seat)
    );
    localStorage.setItem("activeSeats", JSON.stringify(indexOfActiveSeats));

    amount.textContent = activeSeats.length;
    price.textContent = activeSeats.length * priceOfMovie;
};

// Getting items from local storage
const getItemsFromLocalStorage = () => {
    const storedItems = JSON.parse(localStorage.getItem("activeSeats"));
    console.log(storedItems);
    if (storedItems.length > 0 && storedItems !== null) {
        storedItems.forEach((i) => {
            seats[i].classList.add("active");
        });
    }

    const movieIndexOfLocalStorage = JSON.parse(
        localStorage.getItem("MovieIndex")
    );
    const moviePriceLocalStorage = JSON.parse(
        localStorage.getItem("MoviePrice")
    );
    if (movieIndexOfLocalStorage !== null) {
        pickUpMovie.selectedIndex = movieIndexOfLocalStorage;
    }

    if (moviePriceLocalStorage !== null) {
        priceOfMovie = moviePriceLocalStorage;
    }
};
getItemsFromLocalStorage();

pickUpMovie.addEventListener("change", (e) => {
    priceOfMovie = e.target.value;
    mainFunctional();
    storeMoviePrice(e.target.selectedIndex, e.target.value);
});

// Creating Function to set movie prices into local storage;
const storeMoviePrice = (movieIndex, moviePrice) => {
    localStorage.setItem("MoviePrice", moviePrice);
    localStorage.setItem("MovieIndex", movieIndex);
};

seatsSection.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seats") &&
        !e.target.classList.contains("blocked")
    ) {
        e.target.classList.toggle("active");
        mainFunctional();
    }
});

// All Done <3
mainFunctional();
