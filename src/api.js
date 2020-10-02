export const api = {
  characters: async () => {
    const response = await fetch('/characters.json')
    return response.json()
  },

  comics: async characterId => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch(`/comics-${characterId}.json`)

          if (Math.round(Math.random() * 5) === 0) {
            reject({ status: 500 })
          }

          resolve(await response.json())
        } catch (error) {
          reject({ status: 404 })
        }
      }, 2000)
    })
  },

  allComics: async () => {
    const response = await fetch('/comics.json')
    return response.json()
  }
}
