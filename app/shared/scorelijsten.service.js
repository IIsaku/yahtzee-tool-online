app.service('scorelijstenService', function (spelersService) {
    let scorelijsten;
    let scorelijstIssueId;

    function saveScorelijsten() {
        let saveableScorelijsten = JSON.parse(JSON.stringify(scorelijsten));
        saveableScorelijsten.forEach(scorelijst => {
            scorelijst.speler = scorelijst.speler.id;
        });
        localStorage.setItem('scorelijsten', JSON.stringify(saveableScorelijsten));
    };

    function saveScorelijstIssueId() {
        localStorage.setItem('scorelijstIssueId', scorelijstIssueId);
    };
    
    function init() {
        if (JSON.parse(localStorage.getItem('scorelijsten')) != null) {
            scorelijsten = JSON.parse(localStorage.getItem('scorelijsten'));
            for (let i = 0; i < scorelijsten.length; i++) {
                scorelijsten[i].speler = spelersService.getSpeler(scorelijsten[i].speler);
                scorelijsten[i] = new Scorelijst(scorelijsten[i].id, scorelijsten[i].speler, scorelijsten[i].enen, scorelijsten[i].tweeen, scorelijsten[i].drieen, scorelijsten[i].vieren, scorelijsten[i].vijven, scorelijsten[i].zessen, scorelijsten[i].threeOfAKind, scorelijsten[i].carre, scorelijsten[i].fullHouse, scorelijsten[i].kleineStraat, scorelijsten[i].groteStraat, scorelijsten[i].yahtzee, scorelijsten[i].chance);
            }
        }
        scorelijstIssueId = Number(localStorage.getItem('scorelijstIssueId'));
        if (scorelijsten == null || scorelijsten.length === 0) {
            scorelijsten = [
                new Scorelijst(1, spelersService.getSpeler(1), 3, 8, 9, 16, 15, 18, 26, 21, 25, 30, 40, 0, 15),
                new Scorelijst(2, spelersService.getSpeler(3), 2, 8, 12, 4, 10, 12, 14, 29, 25, 30, 40, 50, 16),
                new Scorelijst(3, spelersService.getSpeler(1), 4, 4, 12, 16, 20, 12, 11, 23, 0, 30, 40, 50, 15),
                new Scorelijst(4, spelersService.getSpeler(3), 4, 8, 12, 12, 20, 24, 24, 20, 25, 30, 0, 0, 20),
                new Scorelijst(5, spelersService.getSpeler(3), 3, 8, 9, 16, 15, 24, 27, 29, 25, 30, 40, 50, 20),
                new Scorelijst(6, spelersService.getSpeler(1), 2, 4, null, null, null, 24, null, 29, 25, null, 40, null, null),
                new Scorelijst(7, spelersService.getSpeler(1)),
                new Scorelijst(8, spelersService.getSpeler(1)),
            ];            
            scorelijstIssueId = 9;
            saveScorelijsten();
            saveScorelijstIssueId();
        }
    };

    init();
    
    this.saveScorelijsten = function () {
        saveScorelijsten();
    };

    this.getScorelijsten = function () {
        return scorelijsten;
    };
    
    this.getScorelijsten = function (spel) {
        let result = [];
        scorelijsten.forEach(scorelijst => {
            if (scorelijst.spel.id === spel.id) {
                result.push(scorelijst);
            }
        });
        return result;
    };

    this.getScorelijst = function (id) {
        for (let i = 0; i < scorelijsten.length; i++) {
            if (scorelijsten[i].id === id) {
                return scorelijsten[i];
            }
        }
        return null;
    };

    this.createScorelijst = function (scorelijst) {
        scorelijst.id = scorelijstIssueId;
        scorelijsten.push(scorelijst);
        scorelijstIssueId++;
        saveScorelijsten();
        saveScorelijstIssueId();
        return scorelijst;
    };

    this.updateScorelijst = function (scorelijst) {
        for (let i = 0; i < scorelijsten.length; i++) {
            if (scorelijsten[i].id === scorelijst.id) {
                scorelijsten[i].speler = scorelijst.speler;
                scorelijsten[i].enen = scorelijst.enen;
                scorelijsten[i].tweeen = scorelijst.tweeen;
                scorelijsten[i].drieen = scorelijst.drieen;
                scorelijsten[i].vieren = scorelijst.vieren;
                scorelijsten[i].vijven = scorelijst.vijven;
                scorelijsten[i].zessen = scorelijst.zessen;
                scorelijsten[i].threeOfAKind = scorelijst.threeOfAKind;
                scorelijsten[i].carre = scorelijst.carre;
                scorelijsten[i].fullHouse = scorelijst.fullHouse;
                scorelijsten[i].kleineStraat = scorelijst.kleineStraat;
                scorelijsten[i].groteStraat = scorelijst.groteStraat;
                scorelijsten[i].yahtzee = scorelijst.yahtzee;
                scorelijsten[i].chance = scorelijst.chance;
                saveScorelijsten();
                return;
            }
        }        
    };

    this.deleteScorelijst = function (scorelijst) {
        for (let i = 0; i < scorelijsten.length; i++) {
            if (scorelijsten[i].id === scorelijst.id) {
                scorelijsten.splice(i, 1);
                saveScorelijsten();
                return;
            }
        }
    };
});
