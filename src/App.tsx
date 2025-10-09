import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Routing} from "@/common/routing/Routing.tsx";
import {Header} from "@/common/components/header/Header.tsx";

// Создать клиента
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 60 * 1000,
    }
  }
})

// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient

function App() {
  return (
    // Предоставьте клиенту доступ к вашему App
    <QueryClientProvider client={queryClient}>
      <div>
        <Header/>
        <Routing/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
