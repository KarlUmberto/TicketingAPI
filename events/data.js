let data = [
    { id: 1, name: "VOLT presents: Bou", description: "", startDate: "15.09", endDate: "16.09" },
    { id: 2, name: "Alchemist", description: "", startDate: "07.10", endDate: "08.10" },
    { id: 3, name: "Project X", description: "", startDate: "", endDate: "" },
    { id: 4, name: "Club Hollywood's 28th BDY", description: "Olete valmis pidutsema nii, nagu poleks homset!? Meie igatahes oleme. Selleks oleme kohale kutsunud kohaliku kahuriväe - lemsalu, kohvri ja reketi. Kütust lisavad juurde muul, whogaux ja mirson. Lubame sulle fantastilist muusikat, a-klassi meelelahutust. Tule kohale, lööme kokku, möllame ja teeme pulli.", startDate: "", endDate: "" },
    { id: 5, name: "SIMPLE SESSION AFTERPARTIES", description: "", startDate: "22.09", endDate: "23.09" },
    { id: 6, name: "SIMPLE SESSION CURB SUNDAY", description: "", startDate: "23.09", endDate: "24.09" },
    { id: 7, name: "Project X", description: "", startDate: "", endDate: "" },
    { id: 8, name: "Project X", description: "", startDate: "", endDate: "" },
]


exports.getAll = () => {
    return data.map(g => {return{"id": g.id, "name": g.name}})
}

exports.getById = (id) => {
    return data
}