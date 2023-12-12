import confirmationModal from "./ConfirmationModal.js"
import eventForm from "./event/EventForm.js"
import eventDetails from "./event/EventDetails.js"
export default {
    /*html*/
    template: `
<div id="eventInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <event-form v-if="isEditing"  v-model:id="modifiedEvent.id" v-model:name="modifiedEvent.name" v-model:description="modifiedEvent.description" v-model:startDate="modifiedEvent.startDate" v-model:endDate="modifiedEvent.endDate" v-model:venueid="modifiedEvent.VenueId"></event-form>
                <event-details v-else v-model:eventInModal="eventInModal" v-model:venueName="venueName"></event-details>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedEvent">Save</button>
                                <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col me-auto"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<confirmation-modal :target="'#eventInfoModal'" @confirmed="deleteEvent" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        eventForm,
        eventDetails
    },
    emits:["eventUpdated"],
    props: {
        eventInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedEvent:{},
            venues: []
        }
    },

    computed: {
        formattedDate: {
            get() {
              return this.modifiedEvent.startDate ? new Date(this.modifiedEvent.startDate).toISOString().split('T')[0] : null;
            },
            set(value) {
              this.modifiedDate.startDate = value;
            }
          },
        venueName:{
            get(){
                if(this.eventInModal.VenueId == null) return "No Venue";
                const venue = this.venues.find(venue => venue.id == this.eventInModal.VenueId)
                if(venue) return venue.name
                return "";
            }
        }
    },
    async created() {
        this.venues = await (await fetch(this.API_URL + "/venues")).json()
    },
    methods: {
        startEditing(){
            this.modifiedEvent = {...this.eventInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedEvent(){
            console.log("Saving:", this.modifiedEvent)
            const rawResponse = await fetch(this.API_URL + "/events/" + this.modifiedEvent.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedEvent)
            });
            console.log(rawResponse);
            this.$emit("eventUpdated", this.modifiedEvent)
            this.isEditing = false
        },
        deleteEvent(){
            console.log("Deleting:", this.eventInModal);
            fetch(this.API_URL + "/events/" + this.eventInModal.id, {
                method: 'DELETE'
            });
            this.$emit("eventUpdated", {})
            this.isEditing = false
        }
    }
}