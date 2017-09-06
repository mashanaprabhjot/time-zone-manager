import * as mongoose from 'mongoose';

const timezoneSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    diffToGMT: { type: String, required: true }
});

const TimeZone = mongoose.model('TimeZone', timezoneSchema);

export default TimeZone;
