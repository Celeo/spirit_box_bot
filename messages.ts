// https://phasmophobia.fandom.com/wiki/Spirit_Box

export enum QuestionTypes {
  Aggression,
  Location,
  Age,
  Miscellaneous,
}

export interface QuestionInfo {
  triggers: Array<string>;
  responses: Array<string>;
}

export const SPIRIT_BOX_ORGANIZED: Record<QuestionTypes, QuestionInfo> = {
  [QuestionTypes.Aggression]: {
    triggers: [
      "what do you want",
      "why are you here",
      "do you want to hurt us",
      "are you angry",
      "do you want us here",
      "shall we leave",
      "should we leave",
      "do you want us to leave",
      "what should we do",
      "can we help",
      "is anything wrong",
      "are you friendly",
    ],
    responses: ["Kill", "Death", "Die", "Hate", "Hurt", "Attack"],
  },
  [QuestionTypes.Location]: {
    triggers: [
      "where are you",
      "are you close",
      "can you show yourself",
      "give us a sign.",
      "let us know you are here.",
      "show yourself.",
      "can you talk",
      "speak to us.",
      "are you here",
      "are you with us",
      "anybody with us",
      "is anyone here",
      "anybody in the room",
      "anybody here",
      "is there a spirit here",
      "is there a ghost here",
      "what is your location",
    ],
    responses: [
      "I'm here",
      "I'm close",
      "I'm behind you",
      "Next to you",
      "Away",
      "Far",
    ],
  },
  [QuestionTypes.Age]: {
    triggers: [
      "how old are you",
      "how young are you",
      "what is your age",
      "when were you born",
      "are you a child",
      "are you old",
      "are you young",
    ],
    responses: ["Old", "Young"],
  },
  [QuestionTypes.Miscellaneous]: {
    triggers: [
      "are you french",
      "are you hungry",
      "what do you want to eat",
      "do you want to build a snowman",
      "do you want to watch spongebob",
      "are you casper",
      "are you bored",
    ],
    responses: ["Death"],
  },
};

export const SPIRIT_BOX = Object.values(SPIRIT_BOX_ORGANIZED);
