let data = [
    { id: 1, name: "D3", location: "Telliskivi 62/2", capacity: 1500 },
    { id: 2, name: "Lauluväljak", location: "Narva mnt 95", capacity: 75000 },
    { id: 3, name: "Club Hollywood", location: "Vana-Posti 8", capacity: 1400 },
    { id: 4, name: "Studio", location: "Sauna 1", capacity: 600 },
    { id: 5, name: "Helitehas", location: "Madara 22a", capacity: 700 },
    { id: 6, name: "Unibet Arena", location: "Paldiski mnt 104b", capacity: 17500 },
    { id: 7, name: "Cathouse", location: "Tartu maantee 17", capacity: 800 },
    { id: 8, name: "Alexela Concert Hall", location: " Estonia pst 9", capacity: 1800 }
]

exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "name": g.name, "location": g.location, "capacity": g.capacity } })
}

exports.getById = (id) => {
    return data.find((thing) => thing.id = parseInt(id))
}
exports.create = (newVenue) => {
    const newId = Math.max(...data.map((thing) => thing.id) + 1)
    newVenue.id = newId
    data.push(newVenue)
    return newVenue
}