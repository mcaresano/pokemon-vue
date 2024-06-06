
import MockAdapter from 'axios-mock-adapter'
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame"
import { withSetup } from "../../../utils/with-setup"
import { GameStatus } from '../../../../src/modules/pokemon/interfaces/game-status-enum';
import { flushPromises } from "@vue/test-utils";
import { pokemonApi } from "@/modules/pokemon/composables/api/pokemonApi";
import { pokemonListFake } from "../../../data/pokemonsListFake";
import confetti from 'canvas-confetti'


const mockPokemonApi = new MockAdapter(pokemonApi)

mockPokemonApi.onGet('/?limit=151').reply(200,{
  results: pokemonListFake
})

vi.mock('canvas-confetti',()=>({ default:vi.fn() }))

describe ('usePokemonGame', ()=>{
    // custom composable,  onMounted es parte del ciclo de vida de los componentendes de VUE
    /* cuando necesitamos probar un composable que tiene ciclio de vida, necesitamos agregar en utils  
        una funcion que simula el ambiente en el que el composable va a correr.
    */
    test('should initialize with the correct default values ', async() => {
      //const {gameStatus, isLoading, pokemonOptions, randomPokemon} = usePokemonGame()
        // se llama a la aplicación del withSetup y se le envía la función del composable para montarlo..
      const[results, app] = withSetup(usePokemonGame)
        expect(results.gameStatus.value).toBe(GameStatus.Playing)
        expect(results.isLoading.value).toBe(true)
        expect(results.pokemonOptions.value).toEqual([])
        expect(results.randomPokemon.value).toBe(undefined)

        // espera que todas las promesas se ejecuten antes y terminen
        await flushPromises()
        expect(results.isLoading.value).toBe(false)
        expect(results.randomPokemon.value).toEqual({
            id:expect.any(Number),
            name: expect.any(String)
        })
    })

    test('should correctly handle getNextRound', async() => {
      const[results] = withSetup(usePokemonGame)
      await flushPromises()
      results.gameStatus.value = GameStatus.Won
      results.getNextRound(5)
      expect(results.gameStatus.value).toBe(GameStatus.Playing)
      expect(results.pokemonOptions.value).toHaveLength(5)
    })
    
    test('should correctly handle getNextRound and return different pokemons', async() => {
      const[results] = withSetup(usePokemonGame)
      await flushPromises()
      const firstOptions = [...results.pokemonOptions.value]
      results.getNextRound()
      const secondOptions = [...results.pokemonOptions.value]
      secondOptions.forEach(pokemon => {
        expect(firstOptions).not.toContain(pokemon.name)
      })
    })

    test('should correctly handle a incorrect answer', async() => {
      const[results] = withSetup(usePokemonGame)
      await flushPromises()
      const {checkAnswer, gameStatus} = results
      expect(gameStatus.value).toBe(GameStatus.Playing)
      checkAnswer(1500)
      expect(gameStatus.value).toBe(GameStatus.Lost)
    })
    
    test('should correctly handle a correct answer', async() => {
      const[results] = withSetup(usePokemonGame)
      await flushPromises()
      const {checkAnswer, gameStatus, randomPokemon} = results
      expect(gameStatus.value).toBe(GameStatus.Playing)
      checkAnswer(randomPokemon.value.id)
      expect(confetti).toHaveBeenCalled()
      expect(confetti).toHaveBeenCalledWith({
        "particleCount": 300,
        "spread": 150,
        "origin": {
                   "y": 0.6,
                 },
      })

      expect(gameStatus.value).toBe(GameStatus.Won)
    })

})