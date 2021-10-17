export function jsonParser(body) {
    try {
        return JSON.parse(body);
    } catch {
        console.error("Improper Format");
    }
}