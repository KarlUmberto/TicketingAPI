export default {
    /*html*/
    template: `
    <table id="customersTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="customer in customers">
                <td @click="getCustomer(customer.id)">{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            customers: []
        }
    },
    async created() {
        this.customers = await (await fetch("http://localhost:8080/customers")).json()
    },
    methods: {
        getCustomer: async function (id) {
            const customerInModal = await (await fetch(this.API_URL + "/customers/" + id)).json()
            this.$emit("showModal", customerInModal)
        }
    }
}