export default {
    /*html*/
    template: `
    <table id="ticketsTable" class="table table-striped table-bordered">
        <tr>
            <th>Price</th>
            <th>Purchase Date</th>
            <th>Events</th>
        </tr>
        <tr v-for="ticket in tickets">
            <td @click="getTicket(ticket.id)">{{ ticket.price }}</td>
            <td>{{ ticket.purchaseDate }}</td>
            <td>
            <span v-if="ticket.Event">{{ ticket.Event.name }}</span>
            <span v-else>No Event</span>
        </td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            tickets: []
        }
    },
    async created() {
        this.tickets = await (await fetch("http://localhost:8080/tickets")).json()
    },
    methods: {
        getTicket: async function (id) {
            const ticketInModal = await (await fetch(this.API_URL + "/tickets/" + id)).json()
            this.$emit("showModal", ticketInModal)
        }
    }
}