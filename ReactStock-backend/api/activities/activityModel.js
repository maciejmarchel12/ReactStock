import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActivityLogSchema = new Schema ({
    action: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String },
});

const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

export default ActivityLog;