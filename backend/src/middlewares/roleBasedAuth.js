const roleBasedAuth = (allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    res.status(403).json({
      message:
        "Forbidden: You don't have enough permission to access this resource.",
    });
  };
};

export default roleBasedAuth;
