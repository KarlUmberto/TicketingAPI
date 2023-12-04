import confirmationModal from "./ConfirmationModal.js"
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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{venueInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedVenue.name"></td>
                        <td v-else>{{venueInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td v-if="isEditing"><input v-model="modifiedVenue.location"></td>
                        <td v-else>{{venueInModal.location}}</td>
                    </tr>
                    <tr>
                        <th>Capacity</th>
                        <td v-if="isEditing"><input v-model="modifiedVenue.capacity"></td>
                        <td v-else>{{venueInModal.capacity}}</td>
                    </tr>
                </table>
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
        confirmationModal
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
            console.log("DELETE confirmed");
        }
    }
}