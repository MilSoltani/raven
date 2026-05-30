import type { LocaleMap } from '../types'

export const authLocale: LocaleMap = {
  en: {
    api: {
      response: {
        signedIn: 'Signed in successfully',
        refreshed: 'Session refreshed',
        signedOut: 'Signed out successfully',
        me: 'User fetched successfully',
        signedUp: 'Signed up successfully',
      },

      validation: {
        emailInvalid: 'Invalid email address',
        emailRequired: 'Email is required',

        passwordRequired: 'Password is required',
        passwordTooShort: 'Password is too short',
        passwordTooLong: 'Password is too long',

        nameRequired: 'Name is required',
        nameTooLong: 'Name is too long',
      },

      errors: {
        unauthenticated: 'Unauthenticated',
        invalidCredentials: 'Invalid credentials',
        internalError: 'Internal server error',
        invalidExpiredToken: 'Invalid or expired token',
      },
    },

    web: {},
  },

  de: {
    api: {
      response: {
        signedIn: 'Erfolgreich angemeldet',
        refreshed: 'Sitzung aktualisiert',
        signedOut: 'Erfolgreich abgemeldet',
        me: 'Benutzer erfolgreich geladen',
        signedUp: 'Erfolgreich registriert',
      },

      validation: {
        emailInvalid: 'Ungültige E-Mail-Adresse',
        emailRequired: 'E-Mail ist erforderlich',

        passwordRequired: 'Passwort ist erforderlich',
        passwordTooShort: 'Passwort ist zu kurz',
        passwordTooLong: 'Passwort ist zu lang',

        nameRequired: 'Name ist erforderlich',
        nameTooLong: 'Name ist zu lang',
      },

      errors: {
        unauthenticated: 'Nicht authentifiziert',
        invalidCredentials: 'Ungültige Zugangsdaten',
        internalError: 'Interner Serverfehler',
        invalidExpiredToken: 'Ungültiger oder abgelaufener Token',
      },
    },

    web: {},
  },

  fr: {
    api: {
      response: {
        signedIn: 'Connexion réussie',
        refreshed: 'Session actualisée',
        signedOut: 'Déconnexion réussie',
        me: 'Utilisateur récupéré avec succès',
        signedUp: 'Inscription réussie',
      },

      validation: {
        emailInvalid: 'Adresse e-mail invalide',
        emailRequired: 'L\'e-mail est requis',

        passwordRequired: 'Le mot de passe est requis',
        passwordTooShort: 'Le mot de passe est trop court',
        passwordTooLong: 'Le mot de passe est trop long',

        nameRequired: 'Le nom est requis',
        nameTooLong: 'Le nom est trop long',
      },

      errors: {
        unauthenticated: 'Non authentifié',
        invalidCredentials: 'Identifiants invalides',
        internalError: 'Erreur interne du serveur',
        invalidExpiredToken: 'Jeton invalide ou expiré',
      },
    },

    web: {},
  },

  es: {
    api: {
      response: {
        signedIn: 'Inicio de sesión correcto',
        refreshed: 'Sesión actualizada',
        signedOut: 'Cierre de sesión correcto',
        me: 'Usuario obtenido correctamente',
        signedUp: 'Registro correcto',
      },

      validation: {
        emailInvalid: 'Correo electrónico inválido',
        emailRequired: 'El correo es obligatorio',

        passwordRequired: 'La contraseña es obligatoria',
        passwordTooShort: 'La contraseña es demasiado corta',
        passwordTooLong: 'La contraseña es demasiado larga',

        nameRequired: 'El nombre es obligatorio',
        nameTooLong: 'El nombre es demasiado largo',
      },

      errors: {
        unauthenticated: 'No autenticado',
        invalidCredentials: 'Credenciales inválidas',
        internalError: 'Error interno del servidor',
        invalidExpiredToken: 'Token inválido o expirado',
      },
    },

    web: {},
  },
}
