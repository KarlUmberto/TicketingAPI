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
            <tr v-for="customer in customers" :key="customer.id">
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
        try {
            const response = await fetch("http://localhost:8080/customers");
            this.customers = await response.json();
        } catch (error) {
            console.error(error);
            // Handle the error appropriately, e.g., show an error message to the user.
        }
    },
    methods: {
        async getCustomer(id) {
            try {
                const response = await fetch(`http://localhost:8080/customers/${id}`);
                const customerInModal = await response.json();
                this.$emit("showModal", customerInModal);
            } catch (error) {
                console.error(error);
                // Handle the error appropriately, e.g., show an error message to the user.
            }
        }
    }
};
