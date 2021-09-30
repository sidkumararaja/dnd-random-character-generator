/* Code to generate a random character based with race, class and trait options
   This is based on 5th Edition Player's Handbook content
   */

   let races = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-Elf",
    "Half-Orc",
    "Halfling",
    "Human",
    "Tiefling"
  ];
  
  let classes = [
    "barbarian",
    "bard",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard"
  ];
  
  let traits = [
    "adventurous",
    "ambitious",
    "arrogant",
    "bold",
    "bossy",
    "brave",
    "careless",
    "cautious",
    "cheerful",
    "clever",
    "clumsy",
    "compassionate",
    "conceited",
    "courageous",
    "creative",
    "curious",
    "daring",
    "devout",
    "disgruntled",
    "energetic",
    "faithful",
    "friendly",
    "fun-loving",
    "generous",
    "gentle",
    "grouchy",
    "happy",
    "helpful",
    "honest",
    "honorable",
    "humble",
    "intelligent",
    "judgmental",
    "kind",
    "lazy",
    "loyal",
    "manipulative",
    "melancholy",
    "mischievous",
    "naïve",
    "narcissistic",
    "obnoxious",
    "overconfident",
    "peaceful",
    "perfectionist",
    "pleasant",
    "proud",
    "quiet",
    "respectful",
    "rude",
    "sad",
    "sarcastic",
    "selfish",
    "serious",
    "shy",
    "smart",
    "stubborn",
    "superstitious",
    "temperamental",
    "timid",
    "tricky",
    "unhappy",
    "unstable",
    "vain",
    "wild",
    "wise",
    "witty"
  ];
  
  let things = [
    "alchemy",
    "ale",
    "baths",
    "cake",
    "caves",
    "cheese",
    "dancing",
    "danger",
    "exploring",
    "fighting",
    "graveyards",
    "hunting",
    "horse riding",
    "mazes",
    "mushrooms",
    "music",
    "puzzles",
    "poetry",
    "snow",
    "spiders",
    "war"
  ];
  
  function selectRandom(optionArr) {
    // select a random option from the arrays above
    return optionArr[Math.floor(Math.random() * optionArr.length)];
  }
  
  function generateCharacter() {
    // generates the character
    // assign randomly chosen options
    let pc_race = selectRandom(races);
    let pc_class = selectRandom(classes);
    let pc_trait = selectRandom(traits);
    let pc_thing = selectRandom(things);
  
    let sentence_prefix = isVowel(pc_trait[0]); // Character description has to start with 'A' or 'An' depending on first letter of following word
    let love_hate = loveOrHate();
    let pc_description = `${sentence_prefix} ${pc_trait} ${pc_race} ${pc_class} who ${love_hate} ${pc_thing}`;
    return pc_description;
  }
  
  function isVowel(letter) {
    // check if letter is vowel or consonant
    let prefix;
    switch (letter) {
      case "a":
      case "e":
      case "i":
      case "o":
      case "u":
        prefix = "An";
        break;
      default:
        prefix = "A";
        break;
    }
    return prefix;
  }
  
  function loveOrHate() {
    // determine whether 'loves' or 'hates' will appear in character description
    if (Math.floor(Math.random() * 2) == 0) {
      return "loves";
    } else {
      return "hates";
    }
  }
  
  function displayCharacter() {
    // display the character description in the page
    document.getElementById("character-desc").innerHTML = generateCharacter();
    document.getElementById("generate-btn").innerText = "Generate another !";
  }  