import { cn } from "@/lib/utils";
import { SkeletonEvalsCli } from "./skeletons/skeleton-evals-cli";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function FeaturesSectionDemo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const features = [
    {
      title: "Define prompts as typed TypeScript code",
      description:
        "Build AI agents with full type safety. Define system prompts, tools, and outputs in clean, maintainable code.",
      skeleton: (
        <button 
          className="w-full h-full cursor-pointer border-0 bg-transparent p-0" 
          onClick={() => setSelectedImage("/sdk.png")}
          type="button"
        >
          <Image
            src="/sdk.png"
            alt="SDK Code Editor showing TypeScript prompt definition with tools and evals"
            width={1600}
            height={1200}
            quality={95}
            priority
            className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
          />
        </button>
      ),
      className: "border-b dark:border-neutral-800",
    },
    {
      title: "Test your prompts with evals",
      description:
        "Run evaluations directly from your CLI. Validate agent behavior with executable test cases before deployment.",
      skeleton: <SkeletonEvalsCli />,
      className: "border-b dark:border-neutral-800",
    },
    {
      title: "Track and analyze every execution",
      description:
        "Real-time analytics dashboard for your AI prompts. Monitor performance metrics, system health, and cost analysis.",
      skeleton: (
        <button 
          className="w-full h-full cursor-pointer border-0 bg-transparent p-0" 
          onClick={() => setSelectedImage("/analytics.png")}
          type="button"
        >
          <Image
            src="/analytics.png"
            alt="Analytics Dashboard showing execution metrics, charts, and cost analysis"
            width={1600}
            height={1200}
            quality={95}
            className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
          />
        </button>
      ),
      className: "",
    },
  ];
  return (
    <div className="relative z-20 pb-10 lg:pb-40 max-w-7xl mx-auto">
      {/* <div className="px-4">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Everything you need to build better AI
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From clean code to deep insights - understand your AI like never before
        </p>
      </div> */}

      <div className="relative ">
        <div className="flex flex-col mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <button 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 border-0 cursor-pointer"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => e.key === 'Escape' && setSelectedImage(null)}
          type="button"
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged view"
              width={1600}
              height={1200}
              quality={95}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </button>
      )}
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-left text-neutral-500 font-normal dark:text-neutral-300 my-2">
      {children}
    </p>
  );
};

