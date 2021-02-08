import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().required().email(),
  username: yup.string().required().trim(),
  password: yup.string().required()
});



