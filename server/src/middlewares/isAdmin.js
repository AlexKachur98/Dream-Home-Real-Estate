

/**
 * Middleware to verify if the authenticated user has admin role.
 * Checks if the user's role is 'admin' and either allows the request to proceed
 * or returns a 403 Forbidden response.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.user - The authenticated user object (must be set by previous middleware)
 * @param {string} req.user.role - The role of the authenticated user
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} Returns 403 JSON response if user is not admin, otherwise calls next()
 */
export default function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};
