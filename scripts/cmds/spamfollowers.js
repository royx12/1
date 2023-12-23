module.exports = {
  config: {
    name: "spamfollowers",
    aliases: ["spamfb"],
    role: 1, // Only group administrators can use this command
  
    shortDescription: {
      en: "Spam Facebook followers",
      tl: "Mag-spam ng mga Facebook followers"
    },
  
    longDescription: {
      en: "Spam Facebook followers by sending multiple friend requests",
      tl: "Mag-spam ng mga Facebook followers sa pamamagitan ng pagpapadala ng maraming friend requests"
    },
  
    category: "MEDIA",
  
    guide: {
      en: "{p}spamfollowers <targetUserID>",
      tl: "{p}spamfollowers <targetUserID>"
    }
  },
  
  onStart: async function({ event, message, api, args }) {
    const targetUserID = args[0];
    const spamAmount = 10; // Number of friend requests to send
  
    // Send multiple friend requests to the target user
    for (let i = 0; i < spamAmount; i++) {
      await api.addUserToGroup(targetUserID, event.threadID);
    }
  
    message.reply(`Successfully spammed ${spamAmount} friend requests to the user with the ID ${targetUserID}`);
  }
};