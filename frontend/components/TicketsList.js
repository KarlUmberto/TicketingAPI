// TicketsList.js
export default {
    /*html*/
    template: `
        <table id="ticketsTable" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :key="ticket.id">
                    <td @click="getTicket(ticket.id)">{{ ticket.Event.name }}</td>
                    <td>{{ ticket.price }}</td>
                    <td>{{ ticket.purchaseDate }}</td>
                </tr>
            </tbody>
        </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            tickets: []
        };
    },
    async created() {
        try {
            this.tickets = await (await fetch("http://localhost:8080/tickets", { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'} })).json();
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        getTicket(id) {
            const ticketInModal = this.tickets.find(ticket => ticket.id === id);
            this.$emit("showModal", ticketInModal);
        }
    }
};
