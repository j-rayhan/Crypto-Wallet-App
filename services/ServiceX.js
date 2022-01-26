import request from '../utility/Request'
import { encodeQuery } from '../utility/Helpers'
import { FETCH_TYPES } from '../utility/Constants'

class ServiceX {
  constructor(url) {
    this.API_ENDPOINT = url
  }

  async find(query) {
    const queryParam = encodeQuery(query)
    const options = { method: FETCH_TYPES.GET }
    const response = await request(this.API_ENDPOINT + queryParam, options)
    return response
  }

  async findById(id) {
    const options = { method: FETCH_TYPES.GET }
    const response = await request(`${this.API_ENDPOINT}/${id}`, options)
    return response
  }

  async create(body) {
    const options = { method: FETCH_TYPES.POST, body }
    const response = await request(this.API_ENDPOINT, options)
    return response
  }

  async patch(body) {
    const options = { method: FETCH_TYPES.PATCH, body }
    const response = await request(`${this.API_ENDPOINT}`, options)
    return response
  }

  async remove(body) {
    const options = { method: FETCH_TYPES.DELETE, body }
    const response = await request(this.API_ENDPOINT, options)
    return response
  }
}

export default ServiceX
