import { Card } from '@/components/ui/card';
import { QuizProvider } from '@/context/quiz-context';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <QuizProvider>
        <div className="flex items-center justify-center min-h-screen px-4">
          <Card className="w-full max-w-md p-6 sm:p-8 shadow-2xl h-[460px]">
            {children}
          </Card>
        </div>
      </QuizProvider>
    </main>
  );
}
