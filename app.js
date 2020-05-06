new Vue({
    el: '#app',
    data: {
        myChoice: null,
        computerChoice: null,
        count: 3,
        winner: null,
        lifeOfMe: 3,
        lifeOfComputer: 3,
        isSelectable: true,
        logs: [],
        options: [
            { name: 'Scissors', value: 'scissors'},
            { name: 'Rock', value: 'rock'},
            { name: 'Paper', value: 'paper'}
        ]
    },
    computed: {
        myChoiceImg: function () {
            return this.myChoice !== null ? `images/${this.myChoice}.jpg` : 'images/question.jpg'
        },
        computerChoiceImg: function () {
            return this.computerChoice !== null ? `images/${this.computerChoice}.jpg` : 'images/question.jpg'
        },
        leftLifeOfMe: function () {
            return 3 - this.lifeOfMe;
        },
        leftLifeOfComputer: function () {
            return 3 - this.lifeOfComputer;
        }
    },
    watch: {
        count: function (newValue) {
            if (newValue === 0) {
                this.computerPick();

                this.theWinner();

                this.count = 3;

                this.isSelectable = true;

                this.updateLogs();

            }
        },

        lifeOfMe: function (newValue) {
            if (newValue === 0) {
                this.endGame('SORRY, YOU LOST')

            }
        },
        lifeOfComputer: function (newValue) {
            if (newValue === 0) {
                this.endGame('GREAT!! YOU WON!')
            }
        }
    },


    methods: {
        startGame: function () {
            this.isSelectable = false;
            if (this.myChoice === null) {
                alert('Choose one option')
                this.isSelectable = true;
            } else {
                let countDown = setInterval(() => {
                    this.count--
                    if (this.count === 0) {
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        },
        computerPick: function () {
            let number = Math.random()
            if (number < 0.33) {
                this.computerChoice = 'scissors'
            } else if (number < 0.66) {
                this.computerChoice = 'rock'
            } else {
                this.computerChoice = 'paper'
            }
        },
        theWinner: function () {
            if (this.myChoice === this.computerChoice) this.winner = 'no one'
            else if (this.myChoice === 'rock' && this.computerChoice === 'scissors') this.winner = 'me'
            else if (this.myChoice === 'scissors' && this.computerChoice === 'peper') this.winner = 'me'
            else if (this.myChoice === 'paper' && this.computerChoice === 'rock') this.winner = 'me'
            else if (this.myChoice === 'rock' && this.computerChoice === 'paper') this.winner = 'computer'
            else if (this.myChoice === 'scissors' && this.computerChoice === 'rock') this.winner = 'computer'
            else if (this.myChoice === 'paper' && this.computerChoice === 'scissors') this.winner = 'computer'
            else this.winner = 'error'

            if (this.winner === 'me') {
                this.lifeOfComputer--
            }
            else if (this.winner === 'computer') {
                this.lifeOfMe--
            }
        },
        updateLogs: function () {
            let log = {
                message: `You: ${this.myChoice}, Computer: ${this.computerChoice}`,
                winner: this.winner
            }

            this.logs.unshift(log)
        },
        endGame: function (msg) {
            setTimeout(() => {
                confirm(msg)
                this.lifeOfMe = 3;
                this.lifeOfComputer = 3;
                this.myChoice = null;
                this.computerChoice = null;
                this.winner = null;
                this.logs = [];
            }, 500)
        }

    }
})