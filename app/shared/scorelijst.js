class Scorelijst {
    constructor(id, speler, enen = null, tweeen = null, drieen = null, vieren = null, vijven = null, zessen = null, threeOfAKind = null, carre = null, fullHouse = null, kleineStraat = null, groteStraat = null, yahtzee = null, chance = null) {
        this.id = id;
        this.speler = speler;
        this.enen = enen;
        this.tweeen = tweeen;
        this.drieen = drieen;
        this.vieren = vieren;
        this.vijven = vijven;
        this.zessen = zessen;
        this.threeOfAKind = threeOfAKind;
        this.carre = carre;
        this.fullHouse = fullHouse;
        this.kleineStraat = kleineStraat;
        this.groteStraat = groteStraat;
        this.yahtzee = yahtzee;
        this.chance = chance;
    }

    getTotaalAantalPunten() {
        return this.enen + this.tweeen + this.drieen + this.vieren + this.vijven + this.zessen;
    }

    getExtraBonus() {
        return this.enen + this.tweeen + this.drieen + this.vieren + this.vijven + this.zessen > 62 ? 35 : 0;
    }
    
    getTotaalBoven() {
        return this.getTotaalAantalPunten() + this.getExtraBonus();
    }

    getTotaalOnder() {
        return this.threeOfAKind + this.carre + this.fullHouse + this.kleineStraat + this.groteStraat + this.yahtzee + this.chance;
    }

    getTotaalGeneraal() {
        return this.getTotaalBoven() + this.getTotaalOnder();
    }
}
