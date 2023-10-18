"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express = require("express");
const authRouter = express.Router();
exports.authRouter = authRouter;
/**
 * -------------- ROUTES ----------------
 */
// When you visit http://localhost:3000/login, you will see "Login Page"
authRouter.get("/login", (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});
// Since we are using the passport.authenticate() method, we should be redirected no matter what
authRouter.post("/login", (req, res, next) => { });
// When you visit http://localhost:3000/register, you will see "Register Page"
authRouter.get("/register", (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});
authRouter.post("/register", (req, res, next) => { });
/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
authRouter.get("/protected-route", (req, res, next) => {
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    }
    else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});
authRouter.get("/login-success", (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});
authRouter.get("/login-failure", (req, res, next) => {
    res.send("You entered the wrong password.");
});
// Visiting this route logs the user out
authRouter.get("/logout", (req, res, next) => {
    req.logout(() => {
        res.redirect("/protected-route");
    });
});
