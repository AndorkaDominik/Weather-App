# Weather App

## Project Description
This project is a weather application built using React. It fetches current weather data from the OpenWeatherMap API based on user input and displays it in a user-friendly interface. Users can search for weather information by city name, view temperature, humidity, wind speed, and see an appropriate weather icon for the current conditions. The Weather App supports multiple languages for its user interface. Users can select their preferred language using the language selector buttons provided in the app. 

![Weather App Screenshot](./.github/weather-app-screenshot.png)

## Technologies Used
- React
- JavaScript (ES6+)
- HTML/CSS
- OpenWeatherMap API

## Components

### Weather.js

#### Overview
The `Weather` component is the main component responsible for fetching and displaying weather data. It includes a search bar, weather data display section, and language selector buttons for interface localization.

#### State and Refs
- `inputRef`: Uses `useRef` to reference the input element for capturing user input.
- `weatherData` (useState): Stores fetched weather data or `null` if no data is fetched yet.
- `language` (useState): Manages the current language for translations, defaulting to `'HUN'`.

#### Icons Mapping
The `allIcons` object maps weather condition codes from the OpenWeatherMap API to corresponding icon images imported from local assets.

#### Functions
- `selectLanguage`: Sets the language state based on the selected language.
- `search`: Asynchronously fetches weather data from OpenWeatherMap API based on user-provided city name. Handles errors and updates `weatherData` state accordingly.
- `useEffect`: Executes the `search` function with a default city (`Győr`) on component mount.

#### Event Handlers
- `handleKeyPress`: Triggers the `search` function when the Enter key is pressed in the input field.

## Language Selection

The Weather App supports multiple languages for its user interface. Users can select their preferred language using the language selector buttons provided in the app. Currently supported languages include English (ENG), Hungarian (HUN), and German (GER). 

When a language is selected, all interface texts such as placeholders, labels for humidity and wind speed, and error messages are dynamically updated to the chosen language using translations stored in the `translations` object.

To switch languages, simply click on the respective language button. The app will instantly update to display all text content in the selected language, providing a seamless experience for users regardless of their language preference.
