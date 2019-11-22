"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../event/event.model"));
const mockData = require('../event/event-mock-100.json');
const resolvers = {
    events: async () => {
        try {
            const events = await event_model_1.default.find();
            return events;
        }
        catch (error) {
            throw error;
        }
    },
    eventsLocal: () => {
        return mockData;
    }
};
exports.default = resolvers;
