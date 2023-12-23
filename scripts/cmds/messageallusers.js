module.exports = {
  config: {
    name: "messageallusers",
    aliases: ["mau"],
    version: "1.0",
    author: "Eldwin | Goatai",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Messages all users along with their user IDs",
      tl: "Mga mensahe sa lahat ng mga user kasama ang kanilang mga user ID"
    },
    longDescription: {
      en: "Messages all users along with their user IDs",
      tl: "Mga mensahe sa lahat ng mga user kasama ang kanilang mga user ID"
    },
    category: "goatBot",
    guide: {
      en: "{p}messageallusers <message>",
      tl: "{p}messageallusers <mensahe>"
    }
  },
  onStart: async function ({ event, message, args, threadsData, usersData, api }) {
    const messageToSend = event.body.substring(event.body.indexOf(" ") + 1);

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const userList = [];

    threadList.forEach((thread) => {
      thread.participantIDs.forEach(async (userID) => {
        if (!userList.includes(userID) && userID !== api.getCurrentUserID()) {
          userList.push(userID);

          try {
            await message.reply(`Hello <@${userName}>! Your user ID is: ${userID}. Message from the bot's admin: ${messageToSend}`);
            console.log(`Message sent to user with ID: ${userID}`);
          } catch (error) {
            console.log(`Failed to send message to user with ID: ${userID}`);
          }
        }
      });
    });
  }
};