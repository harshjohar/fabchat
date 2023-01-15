# FabChat

<img src="./demo/4.png" height="200">

Fabchat is a VoIP and instant messaging social platform. Create servers, create channels, talk on voice chat/real time messaging.

Built using NEXTjs, Firebase, twilio and Expressjs.

## Features

-   Create Servers
    -   Communities to build with friends/people with similar interest.
-   Create channels in servers
    -   Different chats for different topics/discussions in a single server.
-   Real time messaging
    -   Text channels
    -   Send images
-   VOIP/Voice Chat
    -   Voice channels
-   Direct messaging
    -   Voice chat
    -   Text chat

<!-- ## Implementation

Features are implemented using the following technologies

### Servers and channels

These are stored inside the firebase firestore database.

### Real time messaging

Firestore database is a real time databse provided by firebase(google). Users can send images or text in the messages.

Users can also text single users(direct messaging) on this platform. -->

<!-- ### VOIP

Users can have voice chats in the servers(supports upto 25 people at once in a channel) or direct calling a single user. -->

## Contribute

Follow these steps to contribute.

### Fork the repository.

Fork the repository to your own account.

### Clone the forked repo

Clone the forked repo to your local machine using the following command.

```bash
git fork https://github.com/<username>/fabchat
```

### Local Setup

Run these command to install dependencies.

```bash
cd fabchat && yarn install
```

-   If yarn is not installed, install it using

```bash
npm i -g yarn
```

-   In UNIX/LINUX machines

    ```bash
    sudo npm i -g yarn
    ```

### Firebase setup

Create a project on firebase, and create a web app inside it. And configure the following

-   Firebase Auth [link](https://firebase.google.com/docs/auth/web/google-signin)
-   Firestore database [link](https://firebase.google.com/docs/firestore/quickstart#web-version-9_1)
-   Firebase storage [link](https://firebase.google.com/docs/storage/web/start)

-   Firebase webapp setup [link](https://firebase.google.com/docs/web/setup)

### Environment variables

Create `.env.local` file, by copying all keys from `.env.example` and taking values from the firebase configuration.

### Start locally, run

```bash
yarn dev
```

Happy Contributing!
