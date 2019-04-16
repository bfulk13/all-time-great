import {login} from '../Logic/LogicRandall'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

describe('test login function', ()=> {
  it ('call should return data', ()=> {
      var mock = new MockAdapter(axios)
      const data = {response: true}
      mock.onGet('/auth/login').reply(200, data)
  })
  it ('it should return as a function', ()=> {
      expect(typeof login).toBe('function')
  })
  it ('type of is not and object', ()=> {
      expect(typeof login).not.toBe('object')
  })
  it ('type of should be an object', ()=> {
      var mock = new MockAdapter(axios)
      const data = {}
      mock.onGet('/auth/login').reply(200, data)
      expect(typeof data).toBe('object')
  })

  it ('type of response should be an array', ()=> {
    var mock = new MockAdapter(axios)
    const data = []
    mock.onGet('/auth/login').reply(200, data)
    expect(Array.isArray(data)).toBe(true)
  })

})



