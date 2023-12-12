import venuesList from "../components/VenuesList.js"
import venueInfoModal from "../components/VenueInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import venueForm from "../components/venue/VenueForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newVenue">New Venue</button>
    <venues-list :key="update" @showModal="openModal"></venues-list>
    <venue-info-modal @venueUpdated="updateView" :venueInModal="venueInModal"></venue-info-modal>
    <new-object-modal id="newVenueModal" @save="saveNewVenue">
        <venue-form v-model:name="venueInModal.name" v-model:location="venueInModal.location" v-model:capacity="venueInModal.capacity"></venue-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        venuesList,
        venueInfoModal,
        newObjectModal,
        venueForm
    },
    data() {
        return {
            update: 0,
            venueInModal: { id: "", name: "", location: "", capacity: "" },
            newVenueModal: {},
            error: ""
        }
    },
    methods: {
        openModal(venue) {
            this.venueInModal = venue
            let venueInfoModal = new bootstrap.Modal(document.getElementById("venueInfoModal"))
            venueInfoModal.show()
        },
        newVenue() {
            this.error = ""
            this.venueInModal = {}
            this.newVenueModal = new bootstrap.Modal(document.getElementById("newVenueModal"))
            this.newVenueModal.show()
        },
        updateView(venue) {
            this.update++
            this.venueInModal = venue
        },
        async saveNewVenue() {
            console.log("Saving:", this.venueInModal)
            const rawResponse = await fetch(this.API_URL + "/venues/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.venueInModal)
            });
            if (rawResponse.ok) {
                this.newVenueModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}