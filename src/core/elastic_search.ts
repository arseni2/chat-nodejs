import {Client} from "@elastic/elasticsearch";

export const run = () => {
    const client = new Client({
        node: 'http://localhost:8000',
    })
}
