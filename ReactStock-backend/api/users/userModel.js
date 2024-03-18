import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    permissionLevel: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee'}
})

UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
}

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
    const saltRounds = 10; //Number of salt rounds can be adjusted

    if (this.isModified('password') || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }

    } else {
        next();
    }
});

export default mongoose.model('User', UserSchema);