import venuesList from "../components/VenuesList.js"
import venueInfoModal from "../components/VenueInfoModal.js"
export default {
    /*html*/
    template: `
    <venues-list :key="update" @showModal="openModal"></venues-list>
    <venue-info-modal @venueUpdated="updateView" :venueInModal="venueInModal"></venue-info-modal>
    `,
    components: {
        venuesList: venuesList,
        venueInfoModal: venueInfoModal,
    },
    data() {
        return {
            update: 0,
            venueInModal: { id: "", name: "", location: "" , capacity: ""},
        }
    },
    methods: {
        openModal(venue) {
            this.venueInModal = venue
            let venueInfoModal = new bootstrap.Modal(document.getElementById("venueInfoModal"))
            venueInfoModal.show()
        },
        updateView(venue) {
            this.update++
            this.venueInModal = venue
        }
    }
}