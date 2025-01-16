// declaring variables
const pickUpMovie = document.querySelector("select");
const seatsSection = document.querySelector("#seats_section");
const seats = document.querySelectorAll(
    ".seat_section_row_section .seats:not(.blocked)"
);
const amount = document.querySelector("#amount");
const price = document.querySelector("#price");

let priceOfMovie = pickUpMovie.value;

// creating function and adding listeners

const updateBookingDetails = () => {
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

const getItemsFromLocalStorage = () => {
    const storedItems = JSON.parse(localStorage.getItem("activeSeats")) || [];
    storedItems.forEach((i) => seats[i]?.classList.add("active"));

    const movieIndex = localStorage.getItem("MovieIndex");
    const moviePrice = localStorage.getItem("MoviePrice");
    if (movieIndex !== null) pickUpMovie.selectedIndex = movieIndex;
    if (moviePrice !== null) priceOfMovie = moviePrice;
};



pickUpMovie.addEventListener("change", (e) => {
    priceOfMovie = e.target.value;
    updateBookingDetails();
    storeMoviePrice(e.target.selectedIndex, e.target.value);
});

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
        updateBookingDetails();
    }
});

// Running functions

getItemsFromLocalStorage();
updateBookingDetails();
