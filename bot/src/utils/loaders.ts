import Listener from "../events/listener.js";
import { glob } from "glob";
import { pathToFileURL } from "node:url";

export async function getListeners(): Promise<Listener[]> {
    const listeners: Listener[] = [];

    for (const file of await glob("dist/events/*/**/*.js")) {
        const fileURL = `${pathToFileURL(file)}`;
        const listener = new (await import(fileURL)).default();
        listeners.push(listener);
    }

    return listeners;
}