import React from 'react'
import { usePresenter } from 'ui/views/_components/_hooks'
import { ComicsListPresenter } from './ComicsList.presenter'
import { ComicsList } from './ComicsList'

export const ComicsListView = () => {
  const [firstCharacterFilter, setFirstCharacterFilter] = React.useState(undefined)
  const [secondCharacterFilter, setSecondCharacterFilter] = React.useState(undefined)
  const [error, setError] = React.useState(undefined)
  const [loading, setLoading] = React.useState(false)
  const [comics, setComics] = React.useState([])
  const [characters, setCharacters] = React.useState([])
  const { onLogout, onLoadCharacters, onLoadComics, onToggleThemeMode } = usePresenter(() =>
    ComicsListPresenter({
      showCharacters: setCharacters,
      showLoading: () => {
        setComics([])
        setError(undefined)
        setLoading(true)
      },
      hideLoading: () => setLoading(false),
      showComics: comics => setComics(comics),
      showError: error => setError(error)
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
      onChangeFirstCharacter={setFirstCharacterFilter}
      onChangeSecondCharacter={setSecondCharacterFilter}
      onLogout={onLogout}
      onToggleThemeMode={onToggleThemeMode}
      onClear={() => {
        setError(undefined)
        setComics([])
        setFirstCharacterFilter(undefined)
        setSecondCharacterFilter(undefined)
      }}
    />
  )
}
