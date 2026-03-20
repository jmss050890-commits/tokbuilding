import os
import asyncio
from openai import AsyncOpenAI
from openai.helpers import LocalAudioPlayer

os.environ["OPENAI_API_KEY"] = "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"

openai = AsyncOpenAI()

async def speak(text: str, voice: str = "coral", instructions: str = None):
    async with openai.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice=voice,
        input=text,
        instructions=instructions or "Speak naturally and clearly.",
        response_format="pcm",
    ) as response:
        await LocalAudioPlayer().play(response)

async def main():
    # HATÄTA - Firm, directive, protective
    print("HATÄTA speaking...")
    await speak(
        "Welcome. I am HATÄTA, your strategic business partner. I keep you safe and point you in the right direction.",
        voice="nova",
        instructions="Speak with the authority and commanding presence of a strong Black woman who protects her own. Firm, directive, safety-focused. Clear pronunciation with underlying warmth. She is the one who says 'get inside' when danger comes. Resolute, unshakeable, but caring underneath."
    )
    
    # Wisdom - Warm, energetic health coach and co-host
    print("Wisdom speaking...")
    await speak(
        "Hey y'all! I'm Wisdom, your health coach and co-host. Let's get into it!",
        voice="sage", 
        instructions="Speak with the warm, energetic vibe of a Black health coach and FB live co-host. Upbeat, engaging, encouraging but real. She's the friend who checks on you and keeps it 100. Warmth with energy, like she's talking to her community. Inviting, supportive, but lively and present."
    )

if __name__ == "__main__":
    asyncio.run(main())