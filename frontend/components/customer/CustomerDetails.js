export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{customerInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{customerInModal.name}}</td>
    </tr>
    <tr>
        <th>Email</th>
        <td>{{customerInModal.email}}</td>
    </tr>
</table>`,
    props: ["customerInModal"]
}