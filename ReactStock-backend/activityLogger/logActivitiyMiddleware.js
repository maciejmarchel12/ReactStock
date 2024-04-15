import ActivityLog from "../api/activities/activityModel";

const logActivityMiddleware = async (req, res, next) => {
  try {
    // Extract relevant information from the request
    const action = req.method; // Use HTTP method as action (e.g., POST, PUT, DELETE)
    let actionDescription = '';
    let username = '';

    // Determine the appropriate action description based on the HTTP method and route
    switch (req.baseUrl) {
      case '/api/products': // For products routes
        const { productName } = req.body;
        actionDescription = action === 'POST' ? `Product ${productName} created` :
          action === 'PUT' ? `Product ${productName} updated` :
          action === 'DELETE' ? `Product ${productName} deleted` : '';
        username = req.user ? req.user.username : ''; // Check if req.user exists before accessing its properties
        break;
      case '/api/users': // For users routes
        const { username: userUsername } = req.body;
        if (action === 'POST' && !req.originalUrl.endsWith('/login')) {
          // Log user creation and update actions, skip logging for login action
          actionDescription = action === 'POST' ? `User ${userUsername} created` :
            action === 'PUT' ? `User ${userUsername} updated` : '';
          username = req.body.username || ''; // Use provided username or leave it empty for login actions
        } else if (action === 'POST' && req.originalUrl.endsWith('/login')) {
          // Skip logging for login action
          actionDescription = '';
          username = '';
        } else {
          // Log other actions
          actionDescription = action === 'DELETE' ? `User ${userUsername} deleted` : '';
          username = req.user ? req.user.username : ''; // Check if req.user exists before accessing its properties
        }
        break;
      default:
        actionDescription = ''; // For other routes
        break;
    }

    // Log the activity only if a username is provided and actionDescription is not empty
    if (username && actionDescription !== '') {
      await ActivityLog.create({ action, username, details: actionDescription });
    }

    next(); // Move on to the next middleware or route handler
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

export default logActivityMiddleware;