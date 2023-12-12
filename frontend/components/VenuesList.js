export default {
    /*html*/
    template: `
    <table id="venuesTable" class="table table-striped table-bordered">
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
            </tr>
            <tr v-for="venue in venues">
                <td @click="getVenue(venue.id)">{{ venue.name }}</td>
                <td>{{ venue.location }}</td>
                <td>{{ venue.capacity }}</td>
            </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            venues: []
        }
    },
    async created() {
        this.venues = await (await fetch("http://localhost:8080/venues")).json()
    },
    // async beforeUpdate() {
    //     this.venues = await (await fetch("http://localhost:8080/venues")).json()
    // },
    methods: {
        getVenue: async function (id) {
            const venueInModal = await (await fetch(this.API_URL + "/venues/" + id)).json()
            this.$emit("showModal", venueInModal)
        }
    }
}