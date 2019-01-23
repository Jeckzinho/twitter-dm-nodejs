const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 3; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Comeηando a enviar as DM πππ");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" ππππ Novo seguidor  πππππ ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`DM enviada com sucesso para  ${screen_name}  πͺπͺ`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Olα ${name} Obrigado por me seguir, se possivel de um RT no meu Tweet Fixado .... \n  https://twitter.com/Jeckzinho/status/418876166943277056 Happy ${dayName} ππ `; // your message
  // My message   return `Hi ${name} Thanks for being a part of my social media network. I'am the @PicsrushE founder,A new Online Image Editor completely with web technologies,I'm also a reactjs developer and medium blogger.\n Happy to discuss anytime π  \n Happy ${dayName} ππ `;
};

module.exports = AutoDM;
