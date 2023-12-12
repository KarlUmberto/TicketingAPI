export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>

    </tr>
    <tr>
        <th>Email</th>
        <td><input :value="email" @input="$emit('update:email',$event.target.value)"></td>
    </tr>
    <th>Ticket</th>
        <td>
            <select :value="ticketid" @input="$emit('update:ticketid',$event.target.value)">
                <option disabled>Select a ticket</option>
                <option v-for="ticket in tickets" :value="ticket.id">{{ticket.purchaseDate}}</option>
            </select>
        </td>
</table>`,
    props: ["id", "name", "email", "ticketid"],
    emits: ["update:name", "update:email", "update:ticketid"],
    async created() {
        this.tickets = await (await fetch(this.API_URL + "/tickets")).json()
    },
    data() {
        return{
            tickets:[]
        }
    },
}