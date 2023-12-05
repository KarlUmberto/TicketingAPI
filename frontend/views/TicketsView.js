// TicketsView.js
import ticketsList from "../components/TicketsList.js";
import ticketInfoModal from "../components/TicketInfoModal.js";

export default {
    /*html*/
    template: `
        <div>
            <tickets-list :key="update" @showModal="openModal"></tickets-list>
            <ticket-info-modal ref="ticketInfoModal" @ticketUpdated="updateView" :ticketInModal="ticketInModal"></ticket-info-modal>
            <button type="button" class="btn btn-primary" @click="createNewTicket">Create New Ticket</button>
        </div>
    `,
    components: {
        ticketsList,
        ticketInfoModal
    },
    data() {
        return {
            update: 0,
            ticketInModal: { id: "", name: "", price: "", purchaseDate: "", EventId: "", CustomerId: "" }
        };
    },
    methods: {
        openModal(ticket) {
            this.ticketInModal = ticket;
            let ticketInfoModal = new bootstrap.Modal(document.getElementById("ticketInfoModal"));
            ticketInfoModal.show();
        },
        updateView(ticket) {
            this.update++;
            this.ticketInModal = ticket;
        },
        createNewTicket() {
            this.ticketInModal = {};
            this.$refs.ticketInfoModal.isCreating = true;
            let ticketInfoModal = new bootstrap.Modal(document.getElementById("ticketInfoModal"));
            ticketInfoModal.show();
        }
    }
};
