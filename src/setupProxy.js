module.exports = function(app) {
  // Allow imports from node_modules/react-refresh
  app.use((req, res, next) => {
    if (req.url.includes('react-refresh')) {
      res.header('Access-Control-Allow-Origin', '*');
    }
    next();
  });
};
