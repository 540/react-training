import React from 'react'
import isUndefined from 'lodash/isUndefined'
import { Error } from 'ui/components/Error/Error'
import { Loading } from 'ui/components/Loading'
import { color } from 'ui/theme'
import { List } from './_components/List'
import { Button } from 'ui/components/Button'
import { Text } from 'ui/components/Text'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import styled from 'styled-components'
import { ThemeContext } from 'ui/views/_components/_context/ThemeContext'

export const ComicsList = ({
  error,
  loading,
  comics,
  characters,
  firstCharacterFilter,
  secondCharacterFilter,
  dispatch,
  onLogout,
  onToggleThemeMode
}) => {
  const theme = React.useContext(ThemeContext)

  const renderList = () => {
    if (!isUndefined(error)) {
      return <Error>{error}</Error>
    }

    if (loading) {
      return <Loading data-testid="comic-list-loading" color={color.blue1} />
    }

    return <List comics={comics} />
  }

  return (
    <Layout>
      <Button onClick={onLogout} marginRight="medium">
        Cerrar Sesión
      </Button>
      <input type="checkbox" onClick={() => onToggleThemeMode(theme)} data-testid="theme-mode-toggle" />
      <Text as="span" marginBottom="small" marginRight="small">
        El tema actual es: {theme.getMode() === 'DAY' ? 'modo día' : 'modo noche'}
      </Text>
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

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`
