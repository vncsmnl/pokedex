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
    const statsInfo = stats.map(stat => `${stat.base_stat} ${stat.stat.name}`);

    return `
        <li class="card ${elementTypes.join(' ')}" data-id="${id}" data-name="${name}" onclick="handlePokemonCardClick(this, '${name}')">
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

const applyDualTypeBackgrounds = () => {
    const typeColors = {
        fire: getComputedStyle(document.documentElement).getPropertyValue('--fire').trim(),
        grass: getComputedStyle(document.documentElement).getPropertyValue('--grass').trim(),
        water: getComputedStyle(document.documentElement).getPropertyValue('--water').trim(),
        electric: getComputedStyle(document.documentElement).getPropertyValue('--electric').trim(),
        ice: getComputedStyle(document.documentElement).getPropertyValue('--ice').trim(),
        steel: getComputedStyle(document.documentElement).getPropertyValue('--steel').trim(),
        dark: getComputedStyle(document.documentElement).getPropertyValue('--dark').trim(),
        ground: getComputedStyle(document.documentElement).getPropertyValue('--ground').trim(),
        rock: getComputedStyle(document.documentElement).getPropertyValue('--rock').trim(),
        fairy: getComputedStyle(document.documentElement).getPropertyValue('--fairy').trim(),
        poison: getComputedStyle(document.documentElement).getPropertyValue('--poison').trim(),
        bug: getComputedStyle(document.documentElement).getPropertyValue('--bug').trim(),
        dragon: getComputedStyle(document.documentElement).getPropertyValue('--dragon').trim(),
        psychic: getComputedStyle(document.documentElement).getPropertyValue('--psychic').trim(),
        flying: getComputedStyle(document.documentElement).getPropertyValue('--flying').trim(),
        fighting: getComputedStyle(document.documentElement).getPropertyValue('--fighting').trim(),
        normal: getComputedStyle(document.documentElement).getPropertyValue('--normal').trim(),
        ghost: getComputedStyle(document.documentElement).getPropertyValue('--ghost').trim()
    };

    document.querySelectorAll(".card").forEach(card => {
        const types = Array.from(card.classList).filter(cls => typeColors[cls]);
        if (types.length === 1) {
            card.style.backgroundColor = typeColors[types[0]];
        } else if (types.length === 2) {
            card.style.background = `linear-gradient(135deg, ${typeColors[types[0]]} 0%, ${typeColors[types[1]]} 100%)`;
        }
    });
};

const fetchTotalPokemonCount = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
        if (response.status === 200) {
            const data = await response.json();
            return data.count;
        } else {
            throw new Error(`Failed to fetch Pokemon count: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching total Pokemon count:', error);
        throw error;
    }
};

const generatePokemonPromises = (count) => Array(count).fill().map((_, index) => fetchPokemon(index + 1));

const updatePokedex = async () => {
    try {
        const totalPokemonCount = await fetchTotalPokemonCount();
        const pokemonPromises = generatePokemonPromises(totalPokemonCount);
        const pokemons = await Promise.all(pokemonPromises);
        const pokemonCardsHTML = pokemons.map(generatePokemonCardHTML);
        insertPokemonsIntoPage(pokemonCardsHTML);
        applyDualTypeBackgrounds();
    } catch (error) {
        console.error(error);
    }
};

updatePokedex();
