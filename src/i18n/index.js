import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "task management": "task management",
      "all tasks": "all tasks",
      "completed tasks": "completed tasks",
      "in Progress tasks": "in Progress tasks",
      "completed": "completed",
      "in progress": "in progress",
      "Add task": "Add task",
      "tasks": "tasks",
      "inProgress": "inProgress",
      "Save task": "Save task",
      "title": "title",
      "* title is required":"* title is required",
      "description": "description",
      "date picker": "date picker",
      "importance": "importance",
      "high": "high",
      "medium": "medium",
      "lower": "lower",
      "log in":"log in",
      "Don't have an account?": "Don't have an account?",
      "Sign up for free": "Sign up for free",
      "* Email is not valid": "* Email is not valid",
      "* Password is not valid" : "* Password is not valid",
      "user not found !" : "user not found !",
      "Create an account" : "Create an account",
      "Password": "Password",
      "Confirm Password": "Confirm Password",
      "Create account": "Create account",
      "Sign up with google": "Sign up with google",
      "Email already used!" : "Email already used!",
      "password": "password",
      "* Your password must be at least 8 characters":"* Your password must be at least 8 characters",
      "* Email is not valide": "* Email is not valide",
      "Sign in with Google": "Sign in with Google",
      "password not valide !": "password not valide !",
      "task added succesufuly" : "task added succesufuly",
      "task not saved" : "task not saved",
      "task changed" : "task changed",
      "task not changed" : "task not changed",
      "task non completed": "task incompleted" ,
      "task completed": "task completed",
      "error in server": "error in server",
      "task deleted": "task deleted",

    }
  },
  fr: {
    translation: {
      "task management": "la gestion des tâches",
      "all tasks": "Toutes les tâches",
      "completed tasks": "les tâches terminées",
      "in Progress tasks": "les tâches en cours",
      "completed": "completées",
      "in progress": "en cours",
      "Add task": "ajouter tâche",
      "tasks": "taches",
      "inProgress": "enCours",
      "Save task": "enregistrer",
      "title": "titre",
      "* title is required": "* le titre est requis",
      "description": "description",
      "date": "date",
      "importance": "importance",
      "high": "élevé",
      "medium": "moyen",
      "low": "plus bas",
      "log in":"connexion",
      "Don't have an account?": "Vous n'avez pas de compte?",
      "Sign up for free": "Inscrivez-vous gratuitement",
      "* Email is not valid": "* L'email n'est pas valide",
      "* Password is not valid" : "*Le mot de passe n'est pas valide",
      "user not found !" : "utilisateur non trouvé !",
      "Create an account" : "Créer un compte",
      "Password": "Mot de passe",
      "Confirm Password": "Confirmez le mot de passe",
      "Create account": "Créer un compte",
      "Sign in with google": "Inscrivez-vous avec Google",
      "Email already used!" : "Adresse e-Mail déjà utilisée!",
      "password": "mot de passe",
      "* Your password must be at least 8 characters": "* Votre mot de passe doit comporter au moins 8 caractères",
      "* Email is not valide": "* L'email n'est pas valide",
      "Sign in with Google": "Se connecter avec Google",
      "password not valide !": "mot de passe n'est pas valide !",
      "task added succesufuly" : "tâche ajoutée avec succès",
      "task not saved" : "tâche non enregistrée",
      "task changed" : "tâche modifiée",
      "task not changed" : "tâche non modifiée",
      "task non completed": "tâche non terminée" ,
      "task completed": "tâche terminée",
      "error in server": "erreur dans le serveur",
      "task deleted": "tâche supprimée",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;