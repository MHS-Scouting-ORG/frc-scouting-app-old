const initScoring = _ => {
    return {
        Cones: {
            Upper: 0,
            Mid: 0,
            Lower: 0
        },
        Cubes: {
            Upper: 0,
            Mid: 0,
            Lower: 0
        }
    }

}

const PenaltyKinds = {
    YELLOW_CARD: "YellowCard",
    RED_CARD: "RedCard",
    DISABLED: "Disabled",
    DQ: "DQ",
    BROKEN_BOT: "BrokenBot",
    NO_SHOW: "NoShow",
    NONE: "None"

}

const ChargeStationType = {
    DOCKED_ENGAGED: "DockedEngaged",
    DOCKED: "Docked",
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

const RankingPtsOpts = {
    WIN: "Win",
    TIE: "Tie",
    LOSS: "Loss",
    SUSTAINABILITY_BONUS: "SustainabilityBonus",
    ACTIVATION_BONUS: "ActivationBonus",

}

const PriorityOpts = {
    HIGH: "High",
    MID: "Mid",
    LOW: "Low",
    CONES: "Cones",
    CUBES: "Cubes",
    CHARGESTATION: "ChargeStation",
    DEFENSE: "Defense",
    SINGLE_SUBSTATION: "SingleSubStation",
    DOUBLE_STATION: "DoubleStation",
}

const buildMatchEntry = (regionalId, teamId, matchId) => {
    if (regionalId === undefined)
        throw new Error("RegionalId Not provided")
    if (teamId === undefined)
        throw new Error("TeamId Not provided")
    if (matchId === undefined)
        throw new Error("MatchId Not provided")

    return {
        id: matchId,
        name: "",
        description: "",
        Team: teamId,
        Regional: regionalId,
        Autonomous: {
            AutonomousPlacement: 0,
            Scored: initScoring(),
            Attempted: initScoring(),
            LeftCommunity: false,
            ChargeStation: ChargeStationType.NONE,
        },
        Teleop: {
            Scored: initScoring(),
            Attempted: initScoring(),
            ChargeStation: ChargeStationType.NONE,
            EndGame: ChargeStationType.NONE,
            EndGameTally: {
                Start: 0,
                End: 0
            },

            ScoringTotal: {
                Total: 0,
                GridPoints: 0,
                GridScoringByPlacement: {
                    High: 0,
                    Mid: 0,
                    Low: 0
                },
                Cones: 0,
                Cubes: 0,
            },
            DriveStrength: "",
            DriveSpeed: 0,
            ConesAccuracy: {
                High: 0,
                Mid: 0,
                Low: 0,
                Overall: 0
            },
            CubesAccuracy: {
                High: 0,
                Mid: 0,
                Low: 0,
                Overall: 0

            },
            SmartPlacement: false,

        },
        RankingPts: [],
        Comments: "",
        Penalties: {
            Fouls: 0,
            Tech: 0,
            Penalties: []
        },
        Priorities: [ ],


    }

}

/*
 * exported methods
 * buildMatchEntry - returns an object initialized with match entries
 * ChargeStationType - enum of valid charge stations types
 * IntakeType - enum of valid intake types
 */
export { ChargeStationType, IntakeType, PenaltyKinds, RankingPtsOpts, PriorityOpts, buildMatchEntry as default }