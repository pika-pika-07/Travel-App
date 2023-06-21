import {plan} from './js/app'

import './styles/styles.scss'

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('generate').addEventListener('click', () => plan())
});

