export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{TicketInModal && TicketInModal.id}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td>{{TicketInModal && TicketInModal.price}}</td>
    </tr>
    <tr>
        <th>Purchase Date</th>
        <td>{{TicketInModal && TicketInModal.purchaseDate}}</td>
    </tr>
    <tr>
        <th>Event</th>
        <td>
            {{eventName}}
        </td>
    </tr>
</table>`,
    props: ["TicketInModal","eventName"]
}