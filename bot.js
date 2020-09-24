/* eslint-disable no-undef */
'use strict';
const { Telegraf } = require('telegraf');
require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
bot.launch();