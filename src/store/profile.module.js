import axios from '../helpers/axios';

export const profile = {
  namespaced: true,
  actions: {
    create(profile) {
      return axios.post('profile/create', {
        image: '',
        email: profile.email,
        firstName: '',
        secondName: '',
        age: '',
        id_account: profile._id,
      });
    },
  },
};
