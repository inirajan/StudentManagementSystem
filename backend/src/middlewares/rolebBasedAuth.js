const roleBasedAuth = (allowedRoles) => {
  return (req, res, next) => {
    if (req.user.role.includes(allowedRoles)) return next();

    res.status(403).json({
      message:
        "Forbidden: You don't have enough permission to access this resource.",
    });
  };
};

export default roleBasedAuth;
