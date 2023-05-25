import single_team_obj from '../modules/singleTeamData.mjs'
import team_obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'
import player_obj from '../modules/playerData.mjs'

const { singleTeam } = single_team_obj;
const { Team } = team_obj;
const { User } = user_obj;
const { Player } = player_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const teamDisplay = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const teamName = req.params.name;
        singleTeam.find({ name: teamName }).lean().then(result => {
            Team.find().lean().then(result2 => {
                User.find().lean().then(result3 => {
                    let role = "user";
                    for (let i = 0; i < result3.length; i++) {
                        if (result3[i].username == req.session.username) {
                            if (result3[i].role == "admin") role = "admin";
                        }
                    }
                    let teamPLayers = result[0];
                    if (teamPLayers == undefined) teamPLayers = [];
                    else teamPLayers = teamPLayers.players;
                    req.session.previousTeamRender = {
                        team: result,
                        players: teamPLayers,
                        teams: result2,
                        username: req.session.username,
                        thisWeek: thisWeek,
                        role: role
                    }
                    res.render('teams', { team: result, players: teamPLayers, teams: result2, username: req.session.username, thisWeek: thisWeek, role: role })
                })
            })
        })
        .catch(err => console.log(err))
    }
}

const addTeam = (req, res) => {
    //console.log(req.body);
    Team.findOne({ name: req.body.name }).lean().then((team) => {
        if(team != null){
            res.render('standings', { errorMessage: "This team already exists", ...req.session.previousStandingsRender })
        }
        else{
            const newTeam = new Team({
                name: req.body.name,
                logo: req.body.teamIcon,
            });
            const newSingleTeam = new singleTeam({
                name: req.body.name,
                lineup: req.body.lineupImage,
                fieldName: req.body.fieldName,
                fieldLink: req.body.fieldImage
            });
            newTeam.save().then((result) => {
                newSingleTeam.save().then((result2) => {
                    res.redirect('/Local-League/teams/' + req.body.name);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        }
    })
}

const addPlayer = (req, res) => {
    Player.findOne({ name: req.body.name }).lean().then((player) => {
        if(player != null){
            res.render('teams', { errorMessage: "This player already exists", ...req.session.previousTeamRender })
        }
        else{
            const newPlayer = new Player({
                name: req.body.name,
                team: req.body.team,
                number: req.body.jerseyNumber,
                age: req.body.age,
                position: req.body.position,
                nationality: req.body.nationality
            });
            newPlayer.save().then((result) => {
                singleTeam.findOneAndUpdate({ name: req.body.team }, { $push: { players: result } }).lean().then((result2) => {
                    res.redirect('/Local-League/teams/' + req.body.team);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        }
    });
}

const editTeam = (req, res) => {
    const teamName = req.params.name;
}

const editPlayer = (req, res) => {
    const playerName = req.params.playerName;
}

const deleteTeam = (req, res) => {
    const teamName = req.params.name;
    singleTeam.findOneAndDelete({ name: teamName }).lean().then((result) => {
        Team.findOneAndDelete({ name: teamName }).lean().then((result2) => {
            res.json({ redirect: '/Local-League/standings' });
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

const deletePlayer = (req, res) => {
    const playerName = req.params.playerName;
    // Find the player in the team and delete it
    Player.findOneAndDelete({ name: playerName }).lean().then((result) => {
        // Find the team and delete the player from the team
        singleTeam.findOne({ name: req.params.teamName }).lean().then((result2) => {
            let players = result2.players;
            for (let i = 0; i < players.length; i++) {
                if (players[i].name == playerName) {
                    players.splice(i, 1);
                    break;
                }
            }
            singleTeam.findOneAndUpdate({ name: req.params.teamName }, { players: players }).lean().then((result3) => {
                res.json({ redirect: '/Local-League/teams/' + req.params.teamName });
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    })
}

export default {
    teamDisplay,
    addTeam,
    deleteTeam,
    deletePlayer,
    addPlayer
}