import { makeId } from "./util.service";
import { weatherService } from "./weater.service";
const STORAGE_KEY_LOGGEDIN_USER = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    addFavorite,
    removeFavorite
}

const gUsers = JSON.parse(sessionStorage.getItem('users')) || []

async function login(user) {
    const loggedInUser = gUsers.find(currUser => currUser.username === user.username && currUser.password === user.password)
    if(loggedInUser) return _saveLocalUser(loggedInUser);
    return Promise.reject('Invalid username / password')
}

async function signup(user) {
    user._id = makeId();
    user.favorites = []
    gUsers.push(user);
    sessionStorage.setItem('users', JSON.stringify(user))
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

async function addFavorite(city, user) {
    const cityToSave = await weatherService.query(city)
    cityToSave._id = makeId()
    user.favorites.push(cityToSave)
    _saveLocalUser(user)
    return user
}

function removeFavorite(user, id) {
    const favoriteIdx = user.favorites.findIndex(favorite => favorite._id === id);
    user.favorites.splice(favoriteIdx, 1);
    _saveLocalUser(user)
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}
