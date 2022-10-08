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
      "lower": "lower"
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
      "Add task": "ajouter une tâche",
      "tasks": "taches",
      "inProgress": "enCours",
      "Save task": "enregistrer la tâche",
      "title": "titre",
      "* title is required": "* le titre est requis",
      "description": "description",
      "date": "date",
      "importance": "importance",
      "high": "élevé",
      "medium": "moyen",
      "low": "plus bas"
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