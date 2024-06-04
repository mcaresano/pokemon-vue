.<template>
<section>
    <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 >Espere por favor</h1>
        <h3>Cargando pokemons</h3>
    </section>
    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="m-5 font-bold from-stone-500">¿ Quién es este pokemon?</h1>
        <div class="h-20 m-5">
            <button 
                v-if="gameStatus !== GameStatus.Playing"
                @click="getNextRound(4)"
                class="bg-red-500 , text-white p-4 m-2 , rounded-md hover:"
            >Jugar de nuevo</button>
        </div>
            <!-- Pokemon picture -->
            <PokemonPicture 
                :pokemon-id ="randomPokemon.id" 
                :show-pokemon="gameStatus !== GameStatus.Playing"
            />
            <!-- Pokemon options-->
            <PokemonOptions 
                :options="options" 
                :block-selection="gameStatus !== GameStatus.Playing"
                :correct-answer="randomPokemon.id"
                @selected-option="checkAnswer"
            />
    </section>
</section>
</template>

<script setup lang="ts">
import PokemonOptions from "../components/PokemonOptions.vue";
import PokemonPicture from "../components/PokemonPicture.vue";
import { usePokemonGame } from "../composables/usePokemonGame";
import { GameStatus } from "../interfaces/game-status-enum";

const {gameStatus,randomPokemon, isLoading, pokemonOptions:options, checkAnswer, getNextRound} = usePokemonGame()

</script>

<style>

</style>