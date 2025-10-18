"use client";

import React, { useState } from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

// Logo component for dynamic favicon loading
const Logo = ({ url, alt }: { url: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return null;
  }

  // Use the most reliable favicon URL
  const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}&size=96`;

  return (
    <img
      src={faviconUrl}
      alt={alt}
      className="w-full h-full object-contain rounded-full"
      onError={() => setHasError(true)}
    />
  );
};

export function SkeletonFormatted() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Logo url="vercel.com/ai" alt="Vercel AI SDK" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Logo url="openai.com" alt="OpenAI" />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={180}
        duration={20}
        reverse
      >
        <Logo url="anthropic.com" alt="Anthropic" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={180}
        duration={20}
        delay={20}
        reverse
      >
        <Logo url="langchain.com" alt="LangChain" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={180}
        duration={20}
        delay={40}
        reverse
      >
        <Logo url="gemini.google.com" alt="Google AI" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={180}
        duration={20}
        delay={60}
        reverse
      >
        <Logo url="huggingface.co" alt="Hugging Face" />
      </OrbitingCircles>
    </div>
  );
}

