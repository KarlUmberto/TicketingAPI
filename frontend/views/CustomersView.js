import customersList from "../components/CustomersList.js"
import customerInfoModal from "../components/CustomerInfoModal.js"
export default {
    /*html*/
    template: `
    <customers-list :key="update" @showModal="openModal"></customers-list>
    <customer-info-modal @customerUpdated="updateView" :customerInModal="customerInModal"></customer-info-modal>
    `,
    components: {
        customersList,
        customerInfoModal
    },
    data() {
        return {
            update: 0,
        customerInModal: { id: "", name: "" , email: "" }
        }
    },
    methods: {
        openModal(customer) {
            this.customerInModal = customer
            let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"))
            customerInfoModal.show()
        },
        updateView(customer) {
            this.update++
            this.customerInModal = customer
        }
    }
}