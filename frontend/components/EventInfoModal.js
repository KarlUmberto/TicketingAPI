import confirmationModal from "./ConfirmationModal.js"
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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{eventInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedEvent.name"></td>
                        <td v-else>{{eventInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td v-if="isEditing"><input v-model="modifiedEvent.description"></td>
                        <td v-else>{{eventInModal.description}}</td>
                    </tr>
                    <tr>
                        <th>Start Date</th>
                        <td v-if="isEditing"><input v-model="modifiedEvent.startDate"></td>
                        <td v-else>{{eventInModal.startDate}}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td v-if="isEditing"><input v-model="modifiedEvent.endDate"></td>
                        <td v-else>{{eventInModal.endDate}}</td>
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
<confirmation-modal :target="'#eventInfoModal'" @confirmed="deleteEvent"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["eventUpdated"],
    props: {
        eventInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedEvent: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedEvent = { ...this.eventInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedEvent() {
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
        deleteEvent() {
            console.log("DELETE confirmed");
        }
    }
}