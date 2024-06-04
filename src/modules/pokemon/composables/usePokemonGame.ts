import { computed, onMounted, ref } from "vue"
import { GameStatus } from "../interfaces/game-status-enum"
import { pokemonApi } from "./api/pokemonApi"
import type { PokemonListResponse } from "../interfaces/pokemon-list-response"
import type { Pokemon } from "../interfaces/pokemon.interface"
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing)
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([])
    const randomPokemon = computed(()=> pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)])
    const isLoading = computed(()=> pokemons.value.length === 0)

    const getPokemons = async():Promise<Pokemon[]>=> {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')
        const pokemonsArray = response.data.results.map(pokemon =>{
            const urlParts = pokemon.url.split('/')
            const id = urlParts.at(-2) ?? 0
            return {
                id: +id,
                name: pokemon.name
            }
        })
        return pokemonsArray.sort(()=>Math.random()-0.5) // mezcla los resultados para que sean aleatorios
    }

    const getNextRound = (howMany:number = 4 )=> {
        gameStatus.value = GameStatus.Playing;
        // almaceno las opciones seleccionadas en el howMany
        pokemonOptions.value = pokemons.value.slice(0,howMany);
        pokemons.value = pokemons.value.slice(howMany)
    }

    const checkAnswer = (id:number) => {
        const hasWon = randomPokemon.value.id === id
        if (hasWon) {
            gameStatus.value = GameStatus.Won
            confetti({
                particleCount: 300,
                spread: 150,
                origin:{y: 0.6},
            })
            return
        }
        gameStatus.value = GameStatus.Lost
    }

    onMounted(async()=> {
        //await new Promise(r => setTimeout(r ,1000))
        pokemons.value = await getPokemons()
        getNextRound()
    })

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        // methods
        getNextRound,
        checkAnswer,
    }
}


