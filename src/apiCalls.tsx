const BaseURLMock = "https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io"
const BaseURLReal ="https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com"
export const getSingleUser = () => {
  return fetch(
    `${BaseURLMock}/api/v1/users/1`
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, User not found.`
        );
      }
    })
    .then((response) =>{
      console.log('res', response.json)
      return response.json()});
};

export const getSearchResults = (query: string, remoteQuery:string) => {
  console.log(`${BaseURLReal}/api/v1/search_skills?query=${query}${remoteQuery}`)
  return fetch(
    `${BaseURLReal}/api/v1/search_skills?query=${query}${remoteQuery}`

  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, User not found.`
        );
      }
    })
    .then((response) =>{
      console.log('res', response.json)
      return response.json()});
};
