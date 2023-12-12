import ticketsList from "../components/TicketsList.js"
import ticketInfoModal from "../components/TicketInfoModal.js"
import ticketForm from "../components/ticket/TicketForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newTicket" >New Ticket</button>
    <tickets-list :key="update" @showModal="openModal"></tickets-list>
    <ticket-info-modal @ticketUpdated="updateView" :ticketInModal="ticketInModal"></ticket-info-modal>
    <new-object-modal id="newTicketModal" @save="saveNewTicket">
        <ticket-form v-model:price="ticketInModal.price" v-model:purchaseDate="ticketInModal.purchaseDate" v-model:eventid="ticketInModal.EventId"></ticket-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        ticketsList,
        ticketInfoModal,
        newObjectModal,
        ticketForm
    },
    data() {
        return {
            update: 0,
            ticketInModal: { id: "", price: "", purchaseDate: "", EventId: "" },
            newTicketModal: {},
            error: ""
        }
    },
    methods: {
        openModal(ticket) {
            this.error = ""
            this.ticketInModal = ticket
            let ticketInfoModal = new bootstrap.Modal(document.getElementById("ticketInfoModal"))
            ticketInfoModal.show()
        },
        newTicket(){
            this.ticketInModal = {}
            this.newTicketModal = new bootstrap.Modal(document.getElementById("newTicketModal"))
            this.newTicketModal.show()
        },
        async saveNewTicket(){
            console.log("Saving:", this.ticketInModal)
            const rawResponse = await fetch(this.API_URL + "/tickets/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.ticketInModal)
            });

            if(rawResponse.ok){
                this.newTicketModal.hide()
                this.updateView(this.ticketInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
        updateView(ticket){
            this.update++
            this.ticketInModal = ticket
        }
    }
}