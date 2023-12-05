import ConfirmationModal from "./ConfirmationModal.js";

export default {
    /*html*/
    template: `
        <div id="customerInfoModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form v-if="isCreating" @submit.prevent="createNewCustomer">
                            <div class="mb-3">
                                <label for="newCustomerName" class="form-label">Name</label>
                                <input type="text" v-model="newCustomer.name" class="form-control" id="newCustomerName" required>
                            </div>
                            <div class="mb-3">
                                <label for="newCustomerEmail" class="form-label">Email</label>
                                <input type="email" v-model="newCustomer.email" class="form-control" id="newCustomerEmail" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </form>
                        <table v-else class="table table-striped">
                            <tr>
                                <th>Id</th>
                                <td>{{customerInModal.id}}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td v-if="isEditing"><input v-model="modifiedCustomer.name"></td>
                                <td v-else>{{customerInModal.name}}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td v-if="isEditing"><input v-model="modifiedCustomer.email"></td>
                                <td v-else>{{customerInModal.email}}</td>
                            </tr>
                        </table>
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
                                        <button type="button" class="btn btn-success mx-2" @click="isEditing ? saveModifiedCustomer : startEditing">
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
        </div>
        <ConfirmationModal :target="'#customerInfoModal'" @confirmed="deleteCustomer"></ConfirmationModal>
    `,
    components: {
        ConfirmationModal
    },
    emits: ["customerUpdated"],
    props: {
        customerInModal: {}
    },
    data() {
        return {
            isEditing: false,
            isCreating: false,
            modifiedCustomer: {},
            newCustomer: {
                name: "",
                email: ""
            }
        }
    },
    methods: {
        startEditing() {
            this.modifiedCustomer = { ...this.customerInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        async saveModifiedCustomer() {
            try {
                console.log("Saving:", this.modifiedCustomer);
                const rawResponse = await fetch(`http://localhost:8080/customers/${this.modifiedCustomer.id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.modifiedCustomer)
                });
                console.log(rawResponse);
                this.$emit("customerUpdated", this.modifiedCustomer);
                this.isEditing = false;
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        },

        deleteCustomer() {
            try {
                // Make a DELETE request to the server
                fetch(`http://localhost:8080/customers/${this.customerInModal.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete customer');
                    }
                    console.log("DELETE confirmed");
                    this.$emit("customerUpdated", {}); // Signal that the customer is deleted
                    let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"));
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

        // Create new customer methods
        createNewCustomer() {
            try {
                console.log("Creating:", this.newCustomer);
                fetch('http://localhost:8080/customers', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newCustomer)
                })
                    .then(response => response.json())
                    .then(newCustomer => {
                        console.log("Created:", newCustomer);
                        this.$emit("customerUpdated", newCustomer);
                        this.cancelCreating();
                    });
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        },

        cancelCreating() {
            this.isCreating = false;
            this.newCustomer = {
                name: "",
                email: ""
            };
        }
    }
};
