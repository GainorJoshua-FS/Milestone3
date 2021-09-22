window.addEventListener("load", function(){
    console.log("page loaded");
    //instantiate singleton
    let library = Library.getInstance();
});

class Library{
    constructor(){
        let mylibrary = new MyLibrary();
    }

    static getInstance(){
        if(!Library._instance){
            Library._instance = new Library();
            return Library._instance;
        }
        else{
            throw "Singleton already created in librar!";
        }
    }
}

class MyLibrary{
    constructor(){
        let addGame = document.querySelector('.addBtn').addEventListener('click', e => this.AddModal(e));
        console.log(gamesArray[0].title);
    }

    AddModal(e){
        e.preventDefault();

        const main = document.querySelector('main');

        let modal = document.createElement('div');
        modal.className = 'modalGame';
        modal.setAttribute('id', 'modalWindow');
        modal.innerHTML = '<div class="modalContent"><form class="container col-sm-10 col-md-8 col-lg-6 generateForm" id="newgame" method="POST"><h6 class="text-right">*required</h6><label for="img" class="form-label">Select image:</label><input type="file" class="mb-3 modalImg" id="img" name="img"><div class="titleWrapper"><label for="titleInput" class="form-label titleLabel">*Title</label><input type="text" class="form-control mb-3 modalTitle" id="titleInput"></div><div class="playerWrapper"><label for="playersInput" class="form-label">*Max Amount of Players</label><input type="number" class="form-control mb-3 modalPlayers" id="playersInput"></div><div class="timeWrapper"><label for="timeInput" class="form-label">*Time Needed(in minutes)</label><input type="number" class="form-control mb-3 modalTime" placeholder="(ex: 120)" id="timeInput"></div><label for="descInput" class="form-label">Description</label><textarea class="form-control mb-3 modalDesc" id="descInput"></textarea><button type="button" class="btn submitBtn btn-primary mb-3 mr-3">Submit</button><button type="button" class="btn cancelBtn btn-primary mb-3">Cancel</button></form></div>';

        //display modal
        main.prepend(modal);

        //get buttons
        const submit = document.querySelector('.submitBtn'),
        cancel = document.querySelector('.cancelBtn');

        //button options
        cancel.addEventListener('click', e => {
            e.preventDefault();
            modal.remove();
        })

        submit.addEventListener('click', e => this.AddGame(e))
    }

    AddGame(e){
        e.preventDefault();

        const page = document.querySelector('.row-cols-auto'),
        modal = document.querySelector('.modalGame');

        let image = document.querySelector('.modalImg').value,
        title = document.querySelector('.modalTitle').value,
        players = document.querySelector('.modalPlayers').value,
        time = document.querySelector('.modalTime').value,
        desc = document.querySelector('.modalDesc').value,
        titleWrap = document.querySelector('.titleWrapper'),
        playerWrap = document.querySelector('.playerWrapper'),
        timeWrap = document.querySelector('.timeWrapper');

        if(title === '' || players === '' || time === ''){
            this.ValidateInputs(title, players, time, titleWrap, playerWrap, timeWrap)
        }
        else{

            modal.remove();
            let newGame = document.createElement('article');
            newGame.classList.add('game', 'col-sm-6', 'col-md-4', 'col-lg-3', 'card', 'mr-3', 'mb-3', 'ml-3');

            newGame.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <h3 class="card-subtitle">Time: <span>${time}</span> Players: <span>${players}</span></h3>
                <p class="card-text">${desc}</p>
                <button type="button" class="selectBtn btn-secondary">Select Game</button>
            </div>`;

            page.appendChild(newGame);
        }
    }

    ValidateInputs(title, players, time, titleWrapper, playerWrapper, timeWrapper){
        //create labels and add attributes as needed
        let titleError = document.createElement('label'), 
        playerError = document.createElement('label'),
        timeError = document.createElement('label'), 
        inputs = document.querySelectorAll('input');

        titleError.setAttribute('for', 'titleInput');
        titleError.setAttribute('role', 'alert');
        titleError.className = 'textError';

        playerError.setAttribute('for', 'playersInput');
        playerError.setAttribute('role', 'alert');
        playerError.className = 'textError';
        
        timeError.setAttribute('for', 'timeInput');
        timeError.setAttribute('role', 'alert');
        timeError.className = 'textError';

        //add in error in order to select later.
        titleWrapper.appendChild(playerError);
        playerWrapper.appendChild(playerError);
        timeWrapper.appendChild(timeError);
        inputs[1].classList.add('error');
        inputs[2].classList.add('error');
        inputs[3].classList.add('error');

        //delete to remove any duplicates
        titleError.remove();
        playerError.remove();
        timeError.remove();
        inputs[1].classList.remove('error');
        inputs[2].classList.remove('error');
        inputs[3].classList.remove('error');

        //now check for error!
        if(title === ''){
            titleError.innerHTML = 'Please enter in a title';
            titleWrapper.appendChild(titleError);
            inputs[1].classList.add('error');
        }

        if(players === ''){
            playerError.innerHTML = 'Please enter in a number';
            playerWrapper.appendChild(playerError);
            inputs[2].classList.add('error');
        }

        if(time === ''){
            timeError.innerHTML = 'Please enter in a number';
            timeWrapper.appendChild(timeError);
            inputs[3].classList.add('error');
        }
    }
}