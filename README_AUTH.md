## Authentication Overview

#### Client --> Server: (Username, Password)
Check if credentials are valid, if so produce piece of data that identifies the currrent user. Send that data to the client

#### Server --> Client (Send identifying data)
Credentials are valid. Send identifying piece of data. Save the data. Use it whenever requesting some resource.

#### Client --> Server, Request Protected Resource {identifying data}


## OAUTH:
### Get accessToken from Google Services:

#### (CLIENT React.js)
[1. Client communicates with Google]  
[2. Client received accessToeken that is associated with this particular Google Account]  

POST localhost/3000/user/users/oath/google
Body: accessToken = 'e5d31cgb80Ec0...'

#### (SERVER - Node.js)
[1. Server receives accessToken from the client]  
[2. Server calls Google and exchanges accessToken for user profile]  
[3. Server checks whether the user with Google's ID exists in our DB]

The user profile is like a JSON object that contains some properties like, firstname, lastname, email etc. The google profile also contains a property called 'ID'. We want to check our MongoDb if we have some entry that has that ID, either we it or not. (First time seeing it) or yes it already exists.

#### ID found:
[1. Load that user from our DB]  
[2. Use existing user to sign a token]
[3. Send token back to the client]

#### ID not found:
[1. Create a new user using google's profile and store google's ID in it]  
[2. Use this, newly created, user to sign a token]  
[3. Send token back to the client]  

JWT Token ---> Client (Authenication)

## Goal / Use Cases:
[1.1 Client creates an account using local-auth.
During signin client receives JWT.]  
[1.2. Client wants to sign in using existing local-auth account. Client exchanges email/password for JWT]  
[1.3. Client wants to create new account using Google (OAuth).]

[2.1. Client wants to create new account using Google (OAuth)]  
[2.2. Client gets a hold of accessToken and send it to server]  
[2.3. Server notices that this account does not exist yet, creates it, signs a new token and returns JWT to client.]

[3.1. Client wants to log in using Google account(OAuth)]  
[3.2. Client gets a hold of accessToken and sends it to server.]  
[3.3. Server notices that this account already exists in DB, signs a new token and returns JWT to client.]

Client ---> "Protected Resource"  
(Client uses JWT to access protected resource)