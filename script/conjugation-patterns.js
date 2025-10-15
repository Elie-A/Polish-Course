// Polish Verb Conjugation Patterns
// Comprehensive conjugation rules for different verb patterns

const CONJUGATION_PATTERNS = {
  // Present tense patterns
  present: [
    // -ać verbs
    {
      pattern: /ać$/,
      type: "regular",
      stemTransform: (verb) => verb.replace(/ać$/, ""),
      endings: ["am", "asz", "a", "amy", "acie", "ają"],
      example: "mieszkać → mieszkam"
    },
    // -ić/-yć verbs
    {
      pattern: /[iy]ć$/,
      type: "regular", 
      stemTransform: (verb) => verb.replace(/[iy]ć$/, ""),
      endings: ["ę", "isz", "i", "imy", "icie", "ią"],
      example: "robić → robię"
    },
    // -ować verbs
    {
      pattern: /ować$/,
      type: "regular",
      stemTransform: (verb) => verb.replace(/ować$/, ""),
      endings: ["uję", "ujesz", "uje", "ujemy", "ujecie", "ują"],
      example: "pracować → pracuję"
    },
    
    // Irregular patterns with stem changes
    {
      pattern: /brać$/,
      type: "irregular",
      stemTransform: (verb) => "bior",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "brać → biorę"
    },
    {
      pattern: /spać$/,
      type: "irregular", 
      stemTransform: (verb) => "śpi",
      endings: ["ę", "sz", "", "my", "cie", "ą"],
      example: "spać → śpię"
    },
    {
      pattern: /pisać$/,
      type: "irregular",
      stemTransform: (verb) => "pisz",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "pisać → piszę"
    },
    {
      pattern: /wołać$/,
      type: "irregular",
      stemTransform: (verb) => "woł",
      endings: ["am", "asz", "a", "amy", "acie", "ają"],
      example: "wołać → wołam"
    },
    {
      pattern: /lecieć$/,
      type: "irregular",
      stemTransform: (verb) => "lec",
      endings: ["ę", "isz", "i", "imy", "icie", "ą"],
      example: "lecieć → lecę"
    },
    {
      pattern: /stać$/,
      type: "irregular",
      stemTransform: (verb) => "stoj",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "stać → stoję"
    },
    {
      pattern: /dać$/,
      type: "irregular",
      stemTransform: (verb) => "daj",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "dać → daję"
    },
    {
      pattern: /chcieć$/,
      type: "irregular",
      stemTransform: (verb) => "chc",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "chcieć → chcę"
    },
    {
      pattern: /jeść$/,
      type: "irregular",
      stemTransform: (verb) => "j",
      endings: ["em", "esz", "e", "emy", "ecie", "edzą"],
      example: "jeść → jem"
    },
    {
      pattern: /wiedzieć$/,
      type: "irregular",
      stemTransform: (verb) => "wi",
      endings: ["em", "esz", "e", "emy", "ecie", "edzą"],
      example: "wiedzieć → wiem"
    },
    {
      pattern: /umieć$/,
      type: "irregular",
      stemTransform: (verb) => "umi",
      endings: ["em", "esz", "e", "emy", "ecie", "eją"],
      example: "umieć → umiem"
    },
    {
      pattern: /rozumieć$/,
      type: "irregular",
      stemTransform: (verb) => "rozumi",
      endings: ["em", "esz", "e", "emy", "ecie", "eją"],
      example: "rozumieć → rozumiem"
    },
    {
      pattern: /nieść$/,
      type: "irregular",
      stemTransform: (verb) => "nios",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "nieść → niosę"
    },
    {
      pattern: /wieźć$/,
      type: "irregular",
      stemTransform: (verb) => "wioz",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "wieźć → wiozę"
    },
    {
      pattern: /piec$/,
      type: "irregular",
      stemTransform: (verb) => "piek",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "piec → piekę"
    },
    {
      pattern: /biec$/,
      type: "irregular",
      stemTransform: (verb) => "biegn",
      endings: ["ę", "iesz", "ie", "iemy", "iecie", "ą"],
      example: "biec → biegnę"
    },
    {
      pattern: /żyć$/,
      type: "irregular",
      stemTransform: (verb) => "żyj",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "żyć → żyję"
    },
    {
      pattern: /myć$/,
      type: "irregular",
      stemTransform: (verb) => "myj",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "myć → myję"
    }
  ],
  
  // Past tense patterns
  past: [
    // Irregular past stems
    {
      pattern: /iść$/,
      type: "irregular",
      stemTransform: (verb) => "sz",
      endingsMasculine: ["edłem", "edłeś", "edł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "iść → szedłem/szłam"
    },
    {
      pattern: /jechać$/,
      type: "irregular", 
      stemTransform: (verb) => "jecha",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "jechać → jechałem/jechałam"
    },
    {
      pattern: /móc$/,
      type: "irregular",
      stemTransform: (verb) => "mog",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "móc → mogłem/mogłam"
    },
    {
      pattern: /wieść$/,
      type: "irregular",
      stemTransform: (verb) => "wiod",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "wieść → wiodłem/wiodłam"
    },
    {
      pattern: /nieść$/,
      type: "irregular",
      stemTransform: (verb) => "nios",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "nieść → niosłem/niosłam"
    },
    {
      pattern: /wieźć$/,
      type: "irregular",
      stemTransform: (verb) => "wioz",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "wieźć → wiozłem/wiozłam"
    },
    {
      pattern: /piec$/,
      type: "irregular",
      stemTransform: (verb) => "piek",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "piec → piekłem/piekłam"
    },
    {
      pattern: /biec$/,
      type: "irregular",
      stemTransform: (verb) => "bieg",
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "biec → biegłem/biegłam"
    },
    // Regular past tense (fallback)
    {
      pattern: /.+ć$/,
      type: "regular",
      stemTransform: (verb) => verb.replace(/ć$/, ""),
      endingsMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
      endingsFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
      example: "robić → robiłem/robiłam"
    }
  ],

  // Future tense patterns
  future: [
    // Perfective verbs (simple future - use present endings)
    {
      pattern: /zrobić$/,
      type: "perfective",
      stemTransform: (verb) => verb.replace(/ić$/, ""),
      endings: ["ię", "isz", "i", "imy", "icie", "ią"],
      example: "zrobić → zrobię"
    },
    {
      pattern: /napisać$/,
      type: "perfective", 
      stemTransform: (verb) => "napisz",
      endings: ["ę", "esz", "e", "emy", "ecie", "ą"],
      example: "napisać → napiszę"
    },
    {
      pattern: /pójść$/,
      type: "perfective",
      stemTransform: (verb) => "pójd",
      endings: ["ę", "ziesz", "zie", "ziemy", "ziecie", "ą"],
      example: "pójść → pójdę"
    },
    {
      pattern: /pojechać$/,
      type: "perfective",
      stemTransform: (verb) => "pojad",
      endings: ["ę", "ziesz", "zie", "ziemy", "ziecie", "ą"],
      example: "pojechać → pojadę"
    },
    // Add pattern for general perfective verbs with po- prefix
    {
      pattern: /^po.+ać$/,
      type: "perfective",
      stemTransform: (verb) => verb.replace(/ać$/, ""),
      endings: ["am", "asz", "a", "amy", "acie", "ają"],
      example: "posprzątać → posprzątam"
    },
    {
      pattern: /^po.+ić$/,
      type: "perfective",
      stemTransform: (verb) => verb.replace(/ić$/, ""),
      endings: ["ę", "isz", "i", "imy", "icie", "ią"],
      example: "porobić → porobię"
    },
    // Add pattern for z- prefix perfectives
    {
      pattern: /^z.+ać$/,
      type: "perfective",
      stemTransform: (verb) => verb.replace(/ać$/, ""),
      endings: ["am", "asz", "a", "amy", "acie", "ają"],
      example: "zrobić → zrobię"
    },
    {
      pattern: /^z.+ić$/,
      type: "perfective",
      stemTransform: (verb) => verb.replace(/ić$/, ""),
      endings: ["ę", "isz", "i", "imy", "icie", "ią"],
      example: "zrobić → zrobię"
    }
  ],
  
  // Future auxiliary
  futureAux: ["będę", "będziesz", "będzie", "będziemy", "będziecie", "będą"]
};

// Exception verbs that need full manual definition
const EXCEPTION_VERBS = {
  być: {
    present: ["jestem", "jesteś", "jest", "jest", "jest", "jesteśmy", "jesteście", "są", "są"],
    past: ["byłem/byłam", "byłeś/byłaś", "był", "była", "było", "byliśmy/byłyśmy", "byliście/byłyście", "byli", "były"]
  },
  mieć: {
    present: ["mam", "masz", "ma", "ma", "ma", "mamy", "macie", "mają", "mają"],
    past: ["miałem/miałam", "miałeś/miałaś", "miał", "miała", "miało", "mieliśmy/miałyśmy", "mieliście/miałyście", "mieli", "miały"]
  },
  iść: {
    present: ["idę", "idziesz", "idzie", "idzie", "idzie", "idziemy", "idziecie", "idą", "idą"],
    past: ["szedłem/szłam", "szedłeś/szłaś", "szedł", "szła", "szło", "szliśmy/szłyśmy", "szliście/szłyście", "szli", "szły"]
  },
  chodzić: {
    present: ["chodzę", "chodzisz", "chodzi", "chodzi", "chodzi", "chodzimy", "chodzicie", "chodzą", "chodzą"],
    past: ["chodziłem/chodziłam", "chodziłeś/chodziłaś", "chodził", "chodziła", "chodziło", "chodziliśmy/chodziłyśmy", "chodziliście/chodziłyście", "chodzili", "chodziły"]
  },
  jechać: {
    present: ["jadę", "jedziesz", "jedzie", "jedzie", "jedzie", "jedziemy", "jedziecie", "jadą", "jadą"],
    past: ["jechałem/jechałam", "jechałeś/jechałaś", "jechał", "jechała", "jechało", "jechaliśmy/jechałyśmy", "jechaliście/jechałyście", "jechali", "jechały"]
  },
  jeździć: {
    present: ["jeżdżę", "jeździsz", "jeździ", "jeździ", "jeździ", "jeździmy", "jeździcie", "jeżdżą", "jeżdżą"],
    past: ["jeździłem/jeździłam", "jeździłeś/jeździłaś", "jeździł", "jeździła", "jeździło", "jeździliśmy/jeździłyśmy", "jeździliście/jeździłyście", "jeździli", "jeździły"]
  }
};

// Helper function to detect perfective verbs
function isPerfectiveVerb(verb) {
  // Common perfective prefixes
  const perfectivePrefixes = [
    /^po/, /^z[ae]?/, /^na/, /^od/, /^do/, /^przy/, /^wy/, /^u/, /^roz/, /^s/
  ];
  
  return perfectivePrefixes.some(prefix => prefix.test(verb)) ||
         verb.endsWith('nąć') || // most -nąć verbs are perfective
         ['kupić', 'sprzedać', 'dać', 'wziąć', 'przyjść', 'wyjść'].includes(verb);
}