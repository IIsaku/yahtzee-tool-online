app.service('toernooienService', function (spelersService, spellenService) {
    let toernooien;
    let toernooiIssueId;

    function saveToernooien() {
        let saveableToernooien = JSON.parse(JSON.stringify(toernooien));
        saveableToernooien.forEach(toernooi => {
            let spelIds = [];
            toernooi.spellen.forEach(spel => {
                spelIds.push(spel.id);
            });
            toernooi.spellen = spelIds;
            let spelerIds = [];
            toernooi.spelers.forEach(speler => {
                spelerIds.push(speler.id);
            });
            toernooi.spelers = spelerIds;
        });
        localStorage.setItem('toernooien', JSON.stringify(saveableToernooien));
    };

    function saveToernooiIssueId() {
        localStorage.setItem('toernooiIssueId', toernooiIssueId);
    };
    
    function init() {
        if (JSON.parse(localStorage.getItem('toernooien')) != null) {
            toernooien = JSON.parse(localStorage.getItem('toernooien'));
            toernooien.forEach(toernooi => {
                let spellen = [];
                toernooi.spellen.forEach(spelId => {
                    spellen.push(spellenService.getSpel(spelId));
                })
                toernooi.spellen = spellen;
                let spelers = [];
                toernooi.spelers.forEach(spelerId => {
                    spelers.push(spelersService.getSpeler(spelerId));
                })
                toernooi.spelers = spelers;
            });
        }
        toernooiIssueId = Number(localStorage.getItem('toernooiIssueId'));
        if (toernooien == null || toernooien.length === 0) {
            toernooien = [
                {id: 1, naam: 'Yahtzee Legends', spellen: [spellenService.getSpel(1), spellenService.getSpel(2)], spelers: [spelersService.getSpeler(1), spelersService.getSpeler(3)]}, //2 rondes
                {id: 2, naam: 'Yahtzee zaterdag', spellen: [spellenService.getSpel(3)], spelers: [spelersService.getSpeler(3)]}, //1 ronde
                {id: 3, naam: 'Yahtzee fun!', spellen: [spellenService.getSpel(4), spellenService.getSpel(5), spellenService.getSpel(6)], spelers: [spelersService.getSpeler(1)]} //3 rondes
            ];
            toernooiIssueId = 4;
            saveToernooien();
            saveToernooiIssueId();
        }
    };

    init();
    
    this.getToernooien = function () {
        return toernooien;
    };
    
    this.getToernooi = function (id) {
        for (let i = 0; i < toernooien.length; i++) {
            if (toernooien[i].id === id) {
                return toernooien[i];
            }
        }
        return null;
    };

    this.getToernooienLinkedToSpeler = function (speler) {
        let linkedToernooien = [];
        for (let i = 0; i < toernooien.length; i++) {
            for (let j = 0; j < toernooien[i].spelers.length; j++) {
                if (toernooien[i].spelers[j].id === speler.id) {
                    linkedToernooien.push(toernooien[i]);
                    j = toernooien[i].spelers.length;
                }
            }
        }
        return linkedToernooien;
    };

    this.isSpelerLinkedToToernooi = function (speler) {
        for (let i = 0; i < toernooien.length; i++) {
            for (let j = 0; j < toernooien[i].spelers.length; j++) {
                if (toernooien[i].spelers[j].id === speler.id) {
                    return true;
                }
            }
        }
        return false;
    };

    this.createToernooi = function (toernooi) {
        let spellen = [];
        for (let i = 0; i < toernooi.rondes; i++) {
            spellen.push(spellenService.createSpel({ronde: i + 1}, toernooi.spelers));
        }
        toernooien.push({id: toernooiIssueId, naam: toernooi.naam, spellen: spellen, spelers: toernooi.spelers});
        toernooiIssueId++;
        saveToernooien();
        saveToernooiIssueId();
    }

    this.updateToernooi = function (toernooi) {
        for (let i = 0; i < toernooien.length; i++) {
            if (toernooien[i].id === toernooi.id) {
                toernooien[i].naam = toernooi.naam;
                toernooien[i].spelers = toernooi.spelers;

                let rondesDifference = toernooi.rondes - toernooi.spellen.length;
                if (rondesDifference < 0) {
                    let compare = function (a, b) {
                        if (a.ronde < b.ronde) {
                            return -1;
                        }
                        if (a.ronde > b.ronde) {
                            return 1;
                        }
                        return 0;
                    };
                    toernooi.spellen.sort(compare);
                    let removedSpellen = toernooi.spellen.splice(rondesDifference, Math.abs(rondesDifference));
                    removedSpellen.forEach((spel) => {
                        spellenService.deleteSpel(spel);
                    });
                }
                let spellen = [];        
                toernooi.spellen.forEach(spel => {
                    spellen.push(spellenService.updateSpel(spel, toernooi.spelers));
                });
                toernooi.spellen = spellen;
                if (rondesDifference > 0) {
                    for (let j = 0; j < rondesDifference; j++) {
                        toernooi.spellen.push(spellenService.createSpel({ronde: toernooi.spellen.length + 1}, toernooi.spelers));
                    }
                }
                toernooien[i].spellen = toernooi.spellen;
                saveToernooien();
                return;
            }
        }
    };

    this.deleteToernooi = function (toernooi) {
        for (let i = 0; i < toernooien.length; i++) {
            if (toernooien[i].id === toernooi.id) {
                toernooien[i].spellen.forEach((spel) => {
                    spellenService.deleteSpel(spel);
                });
                toernooien.splice(i, 1);
                saveToernooien();
                return;
            }
        }
    };
});
