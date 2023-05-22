import mongoose from 'mongoose';
import natchObj from './matchData.mjs';

const Schema = mongoose.Schema;
const { Match } = natchObj;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    matches: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    draws: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    homeWins: {
        type: Number,
        required: true
    },
    awayWins: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    goalsFor: {
        type: Number,
        required: true
    },
    goalsAgainst: {
        type: Number,
        required: true
    },
    goalDifference: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: false
    }
}, {timestamps: true});

const Team = mongoose.model('Team', teamSchema);

let teamsData = [
    { name: "AEK", logo: "aek.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Panathinaikos", logo: "pao.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Olympiakos", logo: "osfp.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "PAOK", logo: "paok.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Arsenal", logo: "arsenal.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Barcelona", logo: "barcelona.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Fenerbahçe", logo: "fenerbahce.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Juventus", logo: "juventus.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Liverpool", logo: "liverpool.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0},
    { name: "Manchester United", logo: "manchester-united.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Manchester City", logo: "manchester-city.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Milan", logo: "milan.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Real Madrid", logo: "real-madrid.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    { name: "Paris Saint Germain", logo: "paris-saint-germain.png", matches: 0, wins: 0, draws: 0, losses: 0, homeWins: 0, awayWins: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 }
];

async function updateData(){
    Team.find().lean().then((teams) => {
        for(let i = 0; i < teams.length; i++){
            // reset all teams
            teams[i].matches = 0;
            teams[i].wins = 0;
            teams[i].draws = 0;
            teams[i].losses = 0;
            teams[i].homeWins = 0;
            teams[i].awayWins = 0;
            teams[i].goalsFor = 0;
            teams[i].goalsAgainst = 0;
            teams[i].goalDifference = 0;
            teams[i].points = 0;
            Match.find( {$or: [
                { "homeTeam.name": teams[i].name },
                { "awayTeam.name": teams[i].name }
                ], "state": "Final" }).lean().then((result) => {
                teams[i].matches = result.length;
                for(let j = 0; j < result.length; j++){
                    if(result[j].homeTeam.name === teams[i].name){
                        if(result[j].homeTeam.score > result[j].awayTeam.score){
                            teams[i].wins++;
                            teams[i].homeWins++;
                        }
                        else if(result[j].homeTeam.score < result[j].awayTeam.score){
                            teams[i].losses++;
                        }
                        else{
                            teams[i].draws++;
                        }
                        teams[i].goalsFor += result[j].homeTeam.score;
                        teams[i].goalsAgainst += result[j].awayTeam.score;
                    }
                    else if(result[j].awayTeam.name === teams[i].name){
                        if(result[j].awayTeam.score > result[j].homeTeam.score){
                            teams[i].wins++;
                            teams[i].awayWins++;
                        }
                        else if(result[j].awayTeam.score < result[j].homeTeam.score){
                            teams[i].losses++;
                        }
                        else{
                            teams[i].draws++;
                        }
                        teams[i].goalsFor += result[j].awayTeam.score;
                        teams[i].goalsAgainst += result[j].homeTeam.score;
                    }
                }
                teams[i].points = teams[i].wins * 3 + teams[i].draws;
                teams[i].goalDifference = teams[i].goalsFor - teams[i].goalsAgainst;
                Team.updateOne({ name: teams[i].name }, { $set: teams[i] }).then((result1) => {
                    // console.log(result1);
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
            console.log(err);
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

    await Team.find().sort({ points: -1 }).lean().then((result) => {
        console.log(result);
        result.forEach((team, index) => {
            Team.updateOne({ _id: team._id }, { $set: { rank: index + 1 } }).then((result1) => {
                console.log(result1);
            })
            .catch((err) => {
                console.log(err);
            })
        })
    })
    .catch((err) => {
        console.log(err);
    });
}

// Team.deleteMany()
//   .then(() => {
//     console.log('All existing teams deleted');
//   })
//   .catch(error => {
//     console.error(error);
//   });

export default {
    Team,
    updateData
}