export default {
    /*html*/
    template: `
    <table id="eventsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue</th>
        </tr>
        <tr v-for="event in events">
            <td @click="getEvent(event.id)">{{ event.name }}</td>
            <td>{{ event.description }}</td>
            <td>{{ event.startDate }}</td>
            <td>{{ event.endDate }}</td>
            <td>
            <span v-if="event.Venue">{{ event.Venue.name }}</span>
            <span v-else>No Venue</span>
        </td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            events: []
        }
    },
    async created() {
        this.events = await (await fetch("http://localhost:8080/events")).json()
    },
    methods: {
        getEvent: async function (id) {
            const eventInModal = await (await fetch(this.API_URL + "/events/" + id)).json()
            this.$emit("showModal", eventInModal)
        }
    }
}