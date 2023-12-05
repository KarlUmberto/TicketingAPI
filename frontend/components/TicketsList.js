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
                    <th>Event ID</th>
                    <th>Customer ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :key="ticket.id">
                    <td @click="getTicket(ticket.id)">{{ ticket.id }}</td>
                    <td>{{ ticket.price }}</td>
                    <td>{{ ticket.purchaseDate }}</td>
                    <td>{{ ticket.EventId }}</td>
                    <td>{{ ticket.CustomerId }}</td>
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
            this.tickets = await (await fetch("http://localhost:8080/tickets")).json();
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
