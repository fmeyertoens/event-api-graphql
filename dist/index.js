"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const index_1 = __importDefault(require("./schema/index"));
const index_2 = __importDefault(require("./resolvers/index"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/api', express_graphql_1.default({
    schema: index_1.default,
    rootValue: index_2.default,
    graphiql: true
}));
const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, PORT } = process.env;
mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    app.listen(PORT);
    console.log(`App listening on Port: ${PORT}`);
})
    .catch(err => {
    console.log(err);
});
