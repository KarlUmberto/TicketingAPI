export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{venueInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{venueInModal.name}}</td>
    </tr>
    <tr>
        <th>Location</th>
        <td>{{venueInModal.location}}</td>
    </tr>
    <tr>
        <th>Capacity</th>
        <td>{{venueInModal.capacity}}</td>
    </tr>
</table>`,
    props: ["venueInModal"]
}