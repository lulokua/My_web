import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/pages/home";
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
