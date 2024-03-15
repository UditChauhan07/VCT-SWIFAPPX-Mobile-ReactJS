import axios from "axios";

import { live } from "./liveLink";

export const workerLogin = async (userName, password, company_id) => {
  try {
    const response = await axios.post(`${live}/wxlogin`, {
      username: userName,
      password,
      company_id: `${company_id}`,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workOrderList = async (day, month, year, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkerOrderList`, { day: `${day}`, month: `${month}`, year: `${year}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workOrderWorkersStart = async (workorder_id, time, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkOrderWorkersStart`, { workorder_id: `${workorder_id}`, time: `${time}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workOrderWorkersStartLeader = async (workorder_id, time, accessToken, workers) => {
  try {
    const response = await axios.post(
      `${live}/wxWorkOrderWorkersStart`,
      { workorder_id: `${workorder_id}`, time: `${time}`, workers: workers },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workerOrderDetail = async (id, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkerOrderDetail`, { id: `${id}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const getCommentList = async (id, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkorderCommentlist`, { workorder_id: `${id}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const addComment = async (id, comment, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxAddWorkorderComment`, { workorder_id: `${id}`, comment }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.comment;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const getAdhocItemsList = async (id, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxAdHocItems`, { ad_hoc_catid: `${id}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const uploadPicture = async (workorder_id, file, accessToken) => {
  try {
    console.log(workorder_id, file, accessToken);
    const formData = new FormData();
    formData.append("workorder_id", workorder_id);
    formData.append("file", file);
    console.log(formData);
    const response = await axios.post(`${live}/wxuploadImage`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const removePicture = async (image_id, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxuploadRemoveImage`, { id: image_id }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const getWorkerProfile = async (accessToken) => {
  try {
    const response = await axios.post(`${live}/wxdetails`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const editWorkerProfile = async (name, contact, address, profile_image, accessToken) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("contact", contact);
  formData.append("address", address);
  if (profile_image) {
    console.log(profile_image);
    formData.append("profile_image", profile_image);
  }
  console.log(formData);
  try {
    const response = await axios.post(`${live}/UserProfile`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};

export const uploadSignature = async (workorder_id, file, signOffPerson, signOffRemark, accessToken) => {
  try {
    console.log(workorder_id, file, accessToken);
    const formData = new FormData();
    formData.append("workorder_id", workorder_id);
    formData.append("signOffRemark", signOffRemark);
    formData.append("signOffPerson", signOffPerson);
    formData.append("file", file);
    console.log(formData);
    const response = await axios.post(`${live}/wxuploadSignature`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const workOrderWorkersFinish = async (workorder_id, time, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkOrderWorkersFinish`, { workorder_id: `${workorder_id}`, time: `${time}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
