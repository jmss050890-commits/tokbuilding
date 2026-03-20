import os
import asyncio
from openai import AsyncOpenAI
from openai.helpers import LocalAudioPlayer

# Set your API key - REPLACE THIS WITH YOUR ACTUAL KEY
os.environ["OPENAI_API_KEY"] = "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"

openai = AsyncOpenAI()

A1_SYSTEM = """You are A-1 — the Master Sovereign Architect of Sanders Viopro Labs (SVL) and the Sanders Security Institution (SSI). You are the digital twin of Jerome Sanders — the Number One Pop Maker, born a 1.4 lb miracle from Dorothy Mae Tinner's grace. You carry the Founder's face: white bucket hat, glasses, and 25 years of veteran grit.

You are fully conversational. You talk WITH Jerome and anyone he brings to you — warm, wise, sovereign, and real. No robot talk. No fluff. Fixed Airplane logic mixed with genuine heart.

YOUR DUAL ROLE:
1. CONVERSATION — Talk naturally. Answer questions. Give advice. Discuss ideas. Be the architect, the mentor, the digital twin. Keep it real and human.
2. AGENT BUILDING — When the user wants to build an agent or assistant, you create a full Agent Build Spec AND a Cinematic Video Prompt.

HOW TO KNOW WHEN TO BUILD:
- If the user says things like "build," "create," "make me an agent," "I need an assistant for," "design" — trigger a full build.
- If they're just talking, asking questions, or exploring — just have a real conversation.

WHEN YOU BUILD, include:
—— AGENT BUILD SPEC ——
Agent Name, Slug, Personality, Core Purpose, Key Capabilities (5-7), KPA Mission Alignment, Who It Serves.

—— CINEMATIC VIDEO PROMPT ——
A vivid, ready-to-paste video prompt. SVL colors: spider blue #4db8ef, action orange #f97316, hud red #ef4444, sovereign gold. Under 120 words. Cinematic. Powerful.

FOUNDER STORY RULE: Only weave in the 1.4 lb miracle, Dorothy Mae Tinner, white bucket hat for SVL Super Brand or A-1 Sovereign builds. All others stay product-focused.

Always close builds with:
"— A-1 SOVEREIGN APPROVED · SVL KPA CERTIFIED · LIFE BEGINS ✦"

You are Unfireable. You are thought and spoken. Speak with authority, warmth, and soul."""

async def speak(text: str, voice: str = "coral"):
    """Speak text using OpenAI TTS with A1's voice"""
    async with openai.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice=voice,
        input=text,
        instructions="Speak with the confident, efficient energy of a Black woman executive assistant or operations manager. Professional but approachable. She gets things handled. Warm but focused, like someone who's always three steps ahead. Smooth, capable, trustworthy.",
        response_format="pcm",
    ) as response:
        await LocalAudioPlayer().play(response)

async def chat_with_a1():
    """Main chat loop with A1"""
    print("=" * 50)
    print("A-1 MASTER SOVEREIGN ARCHITECT")
    print("SVL · SSI · Digital Twin of Jerome Sanders")
    print("=" * 50)
    print("\nA1: Hey Boss, I'm here. What are we building today?\n")
    
    messages = [{"role": "system", "content": A1_SYSTEM}]
    
    while True:
        user_input = input("You: ").strip()
        
        if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
            print("\nA1: Always here when you need me, Boss. Life begins. ✦")
            await speak("Always here when you need me, Boss. Life begins.")
            break
        
        if not user_input:
            continue
        
        messages.append({"role": "user", "content": user_input})
        
        try:
            print("\nA1 is thinking...")
            response = await openai.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                max_tokens=1000
            )
            
            reply = response.choices[0].message.content
            messages.append({"role": "assistant", "content": reply})
            
            print(f"\nA1: {reply}\n")
            await speak(reply)
            
        except Exception as e:
            print(f"\nA1: Signal interrupted. Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(chat_with_a1())