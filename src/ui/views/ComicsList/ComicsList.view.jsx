import React from 'react'
import { Error } from 'ui/components/Error/Error'
import { usePresenter } from 'ui/views/_components/_hooks'
import { ComicsListPresenter } from './ComicsList.presenter'
import { ComicsList } from './ComicsList'

export const ComicsListView = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { firstCharacterFilter, secondCharacterFilter, error, loading, comics } = state
  const [characters, setCharacters] = React.useState([])
  const { onLogout, onLoadCharacters, onLoadComics, onToggleThemeMode } = usePresenter(() =>
    ComicsListPresenter({
      showCharacters: setCharacters,
      dispatch
    })
  )

  React.useEffect(() => {
    onLoadCharacters()
  }, [onLoadCharacters])

  React.useEffect(() => {
    onLoadComics(firstCharacterFilter, secondCharacterFilter)
  }, [firstCharacterFilter, onLoadComics, secondCharacterFilter])

  return (
    <ComicsList
      error={error}
      loading={loading}
      comics={comics}
      characters={characters}
      firstCharacterFilter={firstCharacterFilter}
      secondCharacterFilter={secondCharacterFilter}
      dispatch={dispatch}
      onLogout={onLogout}
      onToggleThemeMode={onToggleThemeMode}
    />
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
