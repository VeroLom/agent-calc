((Vue) => {

const AgentCalc = {
    data() {
        return {
            bathVolume: 200,
            activeAgent: 0,
            sulfur: {
                base: {
                    id: 1,
                    name: 'Медный купорос (сульфат меди)',
                    price: 245,
                    cases: [ 5, 7, 10 ],
                },
                mix: {
                    id: 2,
                    name: 'Медный купорос (сульфат меди)',
                    price: 245,
                    cases: [ 2.5, 3.5, 5, 7 ],
                },
            },
            agents: [
                {
                    id: 1,
                    name: 'HOOFEX EXTRA',
                    price: 650,
                    cases: [ 1, 1.5, 2 ],
                    additive: false,
                },
                {
                    id: 1,
                    name: 'HOOFEX',
                    price: 450,
                    cases: [ 2, 3, 4 ],
                    additive: false,
                },
                {
                    id: 1,
                    name: 'HOOFEX PLUS',
                    price: 160,
                    cases: [ 2, 2.85, 4.05, 5.7 ],
                    additive: true,
                },
            ],
        }
    },
    computed: {
        agentAmount() {
            return (agent, index) => Math.round(agent.cases[index] / 100 * this.bathVolume)
        },
        agentPrice() {
            return (agent, index) => this.agentAmount(agent, index) * agent.price
        },

        agentTreatmentPrice() {
            return (agent, index) => this.agentPrice(agent, index) / this.bathVolume
        },
    },
    methods: {
        selectAgent(index) {
            this.activeAgent = index;
        }
    }
}

let app = Vue.createApp(AgentCalc).mount('#agent-calc');

})(Vue);
