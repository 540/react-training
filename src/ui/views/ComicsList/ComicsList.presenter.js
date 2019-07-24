import { UserService } from 'core/services/User'
import { navigator } from 'core/infrastructure/navigation/navigator'
import { CharacterService } from 'core/services/Character'
import { ThemeService } from 'core/services/Theme'
import { ComicService } from 'core/services/Comic'
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

      view.showLoading()
      view.showComics(await ComicService.common(firstCharacterFilter, secondCharacterFilter))
    } catch (error) {
      if (error.status === 404) {
        view.showError('No existe ningún comic para este personaje 😱')
      }
      if (error.status === 500) {
        view.showError('Vuelve a intentarlo más tarde... 🤕')
      }
    } finally {
      view.hideLoading()
    }
  }
})
