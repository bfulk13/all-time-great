import {getAllQuestionsFromDb, updateQuestion} from '../Logic/LogicRiley'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Tests getAllQuestions', () => {
  test('axios call gets back data' , () => {
    var mock = new MockAdapter(axios)
    const data = {response: true }
    mock.onGet('/api/getallquestions').reply(200, data)
   
  })
  test(' type of is a function' , () => {  
    expect(typeof getAllQuestionsFromDb ).toBe('function')
  })
  test(' type of is not an object' , () => {  
    expect(typeof getAllQuestionsFromDb ).not.toBe('object')
  })
  test(' type of response is an object' , () => {
    var mock = new MockAdapter(axios)
    const data = {}
    mock.onGet('/api/getallquestions').reply(200, data)
    expect(typeof data ).toBe('object')
  })
  test(' type of response is an array' , () => {
    var mock = new MockAdapter(axios)
    const data = []
    mock.onGet('/api/getallquestions').reply(200, data)
    expect(Array.isArray(data)).toBe(true)
  })
  test('array at index 0 exists' , () => {
    var mock = new MockAdapter(axios)
    const data = [{num1: 1}, {num2: 2}]
    mock.onGet('/api/getallquestions').reply(200, data)
    expect(typeof data[0]).toBe('object')
  })

}) ;
