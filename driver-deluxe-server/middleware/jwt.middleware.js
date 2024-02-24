const { expressjwt: jwt } = require('express-jwt');

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload', // we'll be able to access the decoded jwt in req.payload
  getToken: getTokenFromHeaders, // the function below to extract the jwt
});

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkMTQxNGRjY2Y4MTYyODY2YmE4ZDciLCJlbWFpbCI6InBvdGF0b21hbkBnbWFpbC5jb20iLCJuYW1lIjoiUG90YXRvTWFuIiwiaWF0IjoxNzA3OTM5NTU2LCJleHAiOjE3MDc5NjExNTZ9.bnNHo5ffM4CQ8TPBAOT1vLmIDFnXnuIk7LRXGmjrFDk

function getTokenFromHeaders(req) {
  // checks if the token is available on the request headers
  // format: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // get the token and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

module.exports = { isAuthenticated };
