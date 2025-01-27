export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';


  res
    .status(statusCode)
  res.cookie(cookieName, token, {
  expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Secure cookies for HTTPS
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // 'None' for cross-origin
});

    .json({
      success: true,
      message,
      user,
      token,
    });
};
