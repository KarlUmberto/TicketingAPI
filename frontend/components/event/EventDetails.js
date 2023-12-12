export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{EventInModal && EventInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{EventInModal && EventInModal.name}}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>{{EventInModal && EventInModal.description}}</td>
    </tr>
    <tr>
        <th>Start Date</th>
        <td>{{EventInModal && EventInModal.startDate}}</td>
    </tr>
    <tr>
        <th>End Date</th>
        <td>{{EventInModal && EventInModal.endDate}}</td>
    </tr>
    <tr>
        <th>Venue</th>
        <td>
            {{venueName}}
        </td>
    </tr>
</table>`,
    props: ["EventInModal","venueName"]
}