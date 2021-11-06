"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const body_parser_1 = require("body-parser");
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const cookie_parser_1 = (0, tslib_1.__importDefault)(require("cookie-parser"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const express_session_1 = (0, tslib_1.__importDefault)(require("express-session"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
require("./config/passport.config");
const connect_flash_1 = (0, tslib_1.__importDefault)(require("connect-flash"));
const error_middleware_1 = (0, tslib_1.__importDefault)(require("./middlewares/error.middleware"));
const activation_middleware_1 = (0, tslib_1.__importDefault)(require("./middlewares/activation.middleware"));
const models_1 = (0, tslib_1.__importDefault)(require("./models"));
const index_1 = (0, tslib_1.__importDefault)(require("./routes/index"));
// initialize configuration
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const corsOptions = {
    origin: 'http://localhost:8081',
};
app.use((0, cors_1.default)(corsOptions));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use((0, cookie_parser_1.default)());
// create application/json parser
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_session_1.default)({
    secret: 'some secret',
    saveUninitialized: true,
    resave: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, connect_flash_1.default)());
app.use(activation_middleware_1.default);
app.use(index_1.default);
// Handling non matching request from the client
app.use((req, res) => {
    res.redirect('/404');
});
app.use(error_middleware_1.default);
// db.sequelize.sync();
// for dev to drop existing tables and resync
models_1.default.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db.');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
