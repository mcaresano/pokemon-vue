import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue"
import { mount } from '@vue/test-utils';

describe('pokemon picture', ()=>{
    
    const pokemonId = 25
    const imageSrc =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
    test('should render the hidden image when showPokemon is true', () => {
        const wrapper = mount(PokemonPicture, {
            props: { pokemonId, showPokemon: true}
        })
        //console.log(wrapper.html())
        const img = wrapper.find('img')
        //console.log("imagen", img.attributes())
        expect(img.attributes('src')).toBe(imageSrc)
    })

    test('should render the image when showPokemon is false', () => {
        const wrapper = mount(PokemonPicture, {
            props: { pokemonId, showPokemon: false}
        })
        const img = wrapper.find('img')
        // forma 1 - buscando el atributo de la imagen solamente
        expect(img.attributes('src')).toBe(imageSrc)
        // forma 2 - buscando el contenido de los atributos de la imagen
        const attributes = img.attributes()
        expect(attributes).toEqual(
            expect.objectContaining({
                src: imageSrc,
                class: 'brightness-0'
            })
        )
    })
})