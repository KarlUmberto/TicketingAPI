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
        <th>Location</th>
        <td><input :value="location" @input="$emit('update:location',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Capacity</th>
        <td><input :value="capacity" @input="$emit('update:capacity',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "location" , "capacity"],
    emits: ["update:name", "update:location", "update:capacity"]
}