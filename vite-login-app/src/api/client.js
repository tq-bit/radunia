import axios from 'axios';

export const authClient = axios.create({
  baseURL: `http://${window.location.hostname}:3001/api/v1/`
})

export const avatarClient = axios.create({
  baseURL: 'https://eu.ui-avatars.com/api/'
})