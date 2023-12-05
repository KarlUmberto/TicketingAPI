import customersList from "../components/CustomersList.js";
import customerInfoModal from "../components/CustomerInfoModal.js";

export default {
    /*html*/
    template: `
    <div>
        <customers-list :key="update" @showModal="openModal"></customers-list>
        <customer-info-modal ref="customerInfoModal" @customerUpdated="updateView" :customerInModal="customerInModal"></customer-info-modal>
        <button type="button" class="btn btn-primary" @click="createNewCustomer">Create New Customer</button>
    </div>
    `,
    components: {
        customersList,
        customerInfoModal
    },
    data() {
        return {
            update: 0,
            customerInModal: { id: "", name: "", email: "" }
        };
    },
    methods: {
        openModal(customer) {
            this.customerInModal = customer;
            let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"));
            customerInfoModal.show();
        },
        updateView(customer) {
            this.update++;
            this.customerInModal = customer;
        },
        createNewCustomer() {
            this.customerInModal = {}; // Clear any existing customer data
            this.$refs.customerInfoModal.isCreating = true; // Set isCreating to true
            let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"));
            customerInfoModal.show();
        }
    }
};
