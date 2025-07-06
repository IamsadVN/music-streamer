import Listener from "../events/listener.js";
import { glob } from "glob";
import { pathToFileURL } from "node:url";
import Command from "../commands/command.js";

export async function getListeners(): Promise<Listener[]> {
    const listeners: Listener[] = [];

    for (const file of await glob("dist/events/*/**/*.js")) {
        const fileURL = `${pathToFileURL(file)}`;
        const listener = new (await import(fileURL)).default();
        listeners.push(listener);
    }

    return listeners;
}

export async function getCommands(): Promise<Command[]> {
    const commands: Command[] = [];

    for (const file of await glob("dist/commands/*/**/*.js")) {
        const fileURL = `${pathToFileURL(file)}`;
        const command = new (await import(fileURL)).default();
        commands.push(command);
    }

    return commands;
}