/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const { Telegraf } = require('telegraf');
require('dotenv').config();
const {getCharactersById, 
  getCharactersByLetter, 
  getAllCharacters
} = require('./getData');
const {BOT_TOKEN} = process.env;
const bot = new Telegraf(BOT_TOKEN);


bot.start(({ reply }) => {
  return reply('Welcome to Got service!!!', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Search character', switch_inline_query_current_chat: '' }
        ]        
      ]
    }
  }
  )
});
bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  let input = inlineQuery.query.trim();  
  let results;
 
  if (!isNaN(parseInt(input))) {    
    console.log(parseInt(input));
    results = await getCharactersById(input);
  } else if(typeof input === 'string') {
    results = await getCharactersByLetter(input);
  } else if (!input) {    
    results = await getAllCharacters();
  }
  
  const new_results = results.map((result, i) => {   
    return {
      type: 'article',
      id: i,
      title: result.fullname,
      description: !!input ?  `${result.title}\nHouse of ${result.family}` : result.title, 
      thumb_url: result.image,
      input_message_content: {
        message_text: `${result.fullname}, ${result.title}\nHouse of ${result.family}\n${result.image}`,
      },      
    }
  });
  answerInlineQuery(new_results);
});
bot.on('chosen_inline_result', ctx => {
  console.log('You chosed an inline query result')
});
bot.startPolling();