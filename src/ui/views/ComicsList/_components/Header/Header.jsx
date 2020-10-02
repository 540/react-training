import React from 'react'
import { Button } from 'ui/components/Button'
import styled from 'styled-components'
import { Select } from 'ui/components/Select'
import { sizes } from 'ui/theme'

export const Header = ({
  characters,
  firstCharacterFilter,
  secondCharacterFilter,
  onClear,
  onChangeFirstCharacter,
  onChangeSecondCharacter
}) => {
  const options = characters.map(character => ({ value: character.id, label: character.name }))

  return (
    <>
      <CharacterSelect
        options={options}
        value={firstCharacterFilter}
        onSelect={event => onChangeFirstCharacter(event.target.value)}
      />
      <CharacterSelect
        options={options}
        value={secondCharacterFilter}
        onSelect={event => onChangeSecondCharacter(event.target.value)}
      />
      <Button onClick={onClear}>Limpiar búsqueda</Button>
    </>
  )
}

const CharacterSelect = styled(Select)`
  margin-bottom: ${sizes.base};
  margin-right: ${sizes.large};
`
