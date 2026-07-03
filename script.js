/* D&D 5e Random Character Generator
   Generates a lightweight character concept as a starting point for players
   Based on 5th Edition Player's Handbook content */

// ─── DATA ────────────────────────────────────────────────────────────────────

const races = [
  "Dragonborn", "Dwarf", "Elf", "Gnome",
  "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"
];

const classes = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter",
  "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"
];

const alignments = [
  "Lawful Good", "Neutral Good", "Chaotic Good",
  "Lawful Neutral", "True Neutral", "Chaotic Neutral",
  "Lawful Evil", "Neutral Evil", "Chaotic Evil"
];

// Race-flavoured name fragments
const nameFragments = {
  Dragonborn: {
    prefixes: ["Ars", "Bala", "Drak", "Gher", "Naer", "Paty", "Rhem", "Shar", "Torr", "Vrak"],
    suffixes: ["aam", "asar", "ilar", "orn", "tur", "zan", "ix", "eth", "ax", "von"]
  },
  Dwarf: {
    prefixes: ["Bor", "Dag", "Dur", "Gar", "Gim", "Mor", "Nor", "Thor", "Tor", "Ulf"],
    suffixes: ["din", "dor", "grim", "in", "li", "ok", "rak", "ri", "un", "var"]
  },
  Elf: {
    prefixes: ["Aer", "Anar", "Caer", "El", "Fae", "Lyr", "Mir", "Sil", "Thal", "Wyn"],
    suffixes: ["ael", "aith", "an", "diel", "en", "iel", "ion", "is", "on", "wyn"]
  },
  Gnome: {
    prefixes: ["Bim", "Dim", "Fin", "Gim", "Nik", "Pip", "Quib", "Rib", "Tam", "Wim"],
    suffixes: ["ble", "bo", "brim", "kin", "le", "lin", "lo", "nix", "wick", "zip"]
  },
  "Half-Elf": {
    prefixes: ["Aer", "Bren", "Car", "Del", "El", "Fen", "Lyr", "Syl", "Tar", "Wyn"],
    suffixes: ["ael", "an", "ath", "en", "ion", "is", "on", "or", "us", "wyn"]
  },
  "Half-Orc": {
    prefixes: ["Drak", "Gath", "Gruk", "Kord", "Mort", "Rath", "Skul", "Thak", "Urg", "Vrak"],
    suffixes: ["ag", "ak", "am", "ar", "ash", "at", "oth", "rak", "uk", "ush"]
  },
  Halfling: {
    prefixes: ["Bur", "Cal", "Cor", "Fin", "Mer", "Pip", "Rob", "Tom", "Wil", "Zib"],
    suffixes: ["bo", "foot", "hill", "kin", "leaf", "luck", "merry", "shire", "took", "wise"]
  },
  Human: {
    prefixes: ["Al", "Bran", "Cal", "Dav", "Ed", "Gar", "Har", "Lan", "Mor", "Ren"],
    suffixes: ["an", "ard", "en", "ias", "ic", "ien", "is", "on", "or", "us"]
  },
  Tiefling: {
    prefixes: ["Akta", "Amn", "Cul", "Dag", "Kaz", "Kel", "Mor", "Naz", "Tal", "Zar"],
    suffixes: ["as", "ath", "el", "eon", "ial", "iel", "ith", "on", "oth", "us"]
  }
};

const personalityTraits = [
  "I always have a plan for what to do when things go wrong.",
  "I am always calm, no matter what the situation.",
  "I face problems head-on — a simple direct solution is the best path.",
  "I have a sharp tongue and a sharper memory for slights.",
  "I believe that anything worth doing is worth doing right.",
  "I'm always picking up stray animals and waifs.",
  "I bluntly say what other people are hinting at or hiding.",
  "I tend to find humour in the darkest of times.",
  "I quote (or misquote) the ancient texts on every topic.",
  "I'm haunted by memories of war and can't shake them.",
  "I misuse long words in an attempt to sound smarter.",
  "I get bored easily and look for excitement wherever I can.",
  "I judge people by their actions, not their words.",
  "I prefer the company of animals to most people I've met.",
  "I don't trust easily, but once you have it, you have it for life.",
  "Sarcasm and insults are my weapons of choice.",
  "I have a weakness for a pretty face.",
  "I am horribly, visibly awkward in social situations.",
  "I'm a hopeless romantic, always searching for that perfect someone.",
  "I like to think things through carefully before acting.",
  "I have a tendency to monologue when I'm excited.",
  "Nothing can shake my optimistic attitude.",
  "I would rather make a new friend than a new enemy.",
  "I'm driven by a wanderlust that led me away from home.",
  "I was, in fact, the most interesting person in every room I've been in.",
  "I am incredibly patient — to a fault.",
  "I tend to say exactly the wrong thing at exactly the wrong time."
];

const flaws = [
  "I am suspicious of strangers and expect the worst of them.",
  "I am too quick to assume that solutions involving violence are the best ones.",
  "Once I pick a goal, I become obsessed with it to the detriment of everything else.",
  "I have a tell that reveals when I'm lying.",
  "I can't resist swiping something shiny when no one is looking.",
  "I can't keep a secret to save my life — or anyone else's.",
  "I am easily distracted by the promise of information.",
  "I follow orders, even if I think they are wrong.",
  "I'd rather eat my armour than admit when I'm wrong.",
  "I am slow to trust members of other races.",
  "Violence is my answer to almost any challenge.",
  "I am greedy to a fault, always looking for the angle.",
  "I have little respect for anyone who is not a proven warrior.",
  "My pride will likely be the death of me.",
  "I have trouble keeping my true feelings hidden — my face gives me away.",
  "I secretly believe that everyone is beneath me.",
  "I drink to dull the pain. It doesn't really help.",
  "I overlook obvious solutions in favour of complicated ones.",
  "I have a weakness: I cannot resist a challenge to my courage.",
  "I am inflexible in my thinking.",
  "I am not good at keeping my temper in check.",
  "I have a tendency to hoard things I don't really need.",
  "I judge others by a strict moral code and hold grudges when they fall short."
];

const bonds = [
  "I would do anything for the people who took me in when my parents died.",
  "A powerful person killed someone I love. I will have my revenge.",
  "I come from a noble family and must live up to the family name.",
  "My honour is my life.",
  "I owe my guild a great debt for forging me into the person I am today.",
  "I seek to preserve a sacred text that my enemies consider heretical.",
  "I will face any challenge to win the approval of my family.",
  "I protect those who cannot protect themselves.",
  "Everything I do is for the common people.",
  "I was cheated out of my rightful place. One day I will have it back.",
  "My life's work is a series of tomes about everything I have witnessed and experienced.",
  "I owe my survival to someone who helped me when I had nothing.",
  "I'm trying to pay off an old debt I can never truly repay.",
  "Someone I loved died because of a mistake I made. It will not happen again.",
  "I will do whatever it takes to find a long-lost member of my family.",
  "I have an old rival, and I will prove myself better — by any means.",
  "There is a place from my childhood that I am trying to find again.",
  "I'd lay down my life for the people I journey with."
];

const backstoryHooks = [
  "Exiled from their homeland for a crime they claim they didn't commit.",
  "The sole survivor of a band of adventurers who met a gruesome end.",
  "Raised in a remote monastery with no knowledge of the outside world.",
  "Haunted by a prophetic dream that has driven them from their home.",
  "Once served a powerful lord who turned out to be something far worse.",
  "Spent years as a wandering merchant before fate took a different turn.",
  "Lost everything in a fire and has been searching for answers ever since.",
  "Grew up on the streets of a great city and learned to survive by wit alone.",
  "Apprenticed to a legendary figure who vanished without a trace.",
  "A chance encounter with a dying stranger changed the course of their life.",
  "Descended from a long line of adventurers, the family legacy is impossible to escape.",
  "Was once part of a thieves' guild, and parted ways — badly.",
  "Spent years in service to a temple before a crisis of faith sent them wandering.",
  "Returned home one day to find it simply… gone.",
  "Carries a mysterious item they found as a child and still don't understand.",
  "Was once imprisoned for a crime they may or may not have committed.",
  "Raised by a reclusive mage on the edge of civilisation.",
  "Escaped a life of servitude and has never stopped running.",
  "Follows a rumour of a great treasure that has been passed down through the family.",
  "Chose adventure over a comfortable life, and hasn't looked back — much."
];

const statNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

// ─── GENERATION FUNCTIONS ─────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function roll4d6DropLowest() {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((sum, v) => sum + v, 0);
}

function generateName(race) {
  const frags = nameFragments[race];
  return pick(frags.prefixes) + pick(frags.suffixes);
}

function modifier(score) {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function generateCharacter() {
  const race = pick(races);
  const cls = pick(classes);
  const alignment = pick(alignments);
  const name = generateName(race);
  const traits = pickN(personalityTraits, 2);
  const flaw = pick(flaws);
  const bond = pick(bonds);
  const hook = pick(backstoryHooks);

  const scores = statNames.map(stat => ({
    stat,
    value: roll4d6DropLowest()
  }));

  return { name, race, cls, alignment, traits, flaw, bond, hook, scores };
}

// ─── DISPLAY ──────────────────────────────────────────────────────────────────

function articleFor(word) {
  return "aeiouAEIOU".includes(word[0]) ? "An" : "A";
}

function renderCharacter(char) {
  document.getElementById("char-name").textContent = char.name;
  document.getElementById("char-subtitle").textContent =
    `${articleFor(char.alignment)} ${char.alignment} ${char.race} ${char.cls}`;

  document.getElementById("char-hook").textContent = char.hook;

  const traitsEl = document.getElementById("char-traits");
  traitsEl.innerHTML = char.traits.map(t => `<li>${t}</li>`).join("");

  document.getElementById("char-flaw").textContent = char.flaw;
  document.getElementById("char-bond").textContent = char.bond;

  const statsEl = document.getElementById("char-stats");
  statsEl.innerHTML = char.scores.map(s => `
    <div class="stat-block">
      <span class="stat-label">${s.stat}</span>
      <span class="stat-value">${s.value}</span>
      <span class="stat-mod">${modifier(s.value)}</span>
    </div>
  `).join("");

  document.getElementById("generate-btn").textContent = "Roll Again";
}

function copyCharacter() {
  const name = document.getElementById("char-name").textContent;
  const subtitle = document.getElementById("char-subtitle").textContent;
  const hook = document.getElementById("char-hook").textContent;
  const traits = [...document.querySelectorAll("#char-traits li")].map(li => "• " + li.textContent).join("\n");
  const flaw = document.getElementById("char-flaw").textContent;
  const bond = document.getElementById("char-bond").textContent;
  const stats = [...document.querySelectorAll(".stat-block")].map(b => {
    const label = b.querySelector(".stat-label").textContent;
    const value = b.querySelector(".stat-value").textContent;
    const mod = b.querySelector(".stat-mod").textContent;
    return `${label}: ${value} (${mod})`;
  }).join("  ");

  const text = [
    `${name}`,
    `${subtitle}`,
    ``,
    `BACKSTORY`,
    hook,
    ``,
    `PERSONALITY`,
    traits,
    ``,
    `FLAW`,
    `• ${flaw}`,
    ``,
    `BOND`,
    `• ${bond}`,
    ``,
    `ABILITY SCORES`,
    stats
  ].join("\n");

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-btn");
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = "Copy to Clipboard", 2000);
  });
}

function roll() {
  const char = generateCharacter();
  renderCharacter(char);
}

// Init on load
window.addEventListener("DOMContentLoaded", roll);
