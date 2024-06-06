import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame"
import { GameStatus } from "@/modules/pokemon/interfaces/game-status-enum"
import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue"
import { mount } from "@vue/test-utils"
import type { Mock } from "vitest"

vi.mock('@/modules/pokemon/composables/usePokemonGame', ()=> ({
    usePokemonGame: vi.fn(),
}))

const pokemonOptions = [ {
    "name": "bulbasaur",
    "id": 1
},
{
    "name": "ivysaur",
    "id": 2
},
{
    "name": "venusaur",
    "id": 3
},
{
    "name": "charmander",
    "id": 4
},]
describe('<PokemonGame/>',()=>{
    test('should initialized with deefault values', () => {
      (usePokemonGame as Mock).mockReturnValue({
        gameStatus: GameStatus.Playing,
        isLoading: true,
        pokemonOptions: [],
        randomPokemon: undefined,
        getNextRound: vi.fn(),
        checkAnswer: vi.fn(),
      })
      const wrapper = mount(PokemonGame)
      console.log(wrapper.html())
      expect(wrapper.get('h1').text()).toBe('Espere por favor')
      expect(wrapper.get('h1').classes()).toEqual(['text-3xl'])
      expect(wrapper.get('h3').text()).toBe('Cargando pokemons')
      expect(wrapper.get('h3').classes()).toEqual(['animate-pulse'])
    })
    
    test('should render <PokemonPicture/> and <PokemonOptions/>', () => {
        (usePokemonGame as Mock).mockReturnValue({
          gameStatus: GameStatus.Playing,
          isLoading: false,
          pokemonOptions: pokemonOptions,
          randomPokemon: pokemonOptions.at(0),
          getNextRound: vi.fn(),
          checkAnswer: vi.fn(),
        })
        const wrapper = mount(PokemonGame)
        console.log(wrapper.html())
        const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100')
        expect(wrapper.find('img').attributes('src')).toBe(imgUrl)
        expect(buttons).length(4)
      })

      test('should render <PokemonPicture/> and <PokemonOptions/>', () => {
        (usePokemonGame as Mock).mockReturnValue({
          gameStatus: GameStatus.Playing,
          isLoading: false,
          pokemonOptions: pokemonOptions,
          randomPokemon: pokemonOptions.at(0),
          getNextRound: vi.fn(),
          checkAnswer: vi.fn(),
        })
        const wrapper = mount(PokemonGame)
        console.log(wrapper.html())
        
      })
})