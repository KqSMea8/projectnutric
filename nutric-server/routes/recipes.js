const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });

// const { /* HANDLERS HERE */ } = require("../handlers/recipes");

const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

// prefix: /api/recipes