import confirmationModal from "./ConfirmationModal.js"
import venueForm from "./venue/VenueForm.js"
import venueDetails from "./venue/VenueDetails.js"
export default {
    /*html*/
    template: `
<div id="venueInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <venue-form v-if="isEditing" v-model:id="modifiedVenue.id" v-model:name="modifiedVenue.name" v-model:location="modifiedVenue.location" v-model:capacity="modifiedVenue.capacity" ></venue-form>
                <venue-details v-else :venueInModal="venueInModal"></venue-details>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedVenue">Save</button>
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
<confirmation-modal :target="'#venueInfoModal'" @confirmed="deleteVenue"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        venueForm,
        venueDetails
    },
    emits: ["venueUpdated"],
    props: {
        venueInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedVenue: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedVenue = { ...this.venueInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedVenue() {
            console.log("Saving:", this.modifiedVenue)
            const rawResponse = await fetch(this.API_URL + "/venues/" + this.modifiedVenue.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedVenue)
            });
            console.log(rawResponse);
            this.$emit("venueUpdated", this.modifiedVenue)
            this.isEditing = false
        },
        deleteVenue() {
            console.log("Deleting:", this.venueInModal);
            fetch(this.API_URL + "/venues/" + this.venueInModal.id, {
                method: 'DELETE'
            });
            this.$emit("venueUpdated", {})
            this.isEditing = false
        }
    }
}