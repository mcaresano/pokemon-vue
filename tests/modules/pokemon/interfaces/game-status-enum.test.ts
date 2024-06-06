import { GameStatus } from "@/modules/pokemon/interfaces/game-status-enum"

describe("GameStatus enum",()=>{
    test('should have a value of "playing"', () => {
        const status = 'playing'
        expect(GameStatus.Playing).toBe(status)
    })  
    test('should have a value of "won"', () => {
        const status = 'won'
        expect(GameStatus.Won).toBe(status)
    }) 
    test('should have a value of "lost"', () => {
        const status = 'lost'
        expect(GameStatus.Lost).toBe(status)
    }) 
})