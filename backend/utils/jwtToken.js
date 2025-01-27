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
      httpOnly: false, // Prevent client-side access
      secure: isProduction, // Only set in HTTPS
      sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-origin
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
