import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import store from './store/store';
import { Provider } from 'react-redux';

const firebaseConfig = {
	apiKey: 'AIzaSyC8akPROmT0Xgm0n_Tz48VSusuG0Vk0I8c',
	authDomain: 'transportation-crm-acca7.firebaseapp.com',
	projectId: 'transportation-crm-acca7',
	storageBucket: 'transportation-crm-acca7.appspot.com',
	messagingSenderId: '1079647770878',
	appId: '1:1079647770878:web:13a31a644e0ee6f7502daf',
	databaseURL: 'https://transportation-crm-acca7-default-rtdb.europe-west1.firebasedatabase.app',
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();
const user = auth.currentUser;

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
