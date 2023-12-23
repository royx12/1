const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "art",
    aliases: [],
    version: "1.1",
    author: "rihat-- | Ace",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Convert photo to anime art image."
    },
    longDescription: {
      vi: "",
      en: "Convert photo to anime art image."
    },
    category: "IMAGE",
    guide: {
      en: "   {pn} - reply to an image."
    }
  },
  
  onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    try {
      if (args.length >= 2 || (event.type === "message_reply" && event.messageReply.attachments.length > 0 && event.messageReply.attachments[0].type === "photo")) {
        message.reply("Transforming Image, Please Wait...⏳");
        const defultModel = '1';
        
        const imageUrl = event.type === "message_reply" ? event.messageReply.attachments[0].url : args[0];
        const prompt = event.type === "message_reply" ? "same pose, same person, same environment, all same just add anime effect, anime look, boy will be a boy handsome, girl will be a girl cute and beatiful, high quality" : args.slice(1).join(" ");

        const formData = new FormData();
        formData.append("key", "d6a98820a85d189570dda8a2e19b117d");
        formData.append("image", imageUrl);

        const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
          headers: formData.getHeaders(),
        });
        const imgbbImageUrl = imgbbResponse.data.data.url;
        const ApiName = `art-sdxl.api-tu33rtle`;
        const response = await axios.get(`https://${ApiName}.repl.co/api/art?imgurl=${imgbbImageUrl}&prompt=${prompt}&model=${defultModel}`, {
          responseType: "arraybuffer",
        });

        const imageBuffer = Buffer.from(response.data);
        const pathSave = path.join(__dirname, "art.png");
        await saveArrayBufferToFile(imageBuffer, pathSave);

        message.reply(
          {
            attachment: fs.createReadStream(pathSave),
          },
          () => {
            fs.unlinkSync(pathSave);
          }
        );
      } else if (event.type === "message_reply") {
        message.reply("Reply with an image.");
      } 
    } catch (e) {
      console.error(e);
      message.reply("Something went wrong.");
    }
  },
};

async function saveArrayBufferToFile(arrayBuffer, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}