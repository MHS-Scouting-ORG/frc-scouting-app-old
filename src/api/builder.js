const initScoring = _ => {
    return {
        Cones: {
            Upper: 0,
            Mid: 0,
            Lower: 0
        },
        Cubes : {
            Upper: 0,
            Mid: 0,
            Lower: 0
        }
    }
 
}

const ChargeStationType = {
    DOCKED_ENGAGED : "DockedEngaged",
    DOCKED : "Docked",
    ATTEMPTED: "ATTEMPTED",
    NONE: "None"
}

const IntakeType = {
    SINGLE_SUBSTATION: "SingleSubStation",
    DOUBLE_STATION: "DoubleStation",
    PORTALS: "Portals",
    SLIDING_SHELVES: "SlidingShelves",
    GROUND: "Ground"
}

const buildMatchEntry = (regionalId, teamId, matchId) => {
    if(regionalId === undefined) 
        throw new Error("RegionalId Not provided")
    if(teamId === undefined)
        throw new Error("TeamId Not provided")
    if(matchId === undefined)
        throw new Error("MatchId Not provided")
    
    return {
        id: matchId,
        name: "",
        description: "",
        Team: teamId,
        Regional: regionalId,
        Autonomous: {
            Scored : initScoring(),
            Attempted: initScoring(),
            LeftCommunity: false,
            ChargeStation: ChargeStationType.NONE,
        },
        Teleop : {
            Scored : initScoring(),
            Attempted: initScoring(),
            Accuracy: -1,
            RankingPts: 0,
            ChargeStation: ChargeStationType.NONE,
            Penalties: {
                Fouls: 0,
                Tech: 0,
                Yellow: 0,
                Red: 0,
                Disabled: false,
                DQ: false,
                BrokenBot: false   
            }
        },
        SmartPlacement: false,
        Comments: "",
        IntakeFrom: [] 
    }
    
}

export { ChargeStationType, IntakeType, buildMatchEntry as default }