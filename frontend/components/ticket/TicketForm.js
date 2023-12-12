export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td><input :value="price" @input="$emit('update:price',$event.target.value)"></td>

    </tr>
    <tr>
        <th>Purchase Date</th>
        <td><input type="date" :value="purchaseDate" @input="$emit('update:purchaseDate',$event.target.value)"></td>
    </tr>
    <th>Event</th>
        <td>
            <select :value="eventid" @input="$emit('update:eventid',$event.target.value)">
                <option disabled>Select a event</option>
                <option v-for="event in events" :value="event.id">{{event.name}}</option>
            </select>
        </td>
</table>`,
    props: ["id", "price", "purchaseDate", "eventid"],
    emits: ["update:price", "update:purchaseDate", "update:eventid"],
    async created() {
        this.events = await (await fetch(this.API_URL + "/events")).json()
    },
    data() {
        return{
            events:[]
        }
    },
}