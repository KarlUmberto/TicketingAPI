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
        <th>Description</th>
        <td><input :value="description" @input="$emit('update:description',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Start Date</th>
        <td><input type="date" :value="startDate" @input="$emit('update:startDate',$event.target.value)"></td>
    </tr>
    <tr>
        <th>End Date</th>
        <td><input type="date" :value="endDate" @input="$emit('update:endDate',$event.target.value)"></td>
    </tr>
    <th>Venue</th>
        <td>
            <select :value="venueid" @input="$emit('update:venueid',$event.target.value)">
                <option disabled>Select a venue</option>
                <option v-for="venue in venues" :value="venue.id">{{venue.name}}</option>
            </select>
        </td>
</table>`,
    props: ["id", "name", "description", "startDate", "endDate", "venueid"],
    emits: ["update:name", "update:description", "update:startDate", "update:endDate", "update:venueid"],
    async created() {
        this.venues = await (await fetch(this.API_URL + "/venues")).json()
    },
    data() {
        return{
            venues:[]
        }
    },
}