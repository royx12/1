const axios = require('axios');

module.exports = {
  config: {
    name: 'chess',
    aliases: ['chess'],
    version: '1.0',
    author: 'AceGerome',
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: '',
      en: 'Generate random Chess quotes and tips.'
    },
    longDescription: {
      vi: '',
      en: 'Generate random Chess quotes and tips.'
    },
    category: 'fun',
    guide: {
      en: '⠀⠀⠀{pn} quotes'
        + '\n{pn} tips'
    }
  },
  onStart: async function ({ api, args, event, message }) {
    try {
      if (args[0] === 'quotes') {
        const quotesLink = 'https://raw.githubusercontent.com/AceAkira1017/JSON/main/quotes.json';
        const response = await axios.get(quotesLink);
        const chessQuotesResponse = response.data.quotes;

        if (!chessQuotesResponse || chessQuotesResponse.length === 0) {
          return message.reply('No Chess Quotes Available now, please try again later.', event.threadID, event.messageID);
        }

        const randomQuoteIndex = Math.floor(Math.random() * chessQuotesResponse.length);
        const randomChessQuote = chessQuotesResponse[randomQuoteIndex];

        const message = ` 𝗖𝗵𝗲𝘀𝘀 𝗤𝘂𝗼𝘁𝗲:  ${randomChessQuote.quote} \n\n — ${randomChessQuote.author}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } 
      else if (args[0] === 'tips') {
        const tipsLink = 'https://raw.githubusercontent.com/AceAkira1017/JSON/main/tips.json';
        const response = await axios.get(tipsLink);
        const chessTipsResponse = response.data.tips;

        if (!chessTipsResponse || chessTipsResponse.length === 0) {
          return message.reply('No Chess Tips Available now, please try again later.', event.threadID, event.messageID);
        }

        const randomTipIndex = Math.floor(Math.random() * chessTipsResponse.length);
        const randomChessTip = chessTipsResponse[randomTipIndex];

        const message = ` 𝗖𝗵𝗲𝘀𝘀 𝗧𝗶𝗽𝘀:  ${randomChessTip.tip}\n\n — ${randomChessTip.category}`;
        message.reply(message, event.threadID, event.messageID);
      } else {
        return message.SyntaxError();
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching chess content. Please try again later.', event.threadID, event.messageID);
    }
  },
};