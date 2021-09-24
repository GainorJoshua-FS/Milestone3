class Game{
    constructor(){
        this.img = '';
        this.title = '';
        this.time = 0;
        this.players = 0;
        this.desc = '';
        this.index = 0
    }
}

var gamesArray = [
    {
        'title':'Ascension',
        'time': 30,
        'players': 4,
        'desc':'Ascension is a deck-building game in which players spend Runes to acquire more powerful cards for their deck.',
        'index': 1
    },
    {
        'title':'Catan',
        'time': 120,
        'players': 4,
        'desc':'Players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces.',
        'index': 2
    },
    {
        'title':'Dice_City',
        'time': 60,
        'players': 4,
        'desc':'Dice City is a "dice-crafting" game in which the locations in your city act as the changing faces of your dice each turn. Use tactics and strategy to press your claim!',
        'index': 3
    },
    {
        'title':'Exploding_Kittens',
        'time': 15,
        'players': 5,
        'desc':'Exploding Kittens is a kitty-powered version of Russian Roulette. Players take turns drawing cards until someone draws an exploding kitten and loses the game. The deck is made up of cards that let you avoid exploding by peeking at cards before you draw, forcing your opponent to draw multiple cards, or shuffling the deck.',
        'index': 4
    }
];