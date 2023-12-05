// TicketInfoModal.js
import ConfirmationModal from "./ConfirmationModal.js";

export default {
    /*html*/
    template: `
        <div id="ticketInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table v-if="!isCreating" class="table table-striped">
                            <tr>
                                <th>ID</th>
                                <td>{{ ticketInModal.id }}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td v-if="isEditing"><input v-model="modifiedTicket.price"></td>
                                <td v-else>{{ ticketInModal.price }}</td>
                            </tr>
                            <tr>
                                <th>Purchase Date</th>
                                <td v-if="isEditing"><input v-model="modifiedTicket.purchaseDate" type="date"></td>
                                <td v-else>{{ ticketInModal.purchaseDate }}</td>
                            </tr>
                            <tr>
                                <th>Event ID</th>
                                <td v-if="isEditing"><input v-model="modifiedTicket.EventId" type="number"></td>
                                <td v-else>{{ ticketInModal.EventId }}</td>
                            </tr>
                            <tr>
                                <th>Customer ID</th>
                                <td v-if="isEditing"><input v-model="modifiedTicket.CustomerId" type="number"></td>
                                <td v-else>{{ ticketInModal.CustomerId }}</td>
                            </tr>
                        </table>
                        <form v-else @submit.prevent="createNewTicket">
                            <div class="mb-3">
                                <label for="price" class="form-label">Price</label>
                                <input v-model="newTicket.price" type="number" class="form-control" id="price" required>
                            </div>
                            <div class="mb-3">
                                <label for="purchaseDate" class="form-label">Purchase Date</label>
                                <input v-model="newTicket.purchaseDate" type="date" class="form-control" id="purchaseDate" required>
                            </div>
                            <div class="mb-3">
                                <label for="EventId" class="form-label">Event ID</label>
                                <input v-model="newTicket.EventId" type="number" class="form-control" id="EventId" required>
                            </div>
                            <div class="mb-3">
                                <label for="CustomerId" class="form-label">Customer ID</label>
                                <input v-model="newTicket.CustomerId" type="number" class="form-control" id="CustomerId" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <template v-if="isCreating">
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-secondary" @click="cancelCreating">Cancel</button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col me-auto">
                                        <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-success mx-2" @click="isEditing ? saveModifiedTicket : startEditing">
                                            {{ isEditing ? 'Save' : 'Edit' }}
                                        </button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <confirmation-modal :target="'#ticketInfoModal'" @confirmed="deleteTicket"></confirmation-modal>
        </div>
    `,
    components: {
        ConfirmationModal
    },
    emits: ["ticketUpdated"],
    props: {
        ticketInModal: {}
    },
    data() {
        return {
            isEditing: false,
            isCreating: false,
            modifiedTicket: {},
            newTicket: {
                price: "",
                purchaseDate: "",
                EventId: "",
                CustomerId: ""
            }
        };
    },
    methods: {
        startEditing() {
            this.modifiedTicket = { ...this.ticketInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedTicket() {
            try {
                console.log("Saving:", this.modifiedTicket);
                const response = await fetch(`http://localhost:8080/tickets/${this.modifiedTicket.id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.modifiedTicket)
                });

                if (!response.ok) {
                    throw new Error('Failed to save ticket');
                }

                const savedTicket = await response.json();
                console.log("Saved:", savedTicket);
                this.$emit("ticketUpdated", savedTicket);
                this.isEditing = false;
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        },

        deleteTicket() {
            try {
                // Make a DELETE request to the server
                fetch(`http://localhost:8080/customers/${this.ticketInModal.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete ticket');
                    }
                    console.log("DELETE confirmed");
                    this.$emit("ticketUpdated", {}); // Signal that the customer is deleted
                    let customerInfoModal = new bootstrap.Modal(document.getElementById("ticketInfoModal"));
                    customerInfoModal.hide();
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error appropriately, e.g., show an error message to the user.
                });
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        },

        createNewTicket: async function () {
            try {
                console.log("Creating:", this.newTicket);
                const response = await fetch('http://localhost:8080/tickets', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newTicket)
                });

                if (!response.ok) {
                    throw new Error('Failed to create ticket');
                }

                const newTicket = await response.json();
                console.log("Created:", newTicket);
                this.$emit("ticketUpdated", newTicket);
                this.cancelCreating();
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        },

        cancelCreating() {
            this.isCreating = false;
            this.newTicket = {
                name: "",
                price: "",
                purchaseDate: "",
                EventId: "",
                CustomerId: ""
            };
        }
    }
};
