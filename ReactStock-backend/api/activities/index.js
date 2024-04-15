import express from 'express';
import ActivityLog from './activityModel';
import authenticate from '../../authenticate';

const router = express.Router();

// Route to log activity
router.post('/', authenticate, async (req, res) => {
    try {
      const { action, productName } = req.body;
      const username = req.user.username; // Fetch username from authenticated user
      
      const activityLogData = {
        action,
        username,
      };

      // Include productName in the activity log if it exists in the request body
      if (productName) {
        activityLogData.productName = productName;
      }

      const newActivityLog = new ActivityLog(activityLogData);
  
      const savedActivityLog = await newActivityLog.save();
  
      res.status(201).json(savedActivityLog);
    } catch (error) {
      console.error('Error logging activity:', error);
      res.status(500).json({ success: false, msg: 'Internal server error' });
    }
});

// Route to get all activity logs
router.get('/', async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find();
    res.status(200).json(activityLogs);
  } catch (error) {
    console.error('Error getting activity logs:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

// Route to get an activity log by ID
  router.get('/:id', async (req, res) => {
    try {
      const activityLog = await ActivityLog.findById(req.params.id);
      if (!activityLog) {
        return res.status(404).json({ success: false, msg: 'Activity log not found' });
     }
     res.status(200).json(activityLog);
    } catch (error) {
      console.error('Error getting activity log by ID:', error);
      res.status(500).json({ success: false, msg: 'Internal server error' });
    }
  });

// Route to delete an activity log by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedActivityLog = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!deletedActivityLog) {
      return res.status(404).json({ success: false, msg: 'Activity log not found' });
    }
    res.status(200).json({ success: true, msg: 'Activity log deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity log by ID:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

export default router;