import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://unidacproject.herokuapp.com',
});

export default myAxios;