import { combineReducers } from 'redux';
import header from './Header/reducer';
import screen from './screen/reducer';

export const MainView = combineReducers({
    header,
    screen
})