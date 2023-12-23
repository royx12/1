module.exports = {
  config: {
    name: "hi",
    author: " Ace",
    role: 0,
    guide: {
      en: "   NO GUIDE LOL"
    } 
  },

  onStart: async function({}) {},
  onChat: async function({ message, event, usersData, threadsData }) {
  try {
      const name = await usersData.getName(senderID);
              return name[senderID].firstName;
    } catch (error) {
       console.error(error);
    }
const { senderID, body, threadID, messageID } = event;

const data = await usersData.getName(senderID);
const userName = data.name;
const tdata = await threadsData.get(threadID);
const threadName = tdata.threadName;

const array = [`Hi, ${name} Your Cute🤭`, `Hello love, how can i help you today?`, `Kamusta ${name}? `, `‎👋 Hello there! Master ${name}, have good and a pleasant day to you Master, what are you doing?`, `Hello`, `Hi my love😘`]
const msg = array[Math.floor(Math.random() * array.length)];

if (body.startsWith("hi") || body.startsWith("hello") ||
body.startsWith("Hello") ||
body.startsWith("Hi")) {
message.reply({
          body: msg, 
          mentions: [{
                        tag: name,
                        id: senderID
              }]
        }, threadID, messageID);
        return;
      }
   },
};