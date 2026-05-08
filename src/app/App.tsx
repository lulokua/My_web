import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/home/HomePage";
import { useSmoothScroll } from "@/shared/hooks/useSmoothScroll";

export function App() {
  useSmoothScroll();

  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}

export default App;
