import type { Pokemon } from "@/modules/pokemon/interfaces/pokemon.interface"

describe('pokemon interface',()=>{
    
    const pokemon:Pokemon = {id:1, name:'bulbasaur'}
    test('should have an id property of type number', () => {
        expect(pokemon.id).toEqual(expect.any(Number))
    })
    test('should have an name property of type string', () => {
        expect(pokemon.name).toEqual(expect.any(String))
    })
})

