const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        } else {
            throw new Error(`Failed to fetch Pokemon: ${APIResponse.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const generatePokemonCardHTML = ({ name, id, types, abilities, stats }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
    const pokemonAbilities = abilities.map(ability => ability.ability.name);
    const statsInfo = stats.map(stat => stat.base_stat + ' ' + stat.stat.name);

    return `
        <li class="card ${elementTypes[0]}" data-id="${id}" data-name="${name}" onclick="handlePokemonCardClick(this, '${name}')">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">Type: ${elementTypes.join(' | ')}</p>
            <p class="card-subtitle">Abilities: ${pokemonAbilities.join(', ')}</p>
            <p class="card-subtitle">Stats: ${statsInfo.join(', ')}</p>
            
        </li>`;
};

const handlePokemonCardClick = (cardElement, name) => {
    const pokemonName = cardElement.getAttribute('data-name');
    const url = `https://bulbapedia.bulbagarden.net/wiki/${pokemonName}`;
    window.open(url, '_blank');
};

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons.join('');
};

const totalPokemonCount = 1017;
const generatePokemonPromises = () => Array(totalPokemonCount).fill().map((_, index) => fetchPokemon(index + 1));

const updatePokedex = async () => {
    try {
        const pokemonPromises = generatePokemonPromises();
        const pokemons = await Promise.all(pokemonPromises);
        const pokemonCardsHTML = pokemons.map(generatePokemonCardHTML);
        insertPokemonsIntoPage(pokemonCardsHTML);
    } catch (error) {
        console.error(error);
    }
};

updatePokedex();
