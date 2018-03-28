app.service('spellenService', function (scorelijstenService) {
    let spellen;
    let spelIssueId;

    function saveSpellen() {
        let saveableSpellen = JSON.parse(JSON.stringify(spellen));
        saveableSpellen.forEach(spel => {
            let scorelijstIds = [];
            spel.scorelijsten.forEach(scorelijst => {
                scorelijstIds.push(scorelijst.id);
            });
            spel.scorelijsten = scorelijstIds;
        });
        localStorage.setItem('spellen', JSON.stringify(saveableSpellen));
    };

    function saveSpelIssueId() {
        localStorage.setItem('spelIssueId', spelIssueId);
    };
    
    function init() {
        if (JSON.parse(localStorage.getItem('spellen')) != null) {
            spellen = JSON.parse(localStorage.getItem('spellen'));
            spellen.forEach(spel => {
                let scorelijsten = [];
                spel.scorelijsten.forEach(scorelijstId => {
                    scorelijsten.push(scorelijstenService.getScorelijst(scorelijstId));
                })
                spel.scorelijsten = scorelijsten;
            });
        }
        spelIssueId = Number(localStorage.getItem('spelIssueId'));
        if (spellen == null || spellen.length === 0) {
            spellen = [
                {id: 1, ronde: 1, scorelijsten: [scorelijstenService.getScorelijst(1), scorelijstenService.getScorelijst(2)]},
                {id: 2, ronde: 2, scorelijsten: [scorelijstenService.getScorelijst(3), scorelijstenService.getScorelijst(4)]},
                {id: 3, ronde: 1, scorelijsten: [scorelijstenService.getScorelijst(5)]},
                {id: 4, ronde: 1, scorelijsten: [scorelijstenService.getScorelijst(6)]},
                {id: 5, ronde: 2, scorelijsten: [scorelijstenService.getScorelijst(7)]},
                {id: 6, ronde: 3, scorelijsten: [scorelijstenService.getScorelijst(8)]}
            ];
            spelIssueId = 7;
            saveSpellen();
            saveSpelIssueId();
        }
    };

    init();
    
    this.getSpellen = function () {
        return spellen;
    };

    this.getSpel = function (id) {
        for (let i = 0; i < spellen.length; i++) {
            if (spellen[i].id === id) {
                return spellen[i];
            }
        }
        return null;
    };

    this.createSpel = function (spel, spelers) {
        let scorelijsten = []
        spelers.forEach(speler => {
            scorelijsten.push(scorelijstenService.createScorelijst(new Scorelijst(undefined, speler)));
        });
        
        let newSpel = {id: spelIssueId, ronde: spel.ronde, scorelijsten: scorelijsten};
        spellen.push(newSpel);
        spelIssueId++;
        saveSpellen();
        saveSpelIssueId();
        return newSpel;
    };

    this.updateSpel = function (spel, spelers) {
        for (let i = 0; i < spellen.length; i++) {
            if (spellen[i].id === spel.id) {
                spellen[i].ronde = spel.ronde;
                
                spellen[i].scorelijsten.forEach(scorelijst => {
                    scorelijstenService.deleteScorelijst(scorelijst);
                });
                spellen[i].scorelijsten = [];
                spelers.forEach(speler => {
                    spellen[i].scorelijsten.push(scorelijstenService.createScorelijst(new Scorelijst(undefined, speler)));
                });
                
                saveSpellen();
                return spellen[i];
            }
        }
    };

    this.deleteSpel = function (spel) {
        for (let i = 0; i < spellen.length; i++) {
            if (spellen[i].id === spel.id) {
                spellen[i].scorelijsten.forEach(scorelijst => {
                    scorelijstenService.deleteScorelijst(scorelijst);
                });
                spellen.splice(i, 1);
                saveSpellen();
                return;
            }
        }
    };
});
