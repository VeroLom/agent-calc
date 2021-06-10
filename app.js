((Vue) => {
const bathVolume = 200;

const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const agentAmount = (cases, index) => round(cases[index] / 100 * bathVolume);
const agentPrice = (amount, price) => round(amount * price);
const agentTreatmentPrice = (price) => round(price / bathVolume);

const AgentCalc = {
    data() {
        return {
            activeAgentIndex: 0,
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
        bathVolume() {
            return bathVolume;
        },
        activeAgent() {
            return this.agents[this.activeAgentIndex]
        },

        sulfurAmount() {
            return (agent, index) => agentAmount(agent.cases, index)
        },
        agentAmount() {
            return (index) => agentAmount(this.activeAgent.cases, index)
        },

        sulfurPrice() {
            return (agent, index) => agentPrice(this.sulfurAmount(agent, index), agent.price)
        },
        agentPrice() {
            return (index) => agentPrice(this.agentAmount(index), this.activeAgent.price)
        },
        agentMixedPrice() {
            return (agent, index) => this.agentPrice(index) + this.sulfurPrice(agent, index)
        },

        sulfurTreatmentPrice() {
            return (agent, index) => agentTreatmentPrice(this.sulfurPrice(agent, index))
        },
        agentTreatmentPrice() {
            return (index) => agentTreatmentPrice(this.agentPrice(index))
        },
        agentMixedTreatmentPrice() {
            return (agent, index) => agentTreatmentPrice(this.agentMixedPrice(agent, index))
        },
    },
    methods: {
        selectAgent(index) {
            this.activeAgentIndex = index;
        }
    }
}

let app = Vue.createApp(AgentCalc).mount('#agent-calc');

})(Vue);
