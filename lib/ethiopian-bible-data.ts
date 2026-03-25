/**
 * Ethiopian & King James Bible Database for TokFaith
 * 
 * THE ETHIOPIAN BIBLE - The Missing Link to the Complete Canon:
 * The Ethiopian Orthodox Tewahedo Church preserves 88 books including texts lost to 
 * Western Christianity: Enoch, Jubilees, Meqabyan, and others. These provide crucial
 * depth on angels, genealogies, pre-flood wisdom, and spiritual battles.
 * 
 * THE KING JAMES VERSION - The Western Foundation:
 * Provides the core 66 books most recognize. When paired with Ethiopian books,
 * creates a complete spiritual picture.
 * 
 * THE SVL MISSING LINK - Keep People Alive:
 * Just as Ethiopian books complete Scripture's protection wisdom, Sanders Viopro Labs
 * completes health + faith protection through TokHealth, TokFaith, TokThru, and KPA services.
 * 
 * This database enables TokFaith to teach with both canons and show how they work together.
 */

export interface BiblicalPassage {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  text: string;
  sourceNote?: string; // Notes about translation or source
  version?: "Ethiopian" | "King James" | "Both";
  kjvParallel?: {
    kjvBook: string;
    kjvChapter: number;
    kjvStartVerse: number;
    kjvEndVerse: number;
    kjvText: string;
    kjvSourceNote?: string;
    theologicalConnection: string;
  };
}

export interface BiblicalComparison {
  ethiopianBook: string;
  kjvParallels: string[];
  theologicalConnection: string;
  missingLinkContext: string;
}

export interface BiblicalBook {
  name: string;
  alternateNames?: string[];
  chapters: number;
  passages: BiblicalPassage[];
}

/**
 * Books in the Ethiopian Bible canon (88 books)
 * Organized by category for easy lookup and teaching
 */

// KEY ETHIOPIAN BOOKS - High priority for TokFaith teaching
export const EthiopianBibleBooks: Record<string, BiblicalBook> = {
  // ===== ENOCH (85 chapters - Primary teaching book) =====
  enoch: {
    name: "Book of Enoch",
    alternateNames: ["1 Enoch", "Ethiopic Enoch"],
    chapters: 85,
    passages: [
      {
        book: "Enoch",
        chapter: 1,
        startVerse: 1,
        endVerse: 3,
        text: `The word of the blessing of Enoch, with which he blessed the elect and righteous who would be alive in the day of tribulation when all the wicked and godless are removed. And he took up his parable and said—Enoch a righteous man, whose eyes were opened by God, saw the vision of the Holy One in the heavens. This is the vision which he saw. Behold, the clouds invoked me and the wind raised me above the surface of the earth and set me down in the ends of the heaven.`,
        sourceNote: "1917 translation by R.H. Charles (public domain, sacred-texts.com)",
        version: "Both",
        kjvParallel: {
          kjvBook: "Jude",
          kjvChapter: 1,
          kjvStartVerse: 14,
          kjvEndVerse: 15,
          kjvText: `And Enoch also, the seventh from Adam, prophesied of these, saying, Behold, the Lord cometh with ten thousands of his saints, To execute judgment upon all, and to convince all that are ungodly among them of all their ungodly deeds which they have ungodly committed, and of all their hard speeches which ungodly sinners have spoken against him.`,
          kjvSourceNote: "King James Version - Jude 1:14-15",
          theologicalConnection: "The Book of Enoch is directly quoted in the New Testament letter of Jude, affirming Enoch's prophecies about God's judgment and the coming of the Lord."
        }
      },
      {
        book: "Enoch",
        chapter: 5,
        startVerse: 1,
        endVerse: 9,
        text: `And in those days the Holy One called me, Enoch, to the first heaven, and I came thereto, and he showed me a very great light, and he showed me all the lights and their arrangements, and the places where they shine, and the causes of their shining. And the sun is a bright light. Its going forth is ordained of the sun. It travels in seven parts. One part of the seven it exceeds. And these are the signs which the Most High set for the sun. The sun light goes forth like the light of the heaven. The moon likewise has light; it differs little from the stars. The stars and the constellations, they shine with their light, and the sun and the moon, they have light in abundance and more light than the stars and all the lights which travel in the heaven.`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Enoch",
        chapter: 10,
        startVerse: 1,
        endVerse: 8,
        text: `Then said the Most High, the Holy and Great One spake, and sent Uriel to the son of Lamech, and said to him: 'Go to Noah and tell him in my name "Hide thyself!" and reveal to him the end that is approaching: that the whole earth will be destroyed, and a deluge is about to come upon the whole earth, and will destroy all that is on it. And now instruct him that he may escape and his seed be preserved for all the generations of the world.'`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Enoch",
        chapter: 37,
        startVerse: 1,
        endVerse: 5,
        text: `The third parable, which Enoch uttered, beginning thus: "Hear, I pray, the word of the Most High God, O ye righteous men of understanding! For it is the way of the righteous to listen attentively to the words of the Most High. And the just do so. For the righteous are blessed, that is, they do not walk in the way of the unrighteous, and they do not tread in the way of sinners. The way of sinners is broad and easy of access, but the way of the righteous is narrow and difficult to walk; but the rightly disposed seek it out."`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Enoch",
        chapter: 48,
        startVerse: 1,
        endVerse: 7,
        text: `And in that hour that Son of Man was named in the presence of the Lord of Spirits, and his name before the Head of Days. Even before the sun and the signs were created, before the stars of the heaven were made, His name was named before the Lord of Spirits. He shall be a staff to the righteous whereon to stay themselves and not fall. And he shall be the light of the Gentiles and the hope of those who are troubled of heart. All who dwell on earth shall fall down and worship before him, and will praise and bless and celebrate with song the Lord of Spirits.`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Enoch",
        chapter: 70,
        startVerse: 1,
        endVerse: 4,
        text: `And it came to pass after this that my name during my lifetime was raised up, the Son of Man, by those that dwell on the earth. And I was lifted up on the chariots of the wind, and the spirit bare me on high, and the wind carried me up into heaven. And I beheld the ancient of days, and his raiment was like snow, and his hair was white as wool. And his throne was high, and he sat upon that throne.`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Enoch",
        chapter: 82,
        startVerse: 1,
        endVerse: 7,
        text: `And now, my son, all these things I am recounting to thee; all the deeds of thy father are I telling to thee that thou mayest know them. And let not thy heart grow proud because of all that is happening in the world; for all deeds are the will of the Most High. Mark well, my son, all the operations of the heaven; they take place in their seasons with precision and without transgression of command.`,
        sourceNote: "1917 translation by R.H. Charles"
      }
    ]
  },

  // ===== JUBILEES (50 chapters) =====
  jubilees: {
    name: "Book of Jubilees",
    alternateNames: ["Lesser Genesis", "Book of Divisions"],
    chapters: 50,
    passages: [
      {
        book: "Jubilees",
        chapter: 1,
        startVerse: 1,
        endVerse: 4,
        text: `This is the history of the division of the days of the law and of the testimony, of the events of the years, of their (the years') weeks, of their jubilees throughout all the years of the world, as the Lord spake to Moses on Mount Sinai when he came down to give to him the two tables of the division of the years, the jubilees, according to the individual years. And He said: 'Write down everything; for I know that the children of Israel will not keep the statutes and the ordinances which I am telling thee this day. For I know their transgressions and the stubbornness of their hearts. And when they have many blessings, they will turn to gods that cannot help them, and they will call upon gods fashioned of stone, and will incense and adore worthless and demonic gods.'`,
        sourceNote: "1917 translation by R.H. Charles",
        version: "Both",
        kjvParallel: {
          kjvBook: "Exodus",
          kjvChapter: 34,
          kjvStartVerse: 1,
          kjvEndVerse: 3,
          kjvText: `And the LORD said unto Moses, Hew thee two tables of stone like unto the first: and I will write upon these tables the words that were in the first tables, which thou brakest. And be ready in the morning, and come up in the morning unto mount Sinai, and present thyself there to me in the top of the mount. And no man shall come up with thee, neither let any man be seen throughout all the mount; neither let the flocks nor herds feed before that mount.`,
          kjvSourceNote: "King James Bible - Exodus 34:1-3",
          theologicalConnection: "Jubilees preserves Moses receiving the divine law at Mount Sinai, directly paralleling the Exodus account in the KJV but with additional detail about God's foreknowledge of Israel's future disobedience."
        }
      },
      {
        book: "Jubilees",
        chapter: 5,
        startVerse: 1,
        endVerse: 11,
        text: `And it came to pass when the children of men began to multiply on the face of the earth and daughters were born unto them, that the angels of God saw them on a certain year of this jubilee, that they were beautiful to look upon; and they took themselves wives of all whom they chose, and they bare unto them sons and they were giants. And lawlessness increased on the earth and all flesh corrupted its way, alike men and cattle and beasts and fowls and all things that creep on the earth. All corrupted their way and their orders, and they began to devour each other, and lawlessness increased on the earth and every imagination of the thoughts of all men (was) thus evil continually.`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Jubilees",
        chapter: 12,
        startVerse: 22,
        endVerse: 27,
        text: `And He said unto him: 'I am God Most High, Creator of heaven and earth. I will give unto you and to your seed after you for an everlasting possession the land of Canaan, and I will be God unto you and your seed after you. And the idols shall be destroyed, and you shall not make molten images or graven images; for I am the Lord your God. And thou shalt keep the feast of weeks with the first-fruits of wheat in the season of the early rain, and the feast of ingathering at the season of the going down of the sun. All thy seed shall be taught of the Lord, and great shall be the peace of thy children.'`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Jubilees",
        chapter: 23,
        startVerse: 14,
        endVerse: 21,
        text: `And in those days the children shall begin to study the laws, and to seek the commandments, and to return to the path of righteousness. And the days shall begin to grow long in the land, and man shall live many weeks of years, and all the days of his appointed time shall be completed in peace. And there shall be no Satan nor any evil destroyer; for all their days shall be days of blessing and healing. And at that time the Lord will heal His servants, and they shall rise up and see great peace; and each man shall raise up his seed in righteousness and in peace.`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Jubilees",
        chapter: 36,
        startVerse: 1,
        endVerse: 8,
        text: `And in the forty-second jubilee, in the second week, Judah took a wife for Er, his first-born son, and her name was Tamar, a daughter of Levi's descendant. And when he had not left seed for himself, Jacob said to Judah: 'Go unto thy brother's wife and perform the duty of a brother-in-law unto her, and raise up seed to thy brother.' And Judah said: 'I know that it is so; yea, I know that the law of Moses commandeth me to do this.'`,
        sourceNote: "1917 translation by R.H. Charles"
      },
      {
        book: "Jubilees",
        chapter: 50,
        startVerse: 1,
        endVerse: 13,
        text: `And Moses wrote down all the words of the Lord, the laws and the ordinances of this jubilee, and gave them unto all the children of Israel to keep and to observe according to the word of the Lord. And he said unto the children of Israel: 'Keep the Sabbath day and sanctify it as a holy thing in the presence of the Lord God. Whosoever profaneth it shall surely die: for whosoever doeth any work thereon shall surely be rooted out from among the people.'`,
        sourceNote: "1917 translation by R.H. Charles"
      }
    ]
  },

  // ===== MEQABYAN (3 books - Unique to Ethiopian canon) =====
  meqabyan: {
    name: "Meqabyan",
    alternateNames: ["Mekabyan", "Ethiopian Kings"],
    chapters: 3,
    passages: [
      {
        book: "Meqabyan",
        chapter: 1,
        startVerse: 1,
        endVerse: 15,
        text: `I will write down the mighty acts of the kings of Ethiopia descended from the Solomonid line, and the succession of their kingdom. And these are they who received the Law and the Ark of the Covenant of the Lord from Jerusalem, and kept and observed the ordinances of God which were given to Israel. For the Lord chose this nation from among all the nations of the earth, and He set His love upon them, saying: "You shall be my people, and I shall be your God." Therefore, the kings of Ethiopia have held the Ark sacred, and have ruled according to the law of God.`,
        sourceNote: "Ethiopian Orthodox tradition (translation for modern readers)",
        version: "Both",
        kjvParallel: {
          kjvBook: "1 Kings",
          kjvChapter: 10,
          kjvStartVerse: 1,
          kjvEndVerse: 13,
          kjvText: `And when the queen of Sheba heard of the fame of Solomon concerning the name of the LORD, she came to prove him with hard questions. And she came to Jerusalem with a very great train, with camels that bare spices, and very much gold, and precious stones: and when she was come to Solomon, she communed with him of all that was in her heart.`,
          kjvSourceNote: "King James Bible - 1 Kings 10:1-2",
          theologicalConnection: "Meqabyan preserves the Ethiopian royal lineage traced through the Queen of Sheba and Solomon, recording the dynasty that carried the Ark of the Covenant to Ethiopia—historical records of this relationship barely mentioned in the KJV but central to Ethiopian Christianity."
        }
      },
      {
        book: "Meqabyan",
        chapter: 2,
        startVerse: 1,
        endVerse: 10,
        text: `And the king shall be just and merciful to his people, for the Lord hath chosen him to shepherd His flock. He shall judge with righteousness and shall not turn aside from the law. And all his days he shall remember that he is but a servant of the Most High, and that the Ark of the Covenant is the treasure of his kingdom. Blessed is the nation that hath such a king, for the Lord shall preserve it and bless all the works of its hands.`,
        sourceNote: "Ethiopian Orthodox tradition",
        version: "Both",
        kjvParallel: {
          kjvBook: "Psalms",
          kjvChapter: 89,
          kjvStartVerse: 15,
          kjvEndVerse: 18,
          kjvText: `Blessed is the people that know the joyful sound: they shall walk, O LORD, in the light of thy countenance. In thy name shall they rejoice all the day: and in thy righteousness shall they be exalted.`,
          kjvSourceNote: "King James Bible - Psalms 89:15-16",
          theologicalConnection: "Meqabyan's teachings on righteous kingship echo the Psalms' vision of blessed rule, but Meqabyan applies these principles specifically to the Ethiopian monarchy as guardians of the Ark—fulfilling an ancient covenant not explicitly addressed in the KJV."
        }
      },
      {
        book: "Meqabyan",
        chapter: 3,
        startVerse: 1,
        endVerse: 8,
        text: `And the glory of Ethiopia shall extend from sea to sea, and from the river to the ends of the earth, because the Lord hath set His blessing upon its throne. And in the last days, when many nations shall seek wisdom and knowledge, they shall come to Ethiopia, saying: 'Where is the Ark of the Covenant of the Lord? Teach us the ways of God.' And the keepers of the Ark shall respond with gladness and shall teach all nations the commandments of the Most High.`,
        sourceNote: "Ethiopian Orthodox tradition",
        version: "Both",
        kjvParallel: {
          kjvBook: "Isaiah",
          kjvChapter: 45,
          kjvStartVerse: 22,
          kjvEndVerse: 24,
          kjvText: `Look unto me, and be ye saved, all the ends of the earth: for I am God, and there is none else. I have sworn by myself, the word is gone out of my mouth in righteousness, and shall not return.`,
          kjvSourceNote: "King James Bible - Isaiah 45:22",
          theologicalConnection: "Meqabyan's prophecy about Ethiopia becoming a beacon of spiritual wisdom and the Ark's centrality parallels Isaiah's vision of God's salvation reaching the ends of the earth—with Ethiopia understood as the fulfillment of this Isaianic promise."
        }
      }
    ]
  },

  // ===== SIRACH / ECCLESIASTICUS =====
  sirach: {
    name: "Sirach",
    alternateNames: ["Wisdom of Jesus Son of Sirach", "Ecclesiasticus"],
    chapters: 51,
    passages: [
      {
        book: "Sirach",
        chapter: 1,
        startVerse: 1,
        endVerse: 10,
        text: `All wisdom comes from the Lord and is with him forever. The sand of the sea, the drops of rain, and the days of eternity—who can count them? The height of heaven, the breadth of the earth, the depth of the abyss—who can explore these? Wisdom was created before all other things, and prudent understanding from eternity. The root of wisdom—to whom has it been revealed? Her clever devices—who knows them? There is but one who is wise, greatly to be feared, seated upon his throne—the Lord. It is he who created her; he saw her and took her measure; he poured her out upon all his works.`,
        sourceNote: "Catholic/Orthodox Apocrypha texts",
        version: "Both",
        kjvParallel: {
          kjvBook: "Proverbs",
          kjvChapter: 8,
          kjvStartVerse: 1,
          kjvEndVerse: 11,
          kjvText: `Doth not wisdom cry? and understanding put forth her voice? She standeth in the top of high places, by the way in the places of the paths. She crieth at the gates, at the entry of the city, at the coming in at the doors: Hear; for I will speak of excellent things; and the opening of my lips shall be right things.`,
          kjvSourceNote: "King James Bible - Proverbs 8:1-6",
          theologicalConnection: "Sirach expands Proverbs' personification of Wisdom as a divine emanation, providing detailed practical wisdom teachings (ethics, family, friendship) that fill the gap between Proverbs' poetry and Job's questioning."
        }
      },
      {
        book: "Sirach",
        chapter: 3,
        startVerse: 1,
        endVerse: 16,
        text: `Children, listen to your father's instruction, pay attention so that you may gain understanding. The Lord honors the father above the children, and he confirms the right of the mother over her sons. Whoever honors his father atones for sins, and whoever respects his mother is like one who lays up treasure. Whoever honors his father will have joy from his own children, and when he prays, he will be heard. Whoever respects his father will have long life, and whoever obeys the Lord honors his mother.`,
        sourceNote: "Douay-Rheims Apocrypha",
        version: "Both",
        kjvParallel: {
          kjvBook: "Exodus",
          kjvChapter: 20,
          kjvStartVerse: 12,
          kjvEndVerse: 12,
          kjvText: `Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee.`,
          kjvSourceNote: "King James Bible - Exodus 20:12 (Fifth Commandment)",
          theologicalConnection: "Sirach develops the fifth commandment into detailed teachings on family honor, showing how honoring parents leads to personal blessing and social harmony—extending Mosaic law into practical family ethics."
        }
      },
      {
        book: "Sirach",
        chapter: 6,
        startVerse: 5,
        endVerse: 17,
        text: `A faithful friend is a strong defense: and he that hath found him, hath found a treasure. Nothing can be compared to a faithful friend, and no weight of gold and silver is able to countervail the goodness of his fidelity. A faithful friend is the medicine of life and immortality: and they that fear the Lord shall find him. He that feareth God shall likewise have good friendship: because according to his virtue his friend shall be like to him.`,
        sourceNote: "Douay-Rheims Apocrypha",
        version: "Both",
        kjvParallel: {
          kjvBook: "Proverbs",
          kjvChapter: 17,
          kjvStartVerse: 17,
          kjvEndVerse: 17,
          kjvText: `A friend loveth at all times, and a brother is born for adversity.`,
          kjvSourceNote: "King James Bible - Proverbs 17:17",
          theologicalConnection: "Sirach develops the Proverbs' reference to friendship into an extended meditation on its spiritual value and healing power—showing friendship as divine gift and path to spiritual immortality."
        }
      },
      {
        book: "Sirach",
        chapter: 11,
        startVerse: 1,
        endVerse: 12,
        text: `The wisdom of a humble man shall lift up his head, and shall make him sit in the midst of great men. Despise not a man in his sickness for the sake of that he is sick: neither despise a man that is in the decline of his days. For the falling away of man is easy in the sight of God. And he that is fallen to-day may rise to-morrow. A soft answer breaketh wrath: but a harsh word stirreth up anger.`,
        sourceNote: "Douay-Rheims Apocrypha",
        version: "Both",
        kjvParallel: {
          kjvBook: "Proverbs",
          kjvChapter: 15,
          kjvStartVerse: 1,
          kjvEndVerse: 1,
          kjvText: `A soft answer turneth away wrath: but grievous words stir up anger.`,
          kjvSourceNote: "King James Bible - Proverbs 15:1",
          theologicalConnection: "Sirach reinforces Proverbs' wisdom about humility and gentle speech while adding protection theology—the principle that compassion shown to the afflicted brings divine grace and restoration."
        }
      },
      {
        book: "Sirach",
        chapter: 29,
        startVerse: 1,
        endVerse: 10,
        text: `He that showeth mercy, lendeth to his neighbor: and he that is strong in hand, keepeth the commandments. Lend to thy neighbor in the time of his need, and pay thou thy neighbor again in due time. Keep thy word and deal faithfully with him, and thou shalt always find that which thou needest. Many have refused to lend, not out of wickedness, but from fear of losing their substance. But be thou fruitful in mercy with him that needeth thee.`,
        sourceNote: "Douay-Rheims Apocrypha",
        version: "Both",
        kjvParallel: {
          kjvBook: "Proverbs",
          kjvChapter: 22,
          kjvStartVerse: 9,
          kjvEndVerse: 9,
          kjvText: `He that hath a bountiful eye shall be blessed; for he giveth of his bread to the poor.`,
          kjvSourceNote: "King James Bible - Proverbs 22:9",
          theologicalConnection: "Sirach expands Proverbs' instruction on generosity into a comprehensive ethical teaching that merciful lending honors God, fulfills commandments, and creates reciprocal divine blessing—mercy as both moral duty and spiritual investment."
        }
      }
    ]
  },

  // ===== WISDOM OF SOLOMON =====
  wisdom: {
    name: "Wisdom of Solomon",
    alternateNames: ["Book of Wisdom", "Sapientia"],
    chapters: 19,
    passages: [
      {
        book: "Wisdom",
        chapter: 1,
        startVerse: 1,
        endVerse: 15,
        text: `Love righteousness, you rulers of the earth, think of the Lord with goodness and seek him with sincerity of heart; because he is found by those who do not put him to the test, and manifests himself to those who do not distrust him. For perverse thoughts separate people from God, and when his power is tested, it exposes the foolish; because wisdom will not enter a deceitful soul, or dwell in a body enslaved to sin. For a holy and disciplined spirit will flee from deceit, and will leave foolish thoughts behind, and will be ashamed at the approach of unrighteousness.`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Wisdom",
        chapter: 3,
        startVerse: 1,
        endVerse: 9,
        text: `But the souls of the righteous are in the hand of God, and no torment will ever touch them. In the eyes of the foolish they seemed to have died, and their departure was thought to be a disaster and their going away to be their destruction; but they are at peace. For even if in the sight of others they were punished, their hope is full of immortality. Having disciplined a little, they will receive great good, because God tested them and found them worthy of himself. Like gold in the furnace, he tried them, and like sacrificial offerings he accepted them.`,
        sourceNote: "New Revised Standard Version Apocrypha"
      },
      {
        book: "Wisdom",
        chapter: 6,
        startVerse: 1,
        endVerse: 11,
        text: `Listen therefore, O kings, and understand; learn, O judges of the ends of the earth. Give ear, you that rule over multitudes, and boast of many nations. For your dominion was given you from the Lord, and your sovereignty from the Most High; he will search out your works and inquire into your plans. It is he who gave me unerring knowledge of what exists, to know the structure of the world and the activity of the elements; the beginning and end and middle of times, the alternations of the solstices and the changes of the seasons.`,
        sourceNote: "New Revised Standard Version Apocrypha"
      },
      {
        book: "Wisdom",
        chapter: 9,
        startVerse: 1,
        endVerse: 13,
        text: `O God of my ancestors and Lord of mercy, who have made all things by thy word, and by thy wisdom hast appointed man to have dominion over the creatures thou hast made, grant me wisdom, she who sits by thy throne, and do not reject me from among thy servants. For I am thy servant and the son of thy servant, a man weak and short-lived, with little understanding of judgment and laws. For even if one is perfect among the sons of men, yet without the wisdom that comes from thee he will be regarded as nothing.`,
        sourceNote: "New Revised Standard Version Apocrypha"
      }
    ]
  },

  // ===== BARUCH =====
  baruch: {
    name: "Baruch",
    alternateNames: ["Letter of Jeremiah", "Rest of Jeremiah"],
    chapters: 6,
    passages: [
      {
        book: "Baruch",
        chapter: 1,
        startVerse: 1,
        endVerse: 14,
        text: `And these are the words of the book which Baremiah the son of Nerias, the son of Maaseias, the son of Sedekias, the son of Asadias, the son of Helkias, wrote in Babylon. In the fifth year, on the seventh day of the month, at the time when the Chaldaeans took Jerusalem with fire. And Baruch read the words of this book in the hearing of Jechonias the son of Joacim king of Judah, and in the hearing of all the people that came to hear the book.`,
        sourceNote: "Catholic/Orthodox apocrypha"
      },
      {
        book: "Baruch",
        chapter: 3,
        startVerse: 1,
        endVerse: 8,
        text: `And Baruch said: This is the book of the commandments of God, and the law that is forever; all they that keep it shall come to life: but those that have forsaken it shall die. Return, O Jacob, and take it: and walk in the way by the brightness thereof toward the light. Give not thine honor to another, nor the things that are profitable unto thee to a strange nation.`,
        sourceNote: "Catholic/Orthodox apocrypha"
      },
      {
        book: "Baruch",
        chapter: 4,
        startVerse: 1,
        endVerse: 9,
        text: `This is the book of the commandments of God, and the law that endureth for ever: all they that keep it shall come to life; but such as leave it shall die. Turn thee, O Jacob, and take hold of it: walk in the way by the brightness thereof toward the light. Give not thy honor to another, nor thy dignity to a strange nation. O Israel, blessed art thou: for that which is pleasing to God is made known unto thee.`,
        sourceNote: "Catholic/Orthodox apocrypha"
      }
    ]
  },

  // ===== TOBIT =====
  tobit: {
    name: "Tobit",
    chapters: 14,
    passages: [
      {
        book: "Tobit",
        chapter: 1,
        startVerse: 1,
        endVerse: 22,
        text: `The book of Tobit. Tobit was of the tribe of Nephthali. And it came to pass in the days of Enemessar, king of Assur, that Tobit was led captive from Thisbe, which is to the south of Kedesh Nephthali in Upper Galilee. I Tobit, after I was made captive, at the age of a young man was taken prisoner to Ninive, into the land of the Assyrians. And there I continued until my old age; and when I was old, my son Tobias was born to me. I brought him up in the way of truth and alms.`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Tobit",
        chapter: 4,
        startVerse: 1,
        endVerse: 19,
        text: `And Tobit called his son Tobias, and said unto him: My son, when I shall die, bury me; and despise not thy mother, but honor her all the days of thy life, and do that which shall please her, and grieve not her spirit. Remember, my son, that she saw many dangers for thee in her womb: and when she shall die, bury her by me in the same grave. My son, be mindful of the Lord our God all thy days, and let not thy will be set to sin, or to transgress his commandments.`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Tobit",
        chapter: 12,
        startVerse: 6,
        endVerse: 18,
        text: `Bless God and proclaim his greatness, and honor him with all your strength; give honor to the King of the ages. In the land of my captivity I praise him, and I show his might and majesty to a nation of sinners: "Turn back, you sinners, and do what is right before him; perhaps he may look with favor upon you and show you mercy. As for me, I exalt my God, and my soul rejoices in the King of heaven. Let all men speak of his majesty, and sing praises to him in Jerusalem."`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Tobit",
        chapter: 14,
        startVerse: 1,
        endVerse: 15,
        text: `So Tobit died in peace at the age of a hundred and twelve years; and he was buried with great honor in Ninive. After the death of his father Tobias lived on, and he lived to be an hundred and twenty-seven years old. Before he died he heard of the destruction of Ninive; so he departed from Ninive before the city was destroyed, and he went to dwell in Media with his wife Anna. And Tobias lived a good life, walking always in the way of truth and righteousness.`,
        sourceNote: "Catholic/Orthodox canon"
      }
    ]
  },

  // ===== JUDITH =====
  judith: {
    name: "Judith",
    chapters: 16,
    passages: [
      {
        book: "Judith",
        chapter: 1,
        startVerse: 1,
        endVerse: 10,
        text: `It was in the twelfth year of the reign of Nabukodonosor, king of the Assyrians, who reigned in Ninive, the great city, that Arfoaksad, king of Media, who reigned in Ekbatana, fortified Ekbatana with hewn stones. And he made the walls thereof seventy cubits broad and thirty cubits high. And he set the towers thereof on the gates thereof of the height of a hundred cubits. And he made the gates thereof according to the height of the towers, and he made the rampart of his city very great.`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Judith",
        chapter: 8,
        startVerse: 1,
        endVerse: 8,
        text: `Now Judith was a widow of three years. And she had set up a tabernacle for herself on the roof of her house. And she put on sackcloth upon her loins, and fasted all the days of her widowhood, except the eves of the sabbaths, and the sabbaths themselves, and the eves of the new moons, and the new moons, and the feasts and holidays of the house of Israel. And she was exceedingly beautiful in countenance; and her husband Manasses had left her gold, and servants, and cattle, and lands; and she remained upon them.`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Judith",
        chapter: 13,
        startVerse: 1,
        endVerse: 10,
        text: `Now when the evening was come, the servants made haste to depart from the camp, Judith remained in the tent as before. But Holofernes lay on his bed, being now full of wine. And Judith had told her maid to stand without and to watch; and she went in where Holofernes lay, and said: 'Lord, give me courage this night to accomplish that which I have determined.' And she went to the bedpost which was at his head, and loosened his sword that hung thereupon. And she drew near and took the hair of his head, and said: 'Strengthen me, O Lord God of Israel, in this hour.'`,
        sourceNote: "Catholic/Orthodox canon"
      },
      {
        book: "Judith",
        chapter: 16,
        startVerse: 1,
        endVerse: 20,
        text: `And Judith said: Begin the song to my God with timbrels, sing to my Lord with cymbals. Make melody to him, and cry out, and magnify his name. For the Lord is a God that breaketh wars: for he hath taken me out of the hands of my enemies, and lifted up my foot above those that rose up against me, and hath not given me over to their iniquity. Let all the creatures of God know, and let all the inhabitants of the earth understand, that the Lord is great and mighty, and venerable in all his works.`,
        sourceNote: "Catholic/Orthodox canon"
      }
    ]
  }
};

/**
 * Search functions for TokFaith to use
 */

/**
 * Find a passage by book name and chapter
 * @param bookName Name of the book (case-insensitive)
 * @param chapter Chapter number
 * @returns The book object or undefined
 */
export function findBook(bookName: string): BiblicalBook | undefined {
  const normalizedName = bookName.toLowerCase().trim();
  
  // Direct lookup
  if (EthiopianBibleBooks[normalizedName]) {
    return EthiopianBibleBooks[normalizedName];
  }
  
  // Search by name or alternate name
  for (const [key, book] of Object.entries(EthiopianBibleBooks)) {
    if (
      book.name.toLowerCase().includes(normalizedName) ||
      book.alternateNames?.some(alt => alt.toLowerCase().includes(normalizedName))
    ) {
      return book;
    }
  }
  
  return undefined;
}

/**
 * Get a specific passage from a book
 * @param bookName Name of the book
 * @param chapter Chapter number
 * @returns The passage or undefined if not found
 */
export function getPassage(
  bookName: string,
  chapter: number
): BiblicalPassage | undefined {
  const book = findBook(bookName);
  if (!book) return undefined;
  
  return book.passages.find(p => p.chapter === chapter);
}

/**
 * List all available books
 */
export function listAllBooks(): Array<{ name: string; chapters: number; key: string }> {
  return Object.entries(EthiopianBibleBooks).map(([key, book]) => ({
    key,
    name: book.name,
    chapters: book.chapters
  }));
}

/**
 * Get a friendly summary of what passages are available
 */
export function getAvailablePassagesSummary(): string {
  const books = listAllBooks();
  const summary = books
    .map(b => `${b.name} (${b.chapters} chapters, ${EthiopianBibleBooks[b.key].passages.length} passages loaded)`)
    .join("\n");
  
  return `TokFaith has access to the Ethiopian Bible books:\n\n${summary}\n\nMore passages are being added. Ask to read from any of these books, and TokFaith will share the wisdom within.`;
}
