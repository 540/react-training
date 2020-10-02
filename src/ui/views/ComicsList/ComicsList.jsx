import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { api } from 'api'
import isUndefined from 'lodash/isUndefined'
import { Header } from './_components/Header/Header'
import { List } from './_components/List/List'
import { Footer } from './_components/Footer/Footer'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'

export const ComicsList = () => {
  const [comics, setComics] = React.useState([])
  const [characters, setCharacters] = React.useState([])
  const [firstCharacterFilter, setFirstCharacterFilter] = React.useState(undefined)
  const [secondCharacterFilter, setSecondCharacterFilter] = React.useState(undefined)
  const [error, setError] = React.useState(undefined)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchCharacters() {
      setCharacters(await getAllCharacters())
    }

    fetchCharacters()
  }, [])

  React.useEffect(() => {
    async function fetchComics() {
      try {
        setComics(await getCommonComics(firstCharacterFilter, secondCharacterFilter))
      } catch (error) {
        if (error.status === 404) {
          setError('No existe ningún comic para este personaje 😱')
        }
        if (error.status === 500) {
          setError('Vuelve a intentarlo más tarde... 🤕')
        }
      } finally {
        setLoading(false)
      }
    }

    setError(undefined)
    setLoading(true)
    fetchComics()
  }, [firstCharacterFilter, secondCharacterFilter])

  const renderList = () => {
    if (!isUndefined(error)) {
      return <Error>{error}</Error>
    }

    if (loading) {
      return <Loading />
    }

    return <List comics={comics} />
  }

  return (
    <Layout>
      <Text as="h1" weight="black" size="h1" marginBottom="small">
        Buscador de cómics de Marvel
      </Text>
      <Text as="p" size="large" marginBottom="large">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </Text>
      <Text as="p" size="medium" marginBottom="base">
        Selecciona una pareja de personajes
      </Text>
      <Header
        characters={characters}
        firstCharacterFilter={firstCharacterFilter}
        secondCharacterFilter={secondCharacterFilter}
        onChangeFirstCharacter={setFirstCharacterFilter}
        onChangeSecondCharacter={setSecondCharacterFilter}
        onClear={() => {
          setComics([])
          setFirstCharacterFilter(undefined)
          setSecondCharacterFilter(undefined)
        }}
      />
      {renderList()}
      <Footer comicCount={comics.length} />
    </Layout>
  )
}

const getAllCharacters = async () => await api.characters()

const getCommonComics = async (firstCharacterFilter, secondCharacterFilter) => {
  if (isUndefined(firstCharacterFilter) || isUndefined(secondCharacterFilter)) {
    return []
  }

  const [firstCharacterComics, secondCharacterComics] = await Promise.all([
    api.comics(firstCharacterFilter),
    api.comics(secondCharacterFilter)
  ])
  return firstCharacterComics.filter(comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id))
}

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`
