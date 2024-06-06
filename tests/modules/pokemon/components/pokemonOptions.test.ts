import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue"
import { mount } from "@vue/test-utils"

const options = [
    { id:1, name: 'Bulbasaur' },
    { id:2, name: 'Ivysaour' },
    { id:3, name: 'Venusaur' },
]

describe('<PokemonOptions/>', ()=>{
    test('should render bottons with correct text', () => {
        const wrapper = mount(PokemonOptions,{
            props: { 
                options, 
                blockSelection : false,
                correctAnswer : 1,
            },
        })
        const buttons = wrapper.findAll('button')
        // Evalua que la cantidad de botones sea la misma que las opciones
        expect(buttons.length).toBe(options.length)

        buttons.forEach((button, index)=>{
            //evalua el nombre del botón con el name del objeto.
            expect(button.text()).toBe(options[index].name)
            //console.log(button.attributes()) // evalua que la clase sea la correcta que tenga el botón
            const classButton = 'capitalize disabled:shadow-none disabled:bg-gray-100'
            expect(button.attributes('class')).toEqual(classButton)
        })
    })

    test('should emit selectedOption event when a button is clicked', async() => {
        const wrapper = mount(PokemonOptions,{
            props: { 
                options, 
                blockSelection : false,
                correctAnswer : 1,
            },
        })
        const [b1, b2, b3] = wrapper.findAll('button')              
        // evaluar cuando se hace click en el botón
        await b1.trigger('click')
        expect(wrapper.emitted().selectedOption).toBeTruthy()
        console.log(wrapper.emitted('selectedOption'))
        expect(wrapper.emitted().selectedOption[0]).toEqual([1])
        await b2.trigger('click')
        expect(wrapper.emitted().selectedOption[1]).toEqual([2])
        await b3.trigger('click')
        expect(wrapper.emitted().selectedOption[2]).toEqual([3])
    })

    test('should disabled buttons whrn block selection prop is true', async() => {
        const wrapper = mount(PokemonOptions,{
            props: { 
                options, 
                blockSelection : true,
                correctAnswer : 1,
            },
        })
        const buttons = wrapper.findAll('button')              
        buttons.forEach(button => {
            const attributes = Object.keys(button.attributes())
            expect(attributes).toContain('disabled')
        })
    })

    test('should apply correct styling to buttons based on correct/incorrect answer', async() => {
        const correctAnswer = 2
        const wrapper = mount(PokemonOptions,{ props: { options, blockSelection : true, correctAnswer} })
        const buttons = wrapper.findAll('button')              
        
        buttons.forEach((button,index) => {
            ( options[index].id === correctAnswer) 
                ? expect(button.classes()).toContain('correct')
                : expect(button.classes()).toContain('incorrect')
        })
    })

})