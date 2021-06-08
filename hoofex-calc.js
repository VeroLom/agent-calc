const AgentCalc = {
    data() {
        return {
            bathVolume: 200,
            activeAgent: 1,
            agentPrices: [ 245, 650, 450, 160], // copper sulfur price, Extra, new, Plus
            agentNames: [ 'Медный купорос (сульфат меди)', 'HOOFEX EXTRA', 'HOOFEX', 'HOOFEX PLUS' ],

            percent: {
                1: [ 5,  1,   2, 2.5 ], // sulfur percent, Extra, new, Plus
                2: [ 7,  1.5, 3, 3.5 ],
                3: [ 10, 2,   4, 5   ],
                4: [ 1,  1,   1, 7   ], // Extra percents for Hoofex Plus
            },
        }
    },
    computed: {
        agentPercent() {
            return (agent, agentId) => this.percent[agentId][agent]
        },
        agentAmount() {
            return (agent, agentId) => Math.round(this.percent[agentId][agent] / 100 * this.bathVolume)
        },
        agentPrice() {
            return (agent, agentId) => this.agentAmount(agent, agentId) * this.agentPrices[agent]
        },
        agentTreatmentPrice() {
            return (agent, agentId) => this.agentPrice(agent, agentId) / this.bathVolume
        },
    },
    methods: {
        selectAgent(agentId) {
            console.log('New agent ' + agentId);
            this.activeAgent = agentId;
        }
    }
}

let app = Vue.createApp(AgentCalc).mount('#agent-calc');
