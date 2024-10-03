import axios from "axios";
import Success from './../helpers/Success';
import Failed from './../helpers/Failed';
const auth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signupApi = async (values) => {
    try {
        const res = await auth.post('auth/signup', values);
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }   
}

export const signinApi = async ({credential, password}) => {
    try {
        const res = await auth.post('auth/signin', { credential, password });
        console.log(res)
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }   
}

export const signoutApi = async () => {
    try {
        const res = await auth.post('auth/signout');
        console.log(res)
        Success(res.data.message);
        return res.data
    } catch (error) {
                console.log(error);
                Failed(
                  error.response.data.message
                    ? error.response.data.message
                    : error.message
                );
    }
}

export const passwordChangeApi = async ({ email, password }) => {
  try {
    const res = await auth.post("auth/changePassword", { email, password });
    console.log(res);
    Success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};