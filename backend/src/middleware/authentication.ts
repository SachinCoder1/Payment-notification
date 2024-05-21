const jwt = require("jsonwebtoken");
export const generateRefreshToken = (id: any) => {
  const data = {
    id,
  };
  const options = {
    expiresIn: "1d",
  };
  const accessToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, options);
  return accessToken;
};

export const generateAccessToken = (id: any) => {
  const data = {
    id,
  };
  const options = {
    expiresIn: "1m",
  };

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, options);
  return accessToken;
};
