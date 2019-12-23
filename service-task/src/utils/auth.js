import axios from 'axios';

const validateToken = async (token) => {
  try {
    const authServiceUrl = `${process.env.SERVICE_AUTH_HOST_URL}/api/internal/validate-token`;
    const user = process.env.INTERNAL_USER;
    const password = process.env.INTERNAL_PASSWORD;
    const auth = 'Basic ' + Buffer.from(user + ':' + password).toString('base64');

    return await axios.post(authServiceUrl, { token }, {
      headers: { 'Authorization': auth }
    });
  } catch (e) {
    console.error(e);
  }
};

export const validateTokenAndGetUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).end();
  }
  const authHeader = authorization.split(' ');

  if (authHeader[0] !== 'Bearer') {
    return res.status(401).end();
  }

  if (authHeader[0] === 'Bearer') {
    try {
      const { data } = await validateToken(authHeader[1]);

      req.user = data;
      next();
    } catch (e) {
      return res.status(401).end();
    }
  }
};
