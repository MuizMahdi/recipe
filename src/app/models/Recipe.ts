import { Comment } from './Comment';

export interface Recipe
{
    RID: string;
    name: string;
    makerName: string;
    description: string;
    imagesrc: string;
    upvotes: number;
    upvoted: boolean;
    recipeIngredients: any[];
    comments: Comment[];
    upvoters: string[];
}

/*

{
   "chain":
   [{
      "blockHeader":{
         "hash":"68617368",
         "previousHash":"30",
         "timeStamp":10,
         "index":1,
         "merkleRoot":"4d65726b6c65526f6f74"
      },
      "transaction":{
         "transactionId":"Tx_ID",
         "record":{
            "patientInfo":{
               "name":"PatientName",
               "gender":"PatientGender",
               "address":"PatientAddress",
               "phone":123123123,
               "birthDate":"PatientBD",
               "race":"PatientRace",
               "email":"PatientEmail@Email.com",
               "language":"PatientLanguage",
               "patientId":1
            },
            "problems":[
               "Problem01",
               "Problem02",
            ],
            "allergiesAndReactions":[
               "Allergy01",
               "Allergy02"
            ],
            "history":{
               "Disease02":false,
               "Disease01":true
            }
         },
         "senderPubKey":"MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE7manAdupmluQJqigYPeijmzh0lEhlAssAd8iZUD24oq2lgNKQZ8EMYRG0uxxVQZ9geCh+C05QYz3pcpgSPR9Bw\u003d\u003d",
         "senderAddress":"\u00001nEDUQmiUWsJqmXhKQMGK1DDyrcdZDGAZH3",
         "recipientAddress":"\u00001n9pP78WJ7RqCxEjdKsamzbfK7rrDE4rYuT",
         "signature":"7369676e6174757265"
      }
   ]}
}

*/