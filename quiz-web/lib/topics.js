export const TOPICS = {
  oop: "OOP cơ bản",
  constructor: "Constructor & Kế thừa",
  polymorphism: "Overloading / Overriding",
  modifier: "Access & Non-access Modifier",
  interface: "Interface & Abstract",
  static: "Static & Biến",
  string: "String & StringBuffer",
  jdbc: "JDBC",
  exception: "Exception & Runtime",
};

export const ALL_TOPICS = { ...TOPICS, other: "Khác" };

export function topicName(key) {
  return ALL_TOPICS[key] || ALL_TOPICS.other;
}
