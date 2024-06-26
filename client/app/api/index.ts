import axios from "axios";
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
export const authenticateMerchant = async (address: any, chain: any) => {
  // Send a signup request
  console.log("calling api");

  try {
    const response = await axios.post(
      `${BACKEND_API_BASE_URL}/api/v1/auth/authenticate`,
      {
        address,
        chain,
      }
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    return {
      status: "success",
      message: response.data.message,
      data: response.data,
    };
  } catch (error: any) {
    // Handle any errors

    return { status: "fail", message: error.response.data };
  }
};
export const testSocket = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_API_BASE_URL}/api/v1/auth/test`
    );

    return response;
  } catch (error: any) {
    return { status: "fail", message: error.response.data };
  }
};
export const getUserTransaction = async (address: any) => {
  try {
    const response = await axios.post(
      `${BACKEND_API_BASE_URL}/api/v1/auth/get-user-transaction`,
      {
        address: address,
      }
    );

    return response.data;
  } catch (error: any) {
    return { status: "fail", message: error };
  }
};
export const onboardMerchant = async (address: any) => {
  // Send a signup request
  console.log("calling api");

  try {
    const response = await axios.post(
      `${BACKEND_API_BASE_URL}/api/v1/auth/merchant`,
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
