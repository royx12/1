const axios = require("axios");

const cheerio = require("cheerio");


module.exports = {

  config: {

    name: "wattpad",

    version: "1.0",

    author: "Unknown",

    role: 0, // Role of the user to use this command (0: normal user)

    shortDescription: {

      en: "Retrieve Wattpad stories.",

    },

    category: "MEDIA",

    guide: {

      en: "Use this command to retrieve Wattpad stories.",

    },

  },


  onStart: async function ({ api, event, args }) {

    const searchTerm = args.join(" ");


    try {

      const response = await axios.get("https://www.wattpad.com/search/" + searchTerm);

      const $ = cheerio.load(response.data);

      const stories = [];


      $(".story-card-data.hidden-xxs > div.story-info").each((index, element) => {

        const $element = $(element);


        const story = {

          title: $element.find("> div.title").text(),

          view: $element.find("> ul > li:nth-child(1) > div.icon-container > div > span.stats-value").text(),

          vote: $element.find("> ul > li:nth-child(2) > div.icon-container > div > span.stats-value").text(),

          chapter: $element.find("> ul > li:nth-child(3) > div.icon-container > div > span.stats-value").text(),

          url: "https://www.wattpad.com" + $element.find('a').attr('href'),

          thumb: $element.find("> div.cover > img").attr("src"),

          description: $element.find("> div.description").text().replace(/\n/g, ''),

        };


        stories.push(story);

      });


      api.sendMessage("Fetching Wattpad stories... 📝", event.threadID);


      const topStories = stories.slice(0, 2);


      let message = "";

      topStories.forEach((story, index) => {

        message += `[${index + 1}] Title: ${story.title}\nAuthor: ${story.author}\nViews: ${story.view}\nVotes: ${story.vote}\nChapters: ${story.chapter}\nDescription: ${story.description}\nURL: ${story.url}\n\n`;

      });


      api.sendMessage(message, event.threadID, event.messageID);

    } catch (error) {

      console.error(error);

      api.sendMessage("An error occurred while fetching Wattpad stories. 🤖😢", event.threadID);

    }

  },

};