import { UserService } from 'core/services/User'
import { navigator } from 'core/infrastructure/navigation/navigator'
import { CharacterService } from '../../../core/services/Character'
import { ThemeService } from '../../../core/services/Theme'
import { ComicService } from '../../../core/services/Comic'
import isUndefined from 'lodash/isUndefined'

export const ComicsListPresenter = view => ({
  onLogout: async () => {
    await UserService.logout()
    navigator.goToLogin()
  },

  onLoadCharacters: async () => {
    view.showCharacters(await CharacterService.all())
  },

  onToggleThemeMode: async theme => ThemeService.toggleMode(theme.getMode() === 'DAY' ? 'NIGHT' : 'DAY'),

  onLoadComics: async (firstCharacterFilter, secondCharacterFilter) => {
    try {
      if (isUndefined(firstCharacterFilter) || isUndefined(secondCharacterFilter)) {
        return
      }

      view.dispatch({ type: 'FETCH_COMICS' })
      view.dispatch({
        type: 'SHOW_COMICS',
        comics: await ComicService.common(firstCharacterFilter, secondCharacterFilter)
      })
    } catch (error) {
      if (error.status === 404) {
        view.dispatch({ type: 'SHOW_ERROR', error: 'No existe ningún comic para este personaje 😱' })
      }
      if (error.status === 500) {
        view.dispatch({ type: 'SHOW_ERROR', error: 'Vuelve a intentarlo más tarde... 🤕' })
      }
    }
  }
})
