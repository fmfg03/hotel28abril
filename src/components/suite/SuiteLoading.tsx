
interface SuiteLoadingProps {
  loadingText: string;
}

export default function SuiteLoading({ loadingText }: SuiteLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">{loadingText}</div>
    </div>
  );
}
