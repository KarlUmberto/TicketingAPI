import eventsList from "../components/EventsList.js"
import eventInfoModal from "../components/EventInfoModal.js"
import eventForm from "../components/event/EventForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newEvent" >New Event</button>
    <events-list :key="update" @showModal="openModal"></events-list>
    <event-info-modal @eventUpdated="updateView" :eventInModal="eventInModal"></event-info-modal>
    <new-object-modal id="newEventModal" @save="saveNewEvent">
        <event-form v-model:name="eventInModal.name" v-model:description="eventInModal.description" v-model:startDate="eventInModal.startDate" v-model:endDate="eventInModal.endDate" v-model:venueid="eventInModal.VenueId"></event-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        eventsList,
        eventInfoModal,
        newObjectModal,
        eventForm
    },
    data() {
        return {
            update: 0,
            eventInModal: { id: "", name: "", description: "", startDate: "", endDate: "", VenueId: "" },
            newEventModal: {},
            error: ""
        }
    },
    methods: {
        openModal(event) {
            this.error = ""
            this.eventInModal = event
            let eventInfoModal = new bootstrap.Modal(document.getElementById("eventInfoModal"))
            eventInfoModal.show()
        },
        newEvent(){
            this.eventInModal = {}
            this.newEventModal = new bootstrap.Modal(document.getElementById("newEventModal"))
            this.newEventModal.show()
        },
        async saveNewEvent(){
            console.log("Saving:", this.eventInModal)
            const rawResponse = await fetch(this.API_URL + "/events/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.eventInModal)
            });

            if(rawResponse.ok){
                this.newEventModal.hide()
                this.updateView(this.eventInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
        updateView(event){
            this.update++
            this.eventInModal = event
        }
    }
}