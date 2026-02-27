import { Connection } from "mongoose"

declare global{
    var mongoose:{
        connect:Connection | null,
        promise:Promise<Connection> | null
    }
}

export {}