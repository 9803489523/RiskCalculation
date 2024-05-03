<template>
    <div class="popup">
        <div class="wrapper">
            <h3>CAPEC-{{ computed_capec.capecId }}</h3>
            <div class="inputs">
                <div class="coolinput">
                    <label for="input" class="text">Название:</label>
                    <textarea style="height: 2.5rem" type="text" v-model=computed_capec.name name="input"
                        class="input"></textarea>
                </div>
                <div class="coolinput">
                    <label for="input" class="text">Описание:</label>
                    <textarea style="height: 10rem" type="text" v-model=computed_capec.description name="input"
                        class="input"></textarea>
                </div>
                <div class="coolinput">
                    <!-- <label for="input" class="text">Путь выполнения:</label>
                    <textarea v-for="(step, i) in computed_capec.executionFlow.Attack_Step" style="height: 5rem" type="text"
                        v-model=computed_capec.executionFlow.Attack_Step[i].Description name="input"
                        class="input"></textarea> -->
                    <!-- <textarea style="height: 5rem" type="text" v-model=computed_capec.executionFlow name="input"
                        class="input"></textarea>
                    <textarea style="height: 5rem" type="text" v-model=computed_capec.executionFlow name="input"
                        class="input"></textarea> -->
                </div>
            </div>

            <!-- {{ computed_capec_consequences }} -->
            <!-- <p>{{ parse(computed_capec.consequences).Consequence }}</p> -->
            <!-- <div v-for="Consequence in consequences.Consequence">
                <template v-if="(!isObject(Consequence))">
                    <div v-for="c in Consequence">
                        <template v-if="(!isObject(c.Scope))">
                            <div v-for="(scope, i) in c.Scope" class="coolinput">
                                <label for="input" class="text">Scope:</label>
                                <textarea style="height: 2.5rem" type="text" v-model=c.Scope[i] name="input"
                                    class="input"></textarea>
                            </div>
                        </template>
                        <template v-else>
                            <div class="coolinput">
                                <label for="input" class="text">Scope:</label>
                                <textarea style="height: 2.5rem" type="text" v-model=c.scope name="input"
                                    class="input"></textarea>
                            </div>
                        </template>
                        <div class="coolinput">
                            <label for="input" class="text">Impact:</label>
                            <textarea style="height: 2.5rem" type="text" v-model=c.Impact name="input"
                                class="input"></textarea>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <template v-if="(!isObject(Consequence.Scope))">
                        <div v-for="(scope, i) in Consequence.Scope" class="coolinput">
                            <label for="input" class="text">Scope:</label>
                            <textarea style="height: 2.5rem" type="text" v-model=Consequence.Scope[i] name="input"
                                class="input"></textarea>
                        </div>
                    </template>
                    <template v-else>
                        <div class="coolinput">
                            <label for="input" class="text">Scope:</label>
                            <textarea style="height: 2.5rem" type="text" v-model=Consequence.Scope name="input"
                                class="input"></textarea>
                        </div>
                    </template>
                    <div class="coolinput">
                        <label for="input" class="text">Impact:</label>
                        <textarea style="height: 2.5rem" type="text" v-model=Consequence.Impact name="input"
                            class="input"></textarea>
                    </div>
                </template>
            </div> -->
            <button class="save" @click="updateCapec(computed_capec)">Сохранить</button>
        </div>
        <div @click="$emit('close')" class="dark">

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    capec: Object
})
function isObject(data) {
    if (typeof data === 'object' &&
        !Array.isArray(data)) {
        console.log(typeof data === 'object' &&
            !Array.isArray(data));
        return true
    } else {
        console.log(typeof data === 'object' &&
            !Array.isArray(data));
        return false
    }

}
const computed_capec = computed(() => {
    return JSON.parse(JSON.stringify(props.capec))
})

// const computed_capec = ref({
//     abstraction: props.capec.abstraction,
//     alternateTerms: props.capec.alternateTerms,
//     capecId: props.capec.capecId,
//     consequences: props.capec.consequences,
//     contentHistory: props.capec.contentHistory,
//     cveCount: props.capec.cveCount,
//     description: props.capec.description,
//     exampleInstances: props.capec.exampleInstances,
//     executionFlow: JSON.parse(props.capec?.executionFlow),
//     extendedDescription: props.capec.extendedDescription,
//     indicators: props.capec.indicators,
//     likelihoodOfAttack: props.capec.likelihoodOfAttack,
//     mitigations: props.capec.mitigations,
//     name: props.capec.name,
//     notes: props.capec.notes,
//     prerequisites: props.capec.prerequisites,
//     references: props.capec.references,
//     relatedAttackPatterns: props.capec.relatedAttackPatterns,
//     relatedWeaknesses: props.capec.relatedWeaknesses,
//     relatedWeaknessesIdOnly: props.capec.relatedWeaknessesIdOnly,
//     resourcesRequired: props.capec.resourcesRequired,
//     skillsRequired: props.capec.skillsRequired,
//     status: props.capec.status,
//     taxonomyMappings: props.capec.taxonomyMappings,
//     typicalSeverity: props.capec.typicalSeverity
// })
// const req_computed_capec = ref({
//     abstraction: computed_capec.value.abstraction,
//     alternateTerms: computed_capec.value.alternateTerms,
//     capecId: computed_capec.value.capecId,
//     consequences: computed_capec.value.consequences,
//     contentHistory: computed_capec.value.contentHistory,
//     cveCount: computed_capec.value.cveCount,
//     description: computed_capec.value.description,
//     exampleInstances: computed_capec.value.exampleInstances,
//     executionFlow: JSON.stringify(computed_capec.value?.executionFlow),
//     extendedDescription: computed_capec.value.extendedDescription,
//     indicators: computed_capec.value.indicators,
//     likelihoodOfAttack: computed_capec.value.likelihoodOfAttack,
//     mitigations: computed_capec.value.mitigations,
//     name: computed_capec.value.name,
//     notes: computed_capec.value.notes,
//     prerequisites: computed_capec.value.prerequisites,
//     references: computed_capec.value.references,
//     relatedAttackPatterns: computed_capec.value.relatedAttackPatterns,
//     relatedWeaknesses: computed_capec.value.relatedWeaknesses,
//     relatedWeaknessesIdOnly: computed_capec.value.relatedWeaknessesIdOnly,
//     resourcesRequired: computed_capec.value.resourcesRequired,
//     skillsRequired: computed_capec.value.skillsRequired,
//     status: computed_capec.value.status,
//     taxonomyMappings: computed_capec.value.taxonomyMappings,
//     typicalSeverity: computed_capec.value.typicalSeverity
// })

async function updateCapec(data) {
    const response = await $axios().put('/capec/', {
        capecDto: data,
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    }).then(res => console.log(data))
}
function parse(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return 'null';
    }
}
</script>

<style lang="scss" scoped>
#checkbox {
    display: none;
}

.toggle {
    position: relative;
    width: 40px;
    cursor: pointer;
    margin: auto;
    display: block;
    height: calc(4px * 3 + 11px * 2);
}

.bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: calc(4px / 2);
    background: #7b52b9;
    color: inherit;
    opacity: 1;
    transition: none 0.35s cubic-bezier(.5, -0.35, .35, 1.5) 0s;
}

/***** Tornado Animation *****/

.bar--top {
    bottom: calc(50% + 11px + 4px/ 2);
    transition-property: bottom, transform;
    transition-delay: calc(0s + 0.35s) * .6;
}

.bar--middle {
    top: calc(50% - 4px/ 2);
    transition-property: opacity, transform;
    transition-delay: calc(0s + 0.35s * .3);
}

.bar--bottom {
    top: calc(50% + 11px + 4px/ 2);
    transition-property: top, transform;
    transition-delay: 0s;
}

#checkbox:hover+.toggle .bar--top {
    transform: rotate(-135deg);
    transition-delay: 0s;
    bottom: calc(50% - 4px/ 2);
}

#checkbox:hover+.toggle .bar--middle {
    opacity: 0;
    transform: rotate(-135deg);
    transition-delay: calc(0s + 0.35s * .3);
}

#checkbox:hover+.toggle .bar--bottom {
    top: calc(50% - 4px/ 2);
    transform: rotate(-225deg);
    transition-delay: calc(0s + 0.35s * .6);
}

.popup {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
        overflow-y: scroll;
        padding: 20px;
        border-radius: 10px;
        background-color: #39394B;
        width: 800px;
        height: 800px;
        z-index: 11;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;

        h3 {
            font-size: 1.75rem;
            font-weight: 600;
            // color: black;
        }

        .inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow: hidden;
            height: 100%;
        }

        .save {
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 0;
            width: 100%;
            height: 60px;
            background-color: #4A668E;
            color: white;
        }

        .close_ {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }

    .dark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.377);
    }
}

.button {
    position: relative;
    width: 4em;
    height: 4em;
    border: none;
    background: #e4f1ff;
    border-radius: 50%;
    transition: background 0.5s;
}

.X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 4px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
}

.Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 2px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
}

.close {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -70%;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
}

.button:hover {
    background-color: #4A668E;
}

.button:active {
    background-color: #4A668E;
}

.button:hover>.close {
    animation: close 0.2s forwards 0.25s;
}

@keyframes close {
    100% {
        opacity: 1;
    }
}
</style>