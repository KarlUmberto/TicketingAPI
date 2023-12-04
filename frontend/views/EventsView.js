import eventsList from "../components/EventsList.js"
import eventInfoModal from "../components/EventInfoModal.js"
export default {
    /*html*/
    template: `
    <events-list :key="update" @showModal="openModal"></events-list>
    <event-info-modal @eventUpdated="updateView" :eventInModal="eventInModal"></event-info-modal>
    `,
    components: {
        eventsList,
        eventInfoModal
    },
    data() {
        return {
            update: 0,
        eventInModal: { id: "", name: "" , description: "", startDate: "", endDate: ""}
        }
    },
    methods: {
        openModal(event) {
            this.eventInModal = event
            let eventInfoModal = new bootstrap.Modal(document.getElementById("eventInfoModal"))
            eventInfoModal.show()
        },
        updateView(event) {
            this.update++
            this.eventInModal = event
        }
    }
}