# Pokemon Pokedex Project

This project is a simple Pokemon Pokedex web application that fetches Pokemon data from the PokeAPI and displays it on a webpage. The application utilizes JavaScript and the Fetch API to make asynchronous requests to the PokeAPI endpoint and dynamically generates Pokemon cards based on the retrieved data.

## Screenshots

![App Screenshot](./assets/1.png)

## TODO

- [x] Dynamically get the pokemon ID without specifying it in generatePokemonPromises

## Getting Started

To use and run this project locally, follow the steps below:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vncsmnl/pokedex
   cd [repository_directory]
   ```

2. **Open the HTML file:**
   Open the `index.html` file in a web browser to view the Pokemon Pokedex.

## Features

- **Fetch Pokemon Data:**
  The `fetchPokemon` function is responsible for making asynchronous requests to the PokeAPI to fetch data for a specific Pokemon.

- **Generate Pokemon Card HTML:**
  The `generatePokemonCardHTML` function takes Pokemon data as input and generates HTML markup for a Pokemon card, including its image, name, type, abilities, and stats.

- **Insert Pokemon Cards Into Page:**
  The `insertPokemonsIntoPage` function inserts the generated Pokemon cards into the specified HTML element with the attribute `data-js="pokedex"`.

- **Generate Pokemon Promises:**
  The `generatePokemonPromises` function generates an array of promises, each corresponding to a Pokemon's data fetched from the PokeAPI.

- **Update Pokedex:**
  The `updatePokedex` function orchestrates the process of fetching Pokemon data for multiple Pokemon, generating HTML cards, and inserting them into the page.

## Usage

1. Open the `index.html` file in a web browser.
2. The Pokemon Pokedex will be dynamically populated with Pokemon cards, displaying information such as ID, name, type, abilities, and stats.

## Dependencies

- This project relies on the Fetch API, which is available in modern web browsers.
- An active internet connection is required to fetch data from the PokeAPI.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---