import axios from "axios";
// const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;
export const authenticateMerchant = async (address: any, chain: any) => {
  // Send a signup request
  console.log("calling api");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/auth/authenticate`,
      {
        address,
        chain,
      }
    );

    console.log("response", response);

    localStorage.setItem("accessToken", response.data.accessToken);
    return {
      status: "success",
      message: response.data.message,
    };
  } catch (error: any) {
    // Handle any errors

    return { status: "fail", message: error.response.data };
  }
};
export const onboardMerchant = async (address: any) => {
  // Send a signup request
  console.log("calling api");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/auth/merchant`,
      {
        address,
      }
    );

    console.log("response of onboardMerchant", response);

    return response.data;
  } catch (error: any) {
    // Handle any errors

    return { status: "fail", message: error.response.data };
  }
};
