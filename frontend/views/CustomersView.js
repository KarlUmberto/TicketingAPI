import customersList from "../components/CustomersList.js"
import customerInfoModal from "../components/CustomerInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import customerForm from "../components/customer/CustomerForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newCustomer">New Customer</button>
    <customers-list :key="update" @showModal="openModal"></customers-list>
    <customer-info-modal @customerUpdated="updateView" :customerInModal="customerInModal"></customer-info-modal>
    <new-object-modal id="newCustomerModal" @save="saveNewCustomer">
        <customer-form v-model:name="customerInModal.name" v-model:email="customerInModal.email"></customer-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        customersList,
        customerInfoModal,
        newObjectModal,
        customerForm
    },
    data() {
        return {
            update: 0,
            customerInModal: { id: "", name: "", email: "" },
            newCustomerModal: {},
            error: ""
        }
    },
    methods: {
        openModal(customer) {
            this.customerInModal = customer
            let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"))
            customerInfoModal.show()
        },
        newCustomer() {
            this.error = ""
            this.customerInModal = {}
            this.newCustomerModal = new bootstrap.Modal(document.getElementById("newCustomerModal"))
            this.newCustomerModal.show()
        },
        updateView(customer) {
            this.update++
            this.customerInModal = customer
        },
        async saveNewCustomer() {
            console.log("Saving:", this.customerInModal)
            const rawResponse = await fetch(this.API_URL + "/customers/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.customerInModal)
            });
            if (rawResponse.ok) {
                this.newCustomerModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}