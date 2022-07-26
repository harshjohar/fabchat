export interface Server {
    id: String,
    name: String,
    owner: String,
    members: [String],
    community: boolean,
    photo: String,
    activeChannel: String
}