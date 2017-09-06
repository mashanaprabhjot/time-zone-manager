"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var timezoneSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    diffToGMT: { type: String, required: true }
});
var TimeZone = mongoose.model('TimeZone', timezoneSchema);
exports.default = TimeZone;
//# sourceMappingURL=timezone.js.map