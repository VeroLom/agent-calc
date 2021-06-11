((Vue) => {
const bathVolume = 200;

const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const agentAmount = (cases, index) => round(cases[index] / 100 * bathVolume);
const agentPrice = (amount, price) => round(amount * price);
const agentTreatmentPrice = (price) => round(price / bathVolume);

const AgentCalc = {
    template: `
            <div class="buttons-container">
                <button
                    v-for="(agent, index) in agents"
                    :key="agent.id"
                    @click="selectAgent(index)"
                >
                    {{ agent.name }}
                </button>
            </div>

            <table>
                <tr>
                    <td>Копытная ванна, л. воды</td>
                    <td class="hl">{{ bathVolume }}</td>
                    <td colspan="3">л</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Цена руб/кг</td>
                    <td colspan="3">% разведения / кол-во / стоимость</td>
                </tr>

                <tr><th colspan="5">{{ sulfur.base.name }}</th></tr>
                <tr>
                    <td class="hl">{{ sulfur.base.name }}</td>
                    <td class="input"><input v-model="sulfur.base.price" /></td>
                    <td v-for="agentCase in sulfur.base.cases" class="number hl">
                        {{ agentCase }}%
                    </td>
                </tr>
                <tr>
                    <td>кол-во средства на ванну {{ bathVolume }} л., кг.</td>
                    <td></td>
                    <td v-for="index in sulfur.base.cases.keys()" class="number">
                        {{ sulfurAmount(sulfur.base, index) }}
                    </td>
                </tr>
                <tr>
                    <td>стоимость средства на ванну {{ bathVolume }} л., руб.</td>
                    <td></td>
                    <td v-for="index in sulfur.base.cases.keys()" class="number hl">
                        {{ sulfurPrice(sulfur.base, index) }}
                    </td>
                </tr>
                <tr>
                    <td class="number hl result">Стоимость обработки на 1 голову КРС</td>
                    <td>руб./голову</td>
                    <td v-for="index in sulfur.base.cases.keys()" class="number hl result">
                        {{ sulfurTreatmentPrice(sulfur.base, index) }}
                    </td>
                </tr>

                <tr><th colspan="5">{{ activeAgent.name }}</th></tr>

                <template v-if="activeAgent.additive">
                    <tr>
                        <td class="hl">{{ sulfur.mix.name }}</td>
                        <td class="input"><input v-model="sulfur.mix.price" /></td>
                        <td v-for="agentCase in sulfur.mix.cases" class="number hl">
                            {{ agentCase }}%
                        </td>
                    </tr>
                    <tr>
                        <td>кол-во средства на ванну {{ bathVolume }} л., кг.</td>
                        <td></td>
                        <td v-for="index in sulfur.mix.cases.keys()" class="number">
                            {{ sulfurAmount(sulfur.mix, index) }}
                        </td>
                    </tr>
                    <tr>
                        <td>стоимость средства на ванну {{ bathVolume }} л., руб.</td>
                        <td></td>
                        <td v-for="index in sulfur.mix.cases.keys()" class="number hl">
                            {{ sulfurPrice(sulfur.mix, index) }}
                        </td>
                    </tr>
                </template>

                <tr>
                    <td class="hl">Готовое средство {{ activeAgent.name }}</td>
                    <td class="input"><input v-model="activeAgent.price" /></td>
                    <td v-for="agentCase in activeAgent.cases" class="number hl">
                        {{ agentCase }}%
                    </td>
                </tr>
                <tr>
                    <td>кол-во средства на ванну {{ bathVolume }} л., кг.</td>
                    <td></td>
                    <td v-for="index in activeAgent.cases.keys()" class="number">
                        {{ agentAmount(index) }}
                    </td>
                </tr>
                <tr>
                    <td>стоимость средства на ванну {{ bathVolume }} л., руб.</td>
                    <td></td>
                    <td v-for="index in activeAgent.cases.keys()" class="number">
                        {{ agentPrice(index) }}
                    </td>
                </tr>
                <tr>
                    <td class="number hl result">ИТОГО</td>
                    <td></td>

                    <template v-if="activeAgent.additive">
                        <td v-for="index in activeAgent.cases.keys()" class="number">
                            {{ agentMixedPrice(sulfur.mix, index) }}
                        </td>
                    </template>
                    <template v-else>
                        <td v-for="index in activeAgent.cases.keys()" class="number hl">
                            {{ agentPrice(index) }}
                        </td>
                    </template>
                </tr>
                <tr>
                    <td class="number hl result">Стоимость обработки на 1 голову КРС</td>
                    <td>руб./голову</td>

                    <template v-if="activeAgent.additive">
                        <td v-for="index in activeAgent.cases.keys()" class="number hl result">
                            {{ agentMixedTreatmentPrice(sulfur.mix, index) }}
                        </td>
                    </template>
                    <template v-else>
                        <td v-for="index in activeAgent.cases.keys()" class="number hl result">
                            {{ agentTreatmentPrice(index) }}
                        </td>
                    </template>
                </tr>
            </table>
    `,
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
