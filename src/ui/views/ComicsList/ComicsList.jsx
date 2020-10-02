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
  const [state, dispatch] = React.useReducer(reducer, initialState, undefined)
  const { firstCharacterFilter, secondCharacterFilter, error, loading, comics } = state
  const [characters, setCharacters] = React.useState([])

  React.useEffect(() => {
    async function fetchCharacters() {
      setCharacters(await getAllCharacters())
    }

    fetchCharacters()
  }, [])

  React.useEffect(() => {
    async function fetchComics() {
      try {
        dispatch({ type: 'FETCH_COMICS' })
        dispatch({
          type: 'SHOW_COMICS',
          comics: await getCommonComics(firstCharacterFilter, secondCharacterFilter)
        })
      } catch (error) {
        if (error.status === 404) {
          dispatch({ type: 'SHOW_ERROR', error: 'No existe ningún comic para este personaje 😱' })
        }
        if (error.status === 500) {
          dispatch({ type: 'SHOW_ERROR', error: 'Vuelve a intentarlo más tarde... 🤕' })
        }
      }
    }

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
        onChangeFirstCharacter={filter => dispatch({ type: 'SELECT_FIRST_CHARACTER', filter })}
        onChangeSecondCharacter={filter => dispatch({ type: 'SELECT_SECOND_CHARACTER', filter })}
        onClear={() => dispatch({ type: 'CLEAR' })}
      />
      {renderList()}
      <Footer comicCount={comics.length} />
    </Layout>
  )
}
const initialState = {
  comics: [],
  firstCharacterFilter: undefined,
  secondCharacterFilter: undefined,
  loading: true,
  error: undefined
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FIRST_CHARACTER':
      return {
        ...state,
        firstCharacterFilter: action.filter
      }
    case 'SELECT_SECOND_CHARACTER':
      return {
        ...state,
        secondCharacterFilter: action.filter
      }
    case 'FETCH_COMICS':
      return {
        ...state,
        comics: [],
        loading: true,
        error: undefined
      }
    case 'SHOW_COMICS':
      return {
        ...state,
        comics: action.comics,
        loading: false,
        error: undefined
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        comics: [],
        loading: false,
        error: action.error
      }
    case 'CLEAR':
      return initialState
    default:
      throw new Error(`Unhandled action type: ${action.type}. Please fix it. Thank you.`)
  }
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
