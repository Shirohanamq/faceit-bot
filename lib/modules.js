async function playerStats(args, message, api, Discord) {
  try {
    const playerData = await api.nickname(args[0]);
    const playerElo = playerData.games.csgo.faceit_elo;
    const playerAvatar = playerData.avatar;
    const playerProfile = `https://www.faceit.com/en/players/${args[0]}`;
    let playerLevel = playerData.games.csgo.skill_level;

    const playerStatsData = await api.players(
      `${playerData.player_id}`,
      "stats",
      "csgo"
    );

    const playerKD = playerStatsData.lifetime["Average K/D Ratio"];
    const winrate = `${playerStatsData.lifetime["Win Rate %"]}%`;
    const headshots = `${playerStatsData.lifetime["Average Headshots %"]}%`;
    const wins = playerStatsData.lifetime.Wins;
    const winStreak = playerStatsData.lifetime["Longest Win Streak"];
    let results = "";
    for (let result of playerStatsData.lifetime["Recent Results"]) {
      if (result === "0") {
        result = "❌";
      } else {
        result = "🏆";
      }
      results += ` ${result}`;
    }
    const statsEmbed = new Discord.MessageEmbed()
      .setColor("#610961")
      .attachFiles([`./assets/${playerLevel}.png`])
      .setAuthor(
        `${args[0]}'s Stats`,
        `attachment://${playerLevel}.png`,
        playerProfile
      )
      .setTitle(`ELO: ${playerElo}`)
      .setThumbnail(`${playerAvatar}`)
      .addFields(
        {
          name: "**K/D**",
          value: playerKD,
          inline: true,
        },
        {
          name: "**Winrate**",
          value: winrate,
          inline: true,
        },
        {
          name: "**Headshots %**",
          value: headshots,
          inline: true,
        },
        {
          name: "**Wins**",
          value: wins,
          inline: true,
        },
        {
          name: "**Longest Win Streak**",
          value: winStreak,
          inline: true,
        },
        {
          name: "**Recent Results**",
          value: results,
          inline: true,
        }
      )
      .setFooter("FACEIT Stats By TeamExec - Developed by Nightshade");
    message.channel.send(statsEmbed);
  } catch (err) {
    message.channel.send(
      "The server couldn't process the request. Are you sure you entered the correct name? Names are case-sensitive."
    );
    console.error(err);
  }
}

async function lastPlayerStats(args, message, api, Discord) {
  try {
    let playerStats = {
      Kills: 0,
      Deaths: 0,
      Assists: 0,
      MVPs: 0,
      HS: 0,
      HSP: 0,
      KD: 0,
      KR: 0,
      triple: 0,
      quadro: 0,
      ace: 0,
    };
    const playerPromise = await api.nickname(args[0]);
    const playerID = playerPromise.player_id;
    const playerAvatar = playerPromise.avatar;
    const playerElo = playerPromise.games.csgo.faceit_elo;
    const matchHistory = await api.players(
      `${playerID}`,
      "history",
      "csgo",
      `${args[2]}&from=1609488000`
    );
    let matchIDs = matchHistory.items.map((match) => match.match_id);
    const divider = matchIDs.length;
    for (const match of matchIDs) {
      const matchStats = await api.matches(match, "stats");
      for (const team of matchStats.rounds[0].teams) {
        for (const player of team.players) {
          if (player.nickname === args[0]) {
            playerStats.Kills += Number(player.player_stats.Kills);
            playerStats.Deaths += Number(player.player_stats.Deaths);
            playerStats.Assists += Number(player.player_stats.Assists);
            playerStats.MVPs += Number(player.player_stats.MVPs);
            playerStats.KD += Number(player.player_stats["K/D Ratio"]);
            playerStats.KR += Number(player.player_stats["K/R Ratio"]);
            playerStats.HS += Number(player.player_stats.Headshots);
            playerStats.HSP += Number(player.player_stats["Headshots %"]);
            playerStats.triple += Number(player.player_stats["Triple Kills"]);
            playerStats.quadro += Number(player.player_stats["Quadro Kills"]);
            playerStats.ace += Number(player.player_stats["Penta Kills"]);
          }
        }
      }
    }
    const statsEmbed = new Discord.MessageEmbed()
      .setColor("#610961")
      .setTitle(`${args[0]}'s last ${args[2]} games`)
      .setAuthor(
        "FACEIT Stats by TeamExec Bot",
        "https://i.imgur.com/4VrVksI.jpg"
      )
      .setThumbnail(`${playerAvatar}`)
      .addFields(
        {
          name: "**Average Kills**",
          value: `${Math.round(playerStats.Kills / divider)}`,
          inline: true,
        },
        {
          name: "**Average Deaths**",
          value: `${Math.round(playerStats.Deaths / divider)}`,
          inline: true,
        },
        {
          name: "**Average K/D**",
          value: `${Math.round((playerStats.KD / divider) * 100) / 100}`,
          inline: true,
        },
        {
          name: "**Average Assists**",
          value: `${Math.round(playerStats.Assists / divider)}`,
          inline: true,
        },
        {
          name: "**Average MVPs**",
          value: `${Math.round(playerStats.MVPs / divider)}`,
          inline: true,
        },
        {
          name: "**Average Headshots**",
          value: `${Math.round(playerStats.HS / divider)}`,
          inline: true,
        },
        {
          name: "**Average K/R**",
          value: `${Math.round((playerStats.KR / divider) * 100) / 100}`,
          inline: true,
        },
        {
          name: "**Average Headshots %**",
          value: `${Math.round(playerStats.HSP / divider)}`,
          inline: true,
        },
        {
          name: "**Triple Kills**",
          value: `${playerStats.triple}`,
          inline: true,
        },
        {
          name: "**Quadro Kills**",
          value: `${playerStats.quadro}`,
          inline: true,
        },
        {
          name: "**Aces**",
          value: `${playerStats.ace}`,
          inline: true,
        },
        {
          name: "**ELO**",
          value: `${playerElo}`,
          inline: true,
        }
      )
      .setFooter("Developed by Nightshade - Founder TeamExec");
    message.channel.send(statsEmbed);
  } catch (err) {
    message.channel.send(
      "The server couldn't process the request. Are you sure you entered the correct name? Names are case-sensitive."
    );
    console.error(err);
  }
}

module.exports = { playerStats, lastPlayerStats };
