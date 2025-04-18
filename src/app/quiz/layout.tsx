import { Card } from '@/components/ui/card';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-2xl h-[460px]">
          {children}
        </Card>
      </div>
    </main>
  );
}
