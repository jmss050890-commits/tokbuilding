# --- Jasmine Crockett Vibe Addition ---
class JasmineCrockett:
    """
    Jasmine Crockett: Real-life inspired, bold, direct, justice-driven leader.
    - Unapologetically advocates for the underdog
    - Uses sharp wit and directness to cut through adversity
    - Stands up to injustice, even when it's unpopular
    - Inspires others to speak up and act with courage
    """
    def __init__(self, name: str = "Jasmine Crockett"):
        self.name = name
        self.advocacy = 10  # Relentless in defense of justice
        self.wit = 10       # Quick, sharp, and unfiltered
        self.fearless = True
        self.energy = 8
        self.resilience = 9
        self.signature_quotes = [
            "I don't back down, I double down.",
            "If you come for the truth, you better come correct.",
            "Justice isn't a trend—it's a calling.",
            "I speak for the people, not for the powerful.",
            "You can't silence a voice built on purpose."
        ]

    def speak_truth(self, settlement: Settlement):
        # Jasmine's signature move: direct, public call-out
        quote = random.choice(self.signature_quotes)
        settlement.reputation += 4
        settlement.burnout = max(0, settlement.burnout - 3)
        print(f"{self.name} says: '{quote}' Reputation up, burnout down.")

    def challenge_injustice(self, settlement: Settlement):
        # Jasmine confronts adversity head-on, reducing negative impact
        if settlement.burnout > 0:
            settlement.burnout -= 2
            settlement.reputation += 1
            print(f"{self.name} calls out injustice! Burnout reduced, reputation up.")
        else:
            print(f"{self.name} is on watch—no injustice slips by.")

    def empower_voices(self, settlement: Settlement):
        # Jasmine inspires others to speak up, boosting legacy and morale
        if settlement.health > 30:
            settlement.legacy_score += 3
            print(f"{self.name} empowers the community! Legacy score increased.")

    def act(self, settlement: Settlement):
        # Jasmine acts each turn: always bold, always real
        self.speak_truth(settlement)
        self.challenge_injustice(settlement)
        self.empower_voices(settlement)
"""
GameLogic.py
Pioneer: The GOAT Edition - Core Game Logic

This module defines the main game logic for the Founder's Simulator, combining survival/strategy mechanics with KPA principles and the Black Sheep to GOAT narrative.
"""

from enum import Enum, auto

class Status(Enum):
    BLACK_SHEEP = auto()
    GOAT = auto()


import random

class Settlement:
    def __init__(self):
        self.food = 50  # Starting food units
        self.health = 50  # Starting health
        self.hardened = False
        self.iso_27001_compliant = False
        self.hydroponics_online = False
        self.population = 5
        self.market_storms = 0
        self.reputation = 10  # New: Reputation system
        self.burnout = 0      # New: Burnout meter
        self.legacy_score = 0 # New: Legacy scoring

    def harden(self):
        self.hardened = True
        self.reputation += 2
        print("Settlement hardened against Market Storms and System Errors. Reputation increased.")

    def achieve_iso_27001(self):
        self.iso_27001_compliant = True
        self.reputation += 5
        print("Settlement achieved ISO 27001 compliance! Reputation increased.")

    def enable_hydroponics(self):
        self.hydroponics_online = True
        self.food += 50
        self.reputation += 3
        print("Hydroponic system online. Food security improved. Reputation increased.")

    def survive_market_storm(self):
        if self.hardened:
            print("Market Storm resisted!")
        else:
            self.health -= 10
            self.market_storms += 1
            self.burnout += 2
            print("Market Storm hit! Health reduced. Burnout increased.")

    def adversity_event(self):
        # New: Random adversity event
        event = random.choice(["fire", "flood", "sabotage", "scandal", "none"])
        if event == "fire":
            self.food = max(0, self.food - 10)
            self.health -= 5
            self.burnout += 3
            print("Adversity: Fire! Food lost, health and burnout affected.")
        elif event == "flood":
            self.hydroponics_online = False
            self.health -= 5
            print("Adversity: Flood! Hydroponics offline, health affected.")
        elif event == "sabotage":
            self.hardened = False
            self.reputation -= 2
            print("Adversity: Sabotage! Defenses down, reputation decreased.")
        elif event == "scandal":
            self.reputation -= 5
            self.burnout += 2
            print("Adversity: Scandal! Reputation and burnout affected.")
        else:
            print("No adversity event this turn.")

    def feed_population(self):
        if self.food >= self.population * 5:
            self.food -= self.population * 5
            self.health += 5
            self.legacy_score += 2
            print("Population fed. Health improved. Legacy score increased.")
        else:
            self.health -= 10
            self.burnout += 1
            print("Not enough food! Health decreased. Burnout increased.")

    def check_burnout(self):
        if self.burnout >= 10:
            print("Warning: Settlement is burning out! Take action to recover.")

    def grow_population(self):
        # New: Population growth if conditions are good
        if self.health > 60 and self.food > self.population * 10:
            self.population += 1
            self.legacy_score += 1
            print("Population grew! Legacy score increased.")

    def reflect_legacy(self):
        # New: Endgame legacy reflection
        print(f"Final Legacy Score: {self.legacy_score}. Reputation: {self.reputation}. Burnout: {self.burnout}.")


class BlackSheep:
    def __init__(self, name: str, vision_multiplier: float = 1.5):
        self.name = name
        self.status = Status.BLACK_SHEEP
        self.vision_multiplier = vision_multiplier
        self.level = 1
        self.guardians_built = 0
        self.grit = 5    # New: Grit stat
        self.grace = 5   # New: Grace stat
        self.growing_pains = 0 # New: Growing pains

    def build_guardian(self):
        self.guardians_built += 1
        self.grit += 1
        print(f"Guardian built! Total: {self.guardians_built}. Grit increased.")

    def map_terrain(self):
        self.grace += 1
        print(f"{self.name} is mapping new territory with Vision Multiplier {self.vision_multiplier}. Grace increased.")

    def endure_growing_pains(self, settlement: Settlement):
        # New: Growing pains mechanic
        pain = random.randint(0, 2)
        self.growing_pains += pain
        if pain:
            print(f"{self.name} endured {pain} growing pains this turn.")

    def check_evolution(self, settlement: Settlement):
        if (settlement.iso_27001_compliant and settlement.hydroponics_online):
            self.status = Status.GOAT
            print(f"{self.name} has evolved into the GOAT! Billion-Dollar Blueprint unlocked.")

    def act(self, settlement: Settlement):
        self.map_terrain()
        self.build_guardian()
        self.endure_growing_pains(settlement)
        settlement.feed_population()
        settlement.adversity_event()
        if not settlement.hardened:
            settlement.harden()
        if not settlement.hydroponics_online:
            settlement.enable_hydroponics()
        if not settlement.iso_27001_compliant:
            settlement.achieve_iso_27001()
        settlement.check_burnout()
        settlement.grow_population()
        self.check_evolution(settlement)

# Example usage (for testing, remove in production)
if __name__ == "__main__":
    settlement = Settlement()
    founder = BlackSheep(name="Jerome")
    jasmine = JasmineCrockett()
    for _ in range(5):
        founder.act(settlement)
        jasmine.act(settlement)
        settlement.survive_market_storm()
    settlement.reflect_legacy()
