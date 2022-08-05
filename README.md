# FACEIT Stats Bot
A Discord Bot for FACEIT for retrieving a player's stats. 

## Working
The working of the bot is pretty straightforward once you have it deployed (or you can test it locally on your system). 

By default, the command prefix of the bot is: `.`

For example, you can check if the bot is online via: `.ping`

The default prefix can obviously be changed to whatever you like from the config.js folder. 

### Fetching Player Stats
To fetch player stats, you can use the `.f PLAYERNAME last [AMOUNT OF GAMES]` command. 

**AMOUNT OF GAMES** is capped at ***99***, so you can only view the stats of the last 99 matches only. Replace **PLAYERNAME** with the FACEIT name of the player that you wish to search up.

### Example
A real example would be as follows: 

`.f nightshade last 5`

![Bot example screenshot](https://i.imgur.com/4BfYSkQ.png)
