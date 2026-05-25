import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation('api')

  return (
    <div>{t('welcomeMessage')}</div>
  )
}
