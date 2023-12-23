const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const request = require("request");
const yts = require("yt-search");

module.exports = {
  config: {
    name: "playrics",
    //aliases: ['playrics'],
    version: "1.0",
    author: "Ace",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Play the music provide by user."
    },
    longDescription: {
      vi: "",
      en: "Play the music with lyrics as user-provided."
    },
    category: "music",
    guides: {
      en: "   {pn} < music >"
    }
  },
  
  onStart: async function({ api, event, args, message }) {
    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");
    
    if (data.length < 2) {
      return api.sendMessage("Please put a song name!", event.threadID);
    }
    
    data.shift();
    const musicName = data.join(" ");
    const lyrics = args.join(' ');
    
    if (!lyrics) {
        return api.sendMessage("", event.threadID);
    }
    
    try {
        api.sendMessage(`Finding lyrics for "${musicName}", please wait...`, event.threadID);
        
        const lyricsData = await axios.get(`https://for-devs.rishadapis.repl.co/api/lyrics/get`, {
        params: {
          apikey: "fuck",
          query: lyrics 
        }
      });

        const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        return api.sendMessage("I dont like this music. 🤮", event.threadID, event.messageID);
      }

        const music = searchResults.videos[0];
        const musicUrl = music.url;

      const stream = ytdl(musicUrl, {
          filter: "audioonly"
      });

      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('❌ | The file could not be sent because it is larger than 25MB.', event.threadID);
        }

        const message = {
          body: `Here's your music request! \n\n❏Title: ${lyricsData.title || ''}\n\n❏Artist: ${lyricsData.artist || ''}\n\n❏Lyrics:\n\n ${lyricsData.lyrics || ''}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};