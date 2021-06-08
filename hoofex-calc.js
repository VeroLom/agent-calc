const HoofexCalc = {
    data() {
        return {
            bathVolume: 200,

            sulfurPrice: 245,
            sulfurPercent1: 5,
            sulfurPercent2: 7,
            sulfurPercent3: 10,

            hoofexPrice: 650,
            hoofexPercent1: 1,
            hoofexPercent2: 1.5,
            hoofexPercent3: 2,
        }
    },
    computed: {
        sulfurAmount1() { return Math.round(this.sulfurPercent1 / 100 * this.bathVolume) },
        sulfurAmount2() { return Math.round(this.sulfurPercent2 / 100 * this.bathVolume) },
        sulfurAmount3() { return Math.round(this.sulfurPercent3 / 100 * this.bathVolume) },
        sulfurPrice1() { return this.sulfurAmount1 * this.sulfurPrice },
        sulfurPrice2() { return this.sulfurAmount2 * this.sulfurPrice },
        sulfurPrice3() { return this.sulfurAmount3 * this.sulfurPrice },
        sulfurTreatmentPrice1() { return this.sulfurPrice1 / this.bathVolume },
        sulfurTreatmentPrice2() { return this.sulfurPrice2 / this.bathVolume },
        sulfurTreatmentPrice3() { return this.sulfurPrice3 / this.bathVolume },

        hoofexAmount1() { return Math.round(this.hoofexPercent1 / 100 * this.bathVolume) },
        hoofexAmount2() { return Math.round(this.hoofexPercent2 / 100 * this.bathVolume) },
        hoofexAmount3() { return Math.round(this.hoofexPercent3 / 100 * this.bathVolume) },
        hoofexPrice1() { return this.hoofexAmount1 * this.hoofexPrice },
        hoofexPrice2() { return this.hoofexAmount2 * this.hoofexPrice },
        hoofexPrice3() { return this.hoofexAmount3 * this.hoofexPrice },
        hoofexTreatmentPrice1() { return this.hoofexPrice1 / this.bathVolume },
        hoofexTreatmentPrice2() { return this.hoofexPrice2 / this.bathVolume },
        hoofexTreatmentPrice3() { return this.hoofexPrice3 / this.bathVolume },
    }
}

let app = Vue.createApp(HoofexCalc).mount('#hoofex-calc');
