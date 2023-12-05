import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import VenuesView from './views/VenuesView.js'
import EventsView from './views/EventsView.js'
import CustomersView from './views/CustomersView.js'
import TicketsView from './views/TicketsView.js'

const routes = [
    { path: "/venues", component: VenuesView },
    { path: "/events", component: EventsView },
    { path: "/customers", component: CustomersView },
    { path: "/tickets", component: TicketsView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')