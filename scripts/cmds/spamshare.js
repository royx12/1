const axios = require('axios');

module.exports.config = {
  name: "fbtoken",
  version: "5.0.1",
  hasPermssion: 0,
  credits: "Ber",//credits sa api
  description: "GET FB ACCESS_TOKEN, EAAD6V7, COOKIES",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[email/uid] [password]",
  cooldowns: 20,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 1500
  }
};

module.exports.run = async ({ api, event, args }) => {

  if ((this.config.credits) != "Ber") { return api.sendMessage(`[ 𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 ]
  𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: 
  ᴄʜᴀɴɢᴇ ᴄʀᴇᴅɪᴛs ᴘᴀ ᴀᴋᴏ sᴀʏᴏ ᴍᴀɢ ᴘʀᴀᴄᴛɪᴄᴇ ᴋᴀ😝 
  𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
  𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚘𝚛 https://facebook.com/${global.config.BOTADMIN} 𝚒𝚜 𝚊 𝚌𝚑𝚊𝚗𝚐𝚎 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚛 𝚔𝚊𝚢𝚊 𝚋𝚎 𝚊𝚠𝚊𝚛𝚎 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎.

  𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: 
  https://facebook.com/100092359574131

  `, event.threadID, event.messageID)}

  const { threadID, messageID } = event;
  const username = args[0];
  const password = args[1];

  if (!username || !password) {
    api.sendMessage(`Invalid Input!\nUsage: ${global.config.PREFIX}token [email/uid] [password]`, threadID, messageID);
    return;
  }

  api.sendMessage("GETTING EAAD6V7 TOKEN/ACCESS TOKEN/COOKIES🕜", threadID, messageID);

  try {
    const tokenData = await retrieveToken(username, password);
    if (tokenData) {
      api.sendMessage(`HERE'S YOUR ACCESS TOKEN🪙:\n${tokenData.data.access_token}`, threadID, messageID);
      api.sendMessage(`HERE'S YOUR COOKIES:🍪:\n${tokenData.data.cookies}`, threadID, messageID);
      api.sendMessage(`HERE'S YOUR EAAD6V7 TOKEN💱:\n${tokenData.data.access_token_eaad6v7}`, threadID, messageID);
    } else {
      api.sendMessage("Failed to retrieve token.", threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`${error}\n\nDouble-check your password. If it still doesn't work, try changing your password and using the command again.`, threadID, messageID);
  }
};

async function retrieveToken(username, password) {
  const endpoint = `https://hiroshi.hiroshiapi.repl.co/facebook/token?username=${username}&password=${password}`;

  try {
    const response = await axios.get(endpoint);
    const tokenData = response.data;

    return tokenData;
  } catch (error) {
    throw error;
  }
}