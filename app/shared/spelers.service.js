app.service('spelersService', function () {
    let spelers;
    let spelerIssueId;

    function saveSpelers() {
        localStorage.setItem('spelers', JSON.stringify(spelers));
    };

    function saveSpelerIssueId() {
        localStorage.setItem('spelerIssueId', spelerIssueId);
    };
    
    function init() {
        spelers = JSON.parse(localStorage.getItem('spelers'));
        spelerIssueId = Number(localStorage.getItem('spelerIssueId'));

        if (spelers == null || spelers.length === 0) {
            spelers = [
                {id: 1, naam: 'Piet'},
                {id: 2, naam: 'Jan'},
                {id: 3, naam: 'Truus'}
            ];
            spelerIssueId = 4;
            saveSpelers();
            saveSpelerIssueId();
        }
    };

    init();

    this.getSpelers = function () {
        return spelers;
    };

    this.getSpeler = function (id) {
        for (let i = 0; i < spelers.length; i++) {
            if (spelers[i].id === id) {
                return spelers[i];
            }
        }
        return null;
    };

    this.createSpeler = function (speler) {
        spelers.push({id: spelerIssueId, naam: speler.naam});
        spelerIssueId++;
        saveSpelers();
        saveSpelerIssueId();
    };

    this.updateSpeler = function (speler) {
        for (let i = 0; i < spelers.length; i++) {
            if (spelers[i].id === speler.id) {
                spelers[i].naam = speler.naam;
                saveSpelers();
                return;
            }
        }
    };

    this.deleteSpeler = function (speler) {
        for (let i = 0; i < spelers.length; i++) {
            if (spelers[i].id === speler.id) {
                spelers.splice(i, 1);
                saveSpelers();
                return;
            }
        }
    };
});