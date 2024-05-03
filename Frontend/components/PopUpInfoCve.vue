<template>
    <div class="popup">
        <div class="wrapper">
            <h3>{{ computed_cve.cveId }}</h3>
            <div class="inputs">
                <div class="coolinput">
                    <label for="input" class="text">Название:</label>
                    <textarea style="height: 2.5rem" type="text" v-model=props.cve.cisaVulnerabilityName name="input"
                        class="input"></textarea>
                </div>
                <div class="coolinput">
                    <label for="input" class="text">Описание:</label>
                    {{ cve_desc_parse }}
                    <textarea style="height: 10rem" type="text" v-model=computed_cve_desc name="input"
                        class="input"></textarea>
                </div>
                <div class="coolinput">
                    <!-- <label for="input" class="text">Путь выполнения:</label>
                    <textarea v-for="(step, i) in computed_cve.executionFlow.Attack_Step" style="height: 5rem" type="text"
                        v-model=computed_cve.executionFlow.Attack_Step[i].Description name="input"
                        class="input"></textarea> -->
                    <!-- <textarea style="height: 5rem" type="text" v-model=computed_cve.executionFlow name="input"
                        class="input"></textarea>
                    <textarea style="height: 5rem" type="text" v-model=computed_cve.executionFlow name="input"
                        class="input"></textarea> -->
                </div>
            </div>

            <!-- {{ computed_cve_consequences }} -->
            <!-- <p>{{ parse(computed_cve.consequences).Consequence }}</p> -->
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
            <button class="save" @click="updateCve(props.cve)">Сохранить</button>
        </div>
        <div @click="$emit('close')" class="dark">

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    cve: Object
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
const computed_cve_desc = computed({
    get() {
        try {
            // Пытаемся распарсить descriptions и возвращаем объект
            return JSON.parse(props.cve.descriptions)[0].value
        } catch (e) {
            // В случае ошибки парсинга возвращаем пустой объект или текущее значение
            return {}
        }
    },
    set(newValue) {
        try {
            // Распарсить текущее значение descriptions в массив объектов
            const descriptionsArray = JSON.parse(props.cve.descriptions);
            // Обновить значение ключа 'exampleKey' в первом объекте массива
            descriptionsArray[0].value = newValue;
            // Преобразовать обновленный массив объектов обратно в JSON-строку
            props.cve.descriptions = JSON.stringify(descriptionsArray);
        } catch (e) {
            // Обработка ошибки, если строка не является валидным JSON
            console.error('Error parsing or updating JSON:', e);
        }
    }
})

const computed_cve = computed(() => {
    return JSON.parse(JSON.stringify(props.cve))
})


async function updateCve(data) {
    const response = await $axios().put('/cve/', {
        cveDto: data,
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