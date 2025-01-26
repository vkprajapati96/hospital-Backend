export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  const isProduction = process.env.NODE_ENV === 'production';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: isProduction, // Secure cookie in production
      sameSite: isProduction ? 'strict' : 'lax', // Prevent CSRF
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
