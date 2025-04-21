const ACCESS_TOKEN_MAP_BOX = 'access_token=pk.eyJ1Ijoid2VkZXI5NiIsImEiOiJja2lnb2ZwdmQwYTdhMnNwbnI5NTg0bGl5In0.UG9GTf4vHExDjgxwLR8q0g'

console.log(ACCESS_TOKEN_MAP_BOX)

export const fetchLocalMapBox = (local: string) => fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
).then(response => response.json())
    .then(data => data)