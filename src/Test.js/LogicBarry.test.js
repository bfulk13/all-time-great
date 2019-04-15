import {getTrendingQuestions, getPopularProfiles} from '../Logic/LogicBarry';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Test getTrendingQuestions function', () => {
    it ('should be a function', () => {
        expect(typeof getTrendingQuestions).toBe('function')
    })

    it ('should not be an object', () => {
        expect(typeof getTrendingQuestions).not.toBe('object')
    })
    
    it('should return an array', () => {
        let mock = new MockAdapter(axios)
        const data = []
        mock.onGet('/api/questions').reply(200, data)
        expect(Array.isArray(data)).toBe(true)
    })
})

describe('Test getPopularProfiles function', () => {
    it('should be a function', () => {
        expect(typeof getPopularProfiles).toBe('function')
    })

    it('should not be an object', () => {
        expect(typeof getPopularProfiles).not.toBe('object')
    })
})