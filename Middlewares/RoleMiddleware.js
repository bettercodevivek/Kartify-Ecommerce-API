
const RoleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user || req.user.role !== requiredRole) {
                return res.status(403).json({ error: `Access denied: ${requiredRole} role required` });
            }
            next();
        } catch (err) {
            res.status(500).json({ error: 'Server Error in Role Middleware' });
        }
    };
};

module.exports = RoleMiddleware;
