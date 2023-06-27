import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userDate) => {
  const response = await axios.post(`${base_url}user/adminlogin`, userDate);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;
  const response = await axios.get(`${base_url}user/getOrders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getaOrders = async (id) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;
  const response = await axios.get(`${base_url}user/getOrder/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getMonthlyOrder = async () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;
  const response = await axios.get(`${base_url}user/getMonth`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getYearlyStats = async () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;
  const response = await axios.get(`${base_url}user/getyearly`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${base_url}user/${id}`);
  if (response.data) {
    return response.data;
  }
};

const myProfile = async (udata) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;
  const response = await axios.put(`${base_url}user/edit_user`, udata, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.data) {
    return response.data;
  }
};

const forgetPass = async (userEmail) => {
  const response = await axios.post(`${base_url}user/forgetPassword`, userEmail
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-Password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const authService = {
  login,
  getOrders,
  getaOrders,
  getMonthlyOrder,
  getYearlyStats,
  getUser,
  myProfile,
  forgetPass,
  resetPass
};

export default authService;
