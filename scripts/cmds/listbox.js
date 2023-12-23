module.exports = {
  config: {
    name: "listbox",
    aliases: [],
    version: "1.0.0",
    author: "Unknown | AceGerome",
    countDown: 15,
    role: 2,
    shortDescription: {
      vi: "",
      en: "List thread bot participated"
    },
    longDescription: {
      vi: "",
      en: "Listing the thread in we're the bot participated."
    },
    category: "OWNER",
    guide: {
      en: "   {pn}"
    } 
  },
  
  onStart: async function({ api, event }) {
  var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

  var listthread = [];

  ///////


  for (var groupInfo of list) {
    let data = (await api.getThreadInfo(groupInfo.threadID));

    listthread.push({
      id: groupInfo.threadID,
      name: groupInfo.name,
      sotv: data.userInfo.length,
    });

  } //for

  var listbox = listthread.sort((a, b) => {
    if (a.sotv > b.sotv) return -1;
    if (a.sotv < b.sotv) return 1;
  });

  let msg = '',
    i = 1;
  var groupid = [];
  for (var group of listbox) {
    msg += `${i++}. ${group.name}\n» TID: ${group.id}\n» Member: ${group.sotv}\n\n`;
    groupid.push(group.id);
  }

  api.sendMessage(msg + 'Reply "out" or "ban" the number of order to out or ban that thread!!', event.threadID, (e, data) =>
    global.GoatBot.onReply.push({
      name: this.config.name,
      author: event.senderID,
      messageID: data.messageID,
      groupid,
      type: 'reply'
    })
  );
}, 

  onReply: async function({ api, event, args, threadsData, onReply }) {

  if (parseInt(event.senderID) !== parseInt(onReply.author)) return;

  var arg = event.body.split(" ");
  var idgr = onReply.groupid[arg[1] - 1];


  switch (onReply.type) {

    case "reply":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          const data = (await threadsData.get(idgr)).data || {};
          data.banned = 1;
          await threadsData.setData(idgr, { data });
          global.data.threadBanned.set(parseInt(idgr), 1);
          api.sendMessage(`[${idgr}] It was successful!`, event.threadID, event.messageID);
          break;
        }

        if (arg[0] == "out" || arg[0] == "Out") {
          api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
          api.sendMessage("Out thread with id: " + idgr + "\n" + (await threadsData.get(idgr)).threadName, event.threadID, event.messageID);
          break;
        }

      }
    }
  }
};