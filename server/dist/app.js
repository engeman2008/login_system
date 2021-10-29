"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const cors_1 = tslib_1.__importDefault(require("cors"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const passport_1 = tslib_1.__importDefault(require("passport")); // authorization
const express_flash_message_1 = require("express-flash-message");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const models_1 = tslib_1.__importDefault(require("./models"));
const index_1 = tslib_1.__importDefault(require("./routes/index"));
// initialize configuration
dotenv_1.default.config();
const app = express_1.default();
app.use(body_parser_1.json());
const corsOptions = {
    origin: 'http://localhost:8081',
};
app.use(cors_1.default(corsOptions));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(cookie_parser_1.default());
// create application/json parser
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_session_1.default({
    secret: 'some secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_flash_message_1.flash());
// Configure routes
app.use(index_1.default);
app.use(error_middleware_1.default);
// db.sequelize.sync();
// for dev to drop existing tables and resync
models_1.default.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});
const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
