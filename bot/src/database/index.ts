import { FieldPacket } from "mysql2";
import poolDatabase from "../database.js";
import { GuildRecord } from "../types/query.js";
import { dbLogger } from "../utils/logger.js";

async function queryDatabase<Type>(sql: string, params: any[] = []): Promise<[Type[],FieldPacket[]]> {
    try {
        const [result,rows] = await poolDatabase.execute(sql,params) as unknown as [Type[],FieldPacket[]];

        dbLogger.debug(result, rows);

        return [result,rows];
    }
    catch (err) {
        dbLogger.error(err);
        return [[], []];
    }
}   

export async function guildLocaleCodeGet(guildID: string): Promise<GuildRecord[]> {
    const [result, rows] = await queryDatabase<GuildRecord>(
        "SELECT * FROM guilds.locales WHERE guildID = ?", 
        [guildID]
    );

    return result;

}

export async function guildLocaleCodeWrite(guildID: string, localeCode: string): Promise<void> {
    await queryDatabase<void>(
        "INSERT INTO guilds.locales VALUES (?, ?)",
        [guildID, localeCode]
    );
}

export async function guildLocaleCodeDelete(guildID:string): Promise<void> {
    await queryDatabase<void>(
        "DELETE FROM guilds.locales WHERE guildID = ?",
        [guildID]
    );
}

export async function guildLocalCodeUpdate(guildID:string, localeCode: string): Promise<void> {
    await queryDatabase<void>(
        "UPDATE guilds.locales SET localeCode = ? WHERE guildID = ?",
        [localeCode,guildID]
    );
}