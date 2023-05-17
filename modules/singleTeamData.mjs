import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lineup: {
        type: String,
        required: true
    },
    fieldName: {
        type: String,
        required: true
    },
    fieldLink: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        required: true
    }
}, {timestamps: true});

const singleTeam = mongoose.model('singleTeam', teamInfoSchema);

const lineupFieldData = [
    { name: "AEK", lineup: "aek-lineup.png", fieldName: "OPAP Arena Αγιά Σοφιά", fieldLink: "aek.png" },
    { name: "Panathinaikos", lineup: "pao-lineup.png", fieldName: "Γήπεδο Λεοφώρου Αλεξάνδρας", fieldLink: "pao.png" },
    { name: "Olympiakos", lineup: "pao-lineup.png", fieldName: "Στάδιο Γεώργιος Καραϊσκάκης", fieldLink: "osfp.png" },
    { name: "PAOK", lineup: "pao-lineup.png", fieldName: "Γήπεδο Τούμπας", fieldLink: "paok.png" },
    { name: "Arsenal", lineup: "pao-lineup.png", fieldName: "Emirates Stadium", fieldLink: "arsenal.png" },
    { name: "Barcelona", lineup: "pao-lineup.png", fieldName: "Spotify Camp Nou", fieldLink: "barcelona.png" },
    { name: "Fenerbahçe", lineup: "pao-lineup.png", fieldName: "Şükrü Saracoğlu Stadium", fieldLink: "fenerbahce.png" },
    { name: "Juventus", lineup: "pao-lineup.png", fieldName: "Allianz Stadium", fieldLink: "juventus.png" },
    { name: "Liverpool", lineup: "pao-lineup.png", fieldName: "Anfield", fieldLink: "liverpool.png" },
    { name: "Manchester City", lineup: "pao-lineup.png", fieldName: "Etihad Stadium", fieldLink: "manchester-city.png" },
    { name: "Manchester United", lineup: "pao-lineup.png", fieldName: "Old Trafford", fieldLink: "manchester-united.png" },
    { name: "Milan", lineup: "pao-lineup.png", fieldName: "San Siro", fieldLink: "milan.png" },
    { name: "Real Madrid", lineup: "pao-lineup.png", fieldName: "Santiago Bernabéu  Stadium", fieldLink: "real-madrid.png" },
    { name: "Paris Saint Germain", lineup: "pao-lineup.png", fieldName: "Parc des Princes", fieldLink: "paris-saint-germain.png" },
];

const playerData = [
    { name: "Γιώργος Αθανασιάδης", stats: {}, number: "30", age: 30, position: "GK", nationality: "Greek", team: "AEK" },
    { name: "Άρολντ Μουκουντί", stats: {}, number: "2", age: 26, position: "DF", nationality: "French", team: "AEK" },
    { name: "Λάζαρος Ρότα", stats: {}, number: "12", age: 26, position: "DF", nationality: "Greek", team: "AEK" },
    { name: "Γεράσιμος Μήτογλου", stats: {}, number: "24", age: 24, position: "DF", nationality: "Greek", team: "AEK" },
    { name: "Έχσαν Χατζισαφί", stats: {}, number: "28", age: 33, position: "DF", nationality: "Iranian", team: "AEK" },
    { name: "Ντάμιαν Σιμάνσκι", stats: {}, number: "4", age: 28, position: "MF", nationality: "Polish", team: "AEK" },
    { name: "Όρμπελιν Πινέδα", stats: {}, number: "13", age: 27, position: "MF", nationality: "Mexican", team: "AEK" },
    { name: "Μιγιάτ Γκατσίνοβιτς", stats: {}, number: "8", age: 28, position: "MF", nationality: "Serbian", team: "AEK" },
    { name: "Νίκλας Ελίασον", stats: {}, number: "19", age: 28, position: "MF", nationality: "Swedish", team: "AEK" },
    { name: "Σέρχιο Αραούχο", stats: {}, number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "AEK" },
    { name: "Λιβάι Γκαρσία", stats: {}, number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "AEK" },
    { name: "Πέτρος Μάνταλος", stats: {}, number: "20", age: 32, position: "MF", nationality: "Greek", team: "AEK" },
    { name: "Στίβεν Τσούμπερ", stats: {}, number: "10", age: 32, position: "FW", nationality: "Swiss", team: "AEK" },
    { name: "Γενς Γιόνσον", stats: {}, number: "6", age: 30, position: "MF", nationality: "Danish", team: "AEK" },
    { name: "Ντομαγκοϊ Βίντα", stats: {}, number: "21", age: 34, position: "DF", nationality: "Croatian", team: "AEK" },
    { name: "Γιώργος Αθανασιάδης", stats: {}, number: "30", age: 30, position: "GK", nationality: "Greek", team: "Panathinaikos" },
    { name: "Άρολντ Μουκουντί", stats: {}, number: "2", age: 26, position: "DF", nationality: "French", team: "Panathinaikos" },
    { name: "Λάζαρος Ρότα", stats: {}, number: "12", age: 26, position: "DF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Γεράσιμος Μήτογλου", stats: {}, number: "24", age: 24, position: "DF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Έχσαν Χατζισαφί", stats: {}, number: "28", age: 33, position: "DF", nationality: "Iranian", team: "Panathinaikos" },
    { name: "Ντάμιαν Σιμάνσκι", stats: {}, number: "4", age: 28, position: "MF", nationality: "Polish", team: "Panathinaikos" },
    { name: "Όρμπελιν Πινέδα", stats: {}, number: "13", age: 27, position: "MF", nationality: "Mexican", team: "Panathinaikos" },
    { name: "Μιγιάτ Γκατσίνοβιτς", stats: {}, number: "8", age: 28, position: "MF", nationality: "Serbian", team: "Panathinaikos" },
    { name: "Νίκλας Ελίασον", stats: {}, number: "19", age: 28, position: "MF", nationality: "Swedish", team: "Panathinaikos" },
    { name: "Σέρχιο Αραούχο", stats: {}, number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "Panathinaikos" },
    { name: "Λιβάι Γκαρσία", stats: {}, number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "Panathinaikos" },
    { name: "Πέτρος Μάνταλος", stats: {}, number: "20", age: 32, position: "MF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Στίβεν Τσούμπερ", stats: {}, number: "10", age: 32, position: "FW", nationality: "Swiss", team: "Panathinaikos" },
    { name: "Γενς Γιόνσον", stats: {}, number: "6", age: 30, position: "MF", nationality: "Danish", team: "Panathinaikos" },
    { name: "Ντομαγκοϊ Βίντα", stats: {}, number: "21", age: 34, position: "DF", nationality: "Croatian", team: "Panathinaikos" }
];

// Fill the stats with random numbers
playerData.forEach(player => {
    player.stats = {
        goals: Math.floor(Math.random() * 10),
        yellowCards: Math.floor(Math.random() * 10),
        redCards: Math.floor(Math.random() * 10)
    }
});

// singleTeam.deleteMany({})
//   .then(() => {
//     console.log('All existing items deleted');

//     const newItems = lineupFieldData.map(data => new singleTeam({
//         name: data.name,
//         lineup: data.lineup,
//         fieldName: data.fieldName,
//         fieldLink: data.fieldLink,
//         players: playerData.filter(player => player.team === "AEK")
//     }));

//     // save the new teams to the database
//     return singleTeam.insertMany(newItems);
//   })
//   .then(result => {
//     console.log(`${result.length} new items saved`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

  export default { singleTeam }