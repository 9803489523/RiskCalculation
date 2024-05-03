<template>
    <div class="container">
        <label for="search">
            <h2>Поиск по CVE</h2>
        </label>
        <div class="inputs">
            <a :href="'/searchCve?' + createQueryString(searchQuery)">
                <button class="search_button">
                    Найти
                </button>
            </a>
            <input v-for="(key, i) in searchQuery" @keyup.enter="search()" type="text" class="search"
                v-model="searchQuery[i]" placeholder="Слово или CVE-ID">
            <button @click="searchQuery.push('')" class="add">
                <p>+</p>
            </button>
        </div>
        <div class="wrapper">
            <template v-if="json">
                <template v-for="(cve, i) in  json.content " :key="cve.cveId">
                    <NuxtLink :to="`/cves/${cve.cveId}`">
                        <div @click="openCapecSlug" class="item">
                            <h2>{{ cve.cveId }}</h2>
                            <p>{{ cve.cisaVulnerabilityName }}</p>
                            <span>Связанных шаблонов атак - {{ cve?.capecCount }}</span>
                            <button>Перейти</button>
                        </div>
                    </NuxtLink>

                </template>

            </template>

        </div>
        <div class="pagination">
            <UPagination v-model="page" :nextButton="{ class: 'inactive_button_pagination' }"
                :prevButton="{ class: 'inactive_button_pagination' }" :inactive-button="{ class: 'inactive_button_pagination' }"
                :active-button="{ class: 'active_button_pagination', }" :page-count="16" :total="json.totalElements" />

        </div>
    </div>
</template>
  
<script setup>
const json = ref([])
const searchQuery = ref([''])
const page = ref(1)

watch(page, async (newValue, oldValue) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await fetchCve()
});

function createQueryString(keywords) {
    const params = new URLSearchParams();
    keywords.forEach(keyword => params.append('words', keyword));
    return params.toString();
}

async function fetchCve() {
    const response = await $axios().get('/cve/pagination/' + (page.value - 1) + '/' + 16, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    })
    json.value = response.data
}
fetchCve()
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    gap: 10px;

    input {
        width: 100px;
    }
}

a {
    text-decoration: none;
    color: black;
}

.container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 70px 20px 20px;

    .search_button {
        background-color: #4A668E;
        padding: 10px 20px;
        border-radius: 10px;
        color: white;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    label {
        display: block;
        margin-bottom: 20px;

        h2 {
            font-size: 1.5rem;
            font-weight: 500;
        }
    }

    .inputs {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        gap: 10px;

        .add {
            background-color: #4A668E;
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;

            p {
                color: white;
                width: 100%;
                height: 100%;
                font-size: 2rem;
                line-height: 0.8;
            }
        }

        .search {
            padding: 3px 0 5px 20px;
            border-radius: 10px;
            border: none;
            max-width: 200px;
            width: 100%;
            height: 35px;
            box-sizing: border-box;
             //  border: 1px solid rgb(206, 206, 206);

            &:focus-visible {
                border: none;
            }
        }

        a {
            cursor: pointer;
            // position: absolute;
            top: 7px;
            right: 7px;
            display: block;
            
            background-size: 20px 20px;
            background-repeat: no-repeat;
        }
    }

    header {
        top: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background: #fff;
        position: sticky;
        box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.137);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .header {
            max-width: 1400px;
            // width: 100%;
            padding: 20px 20px 20px;
            margin: 0 auto;

            display: flex;
            justify-content: space-between;
            align-items: center;
        }


    }

    .wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 25px;
        margin-top: 40px;
        margin-bottom: 40px;

        .item {
            max-width: 454px;
            // width: 100%;
            aspect-ratio: 50/60;
            background-color: #39394B;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
            transition: .3s all;

            &:hover {
                transition: .3s all;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);
            }


            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 50px 20px;

            h2 {
                font-size: 2vw;
                margin: 0;
                padding: 0;
                font-weight: 600;
            }

            p,
            span {
                margin: 0;
                padding: 0;
                font-weight: 400;
                text-align: center;
                font-size: 1rem;
            }
        }
    }
}</style>
  
  