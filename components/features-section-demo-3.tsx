import { cn } from "@/lib/utils";
import { SkeletonCodeOrganization } from "./skeletons/skeleton-code-organization";
import { SkeletonFormatted } from "./skeletons/skeleton-formatted";
import { SkeletonAnalytics } from "./skeletons/skeleton-analytics";
import { SkeletonUserBehavior } from "./skeletons/skeleton-user-behavior";
import { SkeletonNetworkDiagram } from "./skeletons/skeleton-network-diagram";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Organize prompts in code",
      description:
        "Stop managing prompts in strings and markdown files. Define them as type-safe code with proper tooling.",
      skeleton: <SkeletonCodeOrganization />,
      className:
        "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Works with all major models",
      description:
        "Formatted prompts from Vercel AI SDK, OpenAI, and Anthropic without reading endless documentation.",
      skeleton: <SkeletonFormatted />,
      className: "border-b col-span-1 lg:col-span-3 dark:border-neutral-800",
    },
    {
      title: "Deep execution insights",
      description:
        "Understand your prompts, tools, and executions with detailed analytics and real-time monitoring.",
      skeleton: <SkeletonAnalytics />,
      className:
        "col-span-1 lg:col-span-2 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Track user interactions",
      description:
        "See how users interact with your agents and prompts. Identify patterns, catch issues, improve experiences.",
      skeleton: <SkeletonUserBehavior />,
      className: "col-span-1 lg:col-span-4 border-b dark:border-neutral-800",
    },
    {
      title: "Monitor your LLM ecosystem",
      description:
        "Get a complete overview of your LLM interactions to optimize cost, performance, and user experience.",
      skeleton: <SkeletonNetworkDiagram />,
      className: "col-span-1 lg:col-span-6",
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
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
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
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

