import axios from 'axios';
import { browserHistory } from 'react-router';
import { socketLobby, socketLoading } from '../socket';

export const UPDATE_SELECTED_GAME = 'UPDATE_SELECTED_GAME';
export const UPDATE_MODAL_DISPLAYED_GAME = 'UPDATE_MODAL_DISPLAYED_GAME';
export const TOGGLE_MODAL_DISPLAY = 'TOGGLE_MODAL_DISPLAY';
export const RECEIVE_GAMES_INFO = 'RECEIVE_GAMES_INFO';

export function updateSelectedGame(game) {
	socketLoading.emit('room', game.id);
	socketLobby.emit('update game list');
	browserHistory.push('/loading');
	return { type: UPDATE_SELECTED_GAME, game };
}

export function updateModalDisplayedGame(game) {
	return { type: UPDATE_MODAL_DISPLAYED_GAME, game };
}

export function toggleModalDisplay() {
	return { type: TOGGLE_MODAL_DISPLAY };
}

function receiveGamesInfo(data) {
	return { type: RECEIVE_GAMES_INFO, data };
}

export function createGame(postData) {
	return dispatch => axios.post('/api/games', postData)
			.then(response => dispatch(updateSelectedGame(response.data)));
}

export function updateDisplayedGames() {
	return dispatch => axios.get('/api/games/open').then(response => dispatch(receiveGamesInfo(response.data)));
}
