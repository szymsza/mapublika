export const API_URL = 'https://mapublika-api.szymsza.cz/';

export const mapColours = [
  '#e91e63',
  '#123456',
  '#3d8c40',
  '#621982',
  '#98100e',
  '#c97000',
  '#321f1c',
  '#0287c3',
];

export const publicDatasets = {
  'vira': {
    id: 'vira',
    label: 'Víra',
    description: 'Počet příslušníků církve, na tisíc obyvatel: ',
    selected: false,
    type: 'public',
  },

  'pocetDeti': {
    id: 'pocetDeti',
    label: 'Porodnost',
    description: 'Počet žen na tisíc obyvatel s počtem dětí',
    selected: false,
    type: 'public',
  },

  'pocetDetiAverage': {
    id: 'pocetDetiAverage',
    label: 'Průměrná porodnost',
    description: 'Počet dětí na ženu,',
    selected: false,
    type: 'public',
  },
};