const axios = require('axios');
const request = require('request');
const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "WorldClock",
    aliases: ['worldclock', 'clock'],
    version: "1.0.0",
    author: "Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "View the dates and times of Country."
    },
    longDescription: {
      vi: "",
      en: "View the dates and times of Country provided by User."
    },
    category: "tools",
    guide: {
      en: "   {pn}"
    }
  },
  
  onStart: async ({ api, event }) => {
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
    
    var gio2 = moment.tz("Europe/Lodon").format("HH:mm:ss || D/MM/YYYY");
    
    var gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
    
    var gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
    
    var gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
    
    var gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
    
    var gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");
    
    var gio1 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
    
    var gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");
    
    var gio8 = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
  axios.get('https://apituandz1407.herokuapp.com/api/gaisexy.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
  api.sendMessage({
  body: `View Date and Time in Country:

-🇵🇭Philippines: ${gio8}

-🇻🇳 Vietnam𝐢: ${gio}

-🇬🇧 London: ${gio2}

-🇺🇸 New York: ${gio5}

-🇰🇷 Seoul: ${gio3}

-🇯🇵 Tokyo: ${gio4}

-🇧🇷 Brasilia: ${gio1}

-🇲🇾 Kuala Lumpur: ${gio6}

-🇫🇷 Paris: ${gio7}`,
  attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
   };
  request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
 }
};