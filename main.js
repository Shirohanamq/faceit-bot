// Discordjs
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token, apiKey } = require("./config.json");

// FACEIT JS
const Faceit = require("./lib/faceit-js");
const api = new Faceit(apiKey);

// Functions
const { playerStats, lastPlayerStats } = require("./lib/modules");

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  console.log(message.content);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send("At your command, sire!");
  } else if (command === "server") {
    message.channel.send(`You are currently in: ${message.guild.name} Server`);
  } else if (command === "faceit" || command === "f") {
    if (!args.length) {
      return message.channel.send("You need to provide a username!");
    } else if (args[1] === "last") {
      if (args[2] > 99) {
        return message.channel.send(
          "Are you trying to crash me? The limit is 99."
        );
      }
      lastPlayerStats(args, message, api, Discord);
    } else {
      playerStats(args, message, api, Discord);
    }
  }
});

client.login(token);
