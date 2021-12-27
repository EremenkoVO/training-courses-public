import axios from '../helpers/axios';

class AuthService {
  login(user) {
    return axios
      .post('auth/login', {
        login: user.login,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post('auth/register', {
      login: user.login,
      password: user.password,
    });
  }
}

export default new AuthService();
