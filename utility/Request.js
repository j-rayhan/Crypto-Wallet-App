const SERVER_URL = 'https://api.coingecko.com/api/v3'
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {isToken} boolean  The token we want to pass to "fetch" headers
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(restApi, options, isToken = false) {
  const url = SERVER_URL + restApi
  // console.log('options', options);
  const newOptions = { ...options }
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newOptions.headers,
  }
  if (isToken) {
    // const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY.USER));
    // if (currentUser && currentUser.token) {
    //   newOptions.headers = {
    //     'Authorization': 'Bearer ' + currentUser.token,
    //     ...newOptions.headers,
    //   };
    // }
  }
  newOptions.body = JSON.stringify(newOptions.body)

  // console.log('newOptions', newOptions);
  console.log('url', url)
  return fetch(url, newOptions)
    .then((response) => {
      if (restApi.includes('response_type=csv')) {
        return response.text()
      }
      return response.json()
    })
    .catch((e) => {
      const status = e.name
      console.error('PRINT IN %s=====>', 'Show error===>', status)
    })
}
